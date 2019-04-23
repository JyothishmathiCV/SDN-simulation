var express = require('express');
var app=express();
var server = require('http').Server(app);
const {spawn}=require('child_process');
var io = require('socket.io')(server);
const path=require('path');
var matrix = [];
var masterBuffer = "";
var barricade=false;
process.setMaxListeners(0);
app.use('/simulation',express.static("./public/"));

app.get('/',(req,res)=>{
  res.send("Servers Up !");
})


io.on('connection', function (socket) {


console.log('New connection');

  var ears=spawn('java', ['-jar', 'dsdn.jar']);

  ears.stdout.on('data',function(data){
    brain(data,socket);
  });

});


async function brain(data,socket){
var regex = /endgame--/g;
    masterBuffer += ""+data;

    if (regex.test(""+data)) {
      console.log("entered");
      for(lin of masterBuffer.split("\n")){
        await communicate(socket, lin);
      }
          
    }
}

function release(prom){
barricade=false;
prom("Done");
}

var removewaitpg;

async function waitForPacketGenerated(socket){
    return new Promise((res,rej)=>{
        removewaitpg=release.bind(null,res);
        socket.on('packetadd',removewaitpg);
    });
}

async function waitForPacketRemoved(socket){
    return new Promise((res,rej)=>{
        removewaitpg=release.bind(null,res);
        socket.on('packetremoveddone',removewaitpg);
    });
}




async function communicate(socket,lin){
    console.log("hit");
  nlin = lin.split(" ");
  if (nlin[0].includes("PacketGenerated:")) {
      socket.emit("packetgenerated",{data:`Source: ${nlin[1]} Destination: ${nlin[2]}`,xy:[nlin[1],nlin[2]]});
      barricade=true;
      await waitForPacketGenerated(socket);
      socket.removeListener("packetadd",removewaitpg);
      console.log("packet added");
      return "done";
  }
  if (nlin[0].includes("PacketRemoved:")) {
      socket.emit("packetremoved",{data:`Source: ${nlin[1]}`,xy:nlin[1]});
      barricade=true;
      await waitForPacketRemoved(socket);
      socket.removeListener("packetremoveddone",removewaitpg);
      console.log("removed the packet");
      return "done";
  }
  if (nlin[0].includes("PacketFlow:")) {
      if (nlin[1] == "SDN" && nlin[2] != "SDN") { //SDN to destination
          socket.emit("sdntodest",{data :`Source: SDN Destination: ${nlin[2]} secsource: ${nlin[3]} NextHop : ${nlin[4]}`,xy:[nlin[2],nlin[3],nlin[4]]});
      } else if (nlin[1] != "SDN" && nlin[2] == "SDN") { //From client to the SDN
          socket.emit("clientosdn",{data:`Source: ${nlin[1]} Destination: SDN NextHop: SDN`,xy:[nlin]});
      } else {
          socket.emit("dispatch",{data:`Source: ${nlin[1]} Destination: ${nlin[2]} NextHop: ${nlin[3]}`,xy:[nlin[1],nlin[2],nlin[3]]});
      }
      return "done";

  }
  if (nlin[0].includes("FlowTable:")) {
      socket.emit("flowtable",{data:`Source: ${nlin[1]} Destination: ${nlin[2]} NextHopDecided: ${nlin[3]}`,xy:[nlin[1],nlin[2],nlin[3]]});
      return "done";
  }
  if (nlin[0].includes("MatrixStart")) {
      matrix = [];
  }
  if (nlin[0].includes("MatrixEnd")) {
      socket.emit("span",matrix);
      return "done";
  }
  if (nlin[0].includes("Matrix")) {
      matlin = [];
      nlin.forEach(d => {
          if (!d.includes("Matrix")) {
              matlin.push(+d);
          }
      });
      if (matlin.length != 0) {
          matrix.push(matlin);
      }
  }
  return "done";
}


server.listen(4000);


