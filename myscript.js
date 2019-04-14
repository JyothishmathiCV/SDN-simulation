var app = require('express')();
var server = require('http').Server(app);
const {spawn}=require('child_process4');
var io = require('socket.io')(server);
const path=require('path');
const mainFile=path.join(__dirname,"./Project-Sim/distproj/src/distproj/ProcessesExample.java");


app.use('/simulation',express.static("./public/"));

app.get('/',(req,res)=>{
  res.send("Hello world");
})


io.on('connection', function (socket) {

console.log('New connection');

  spawn('javac',[mainFile]);

  let ears=spawn('java','ProcessesExample');

  ears.on('data',function(data){
    brain(data,socket);
  });

});


function brain(data,socket){

}










server.listen(4000);


