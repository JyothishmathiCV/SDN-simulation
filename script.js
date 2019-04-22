const { spawn } = require('child_process');


let ears=spawn('java',['-jar','dsdn.jar']);

var masterBuffer="";
var regex=/endgame--/g;
var matrix=[];
ears.stdout.on('data',(d)=>{
   d=''+d;
   masterBuffer+=d;
if(regex.test(d)){
//  console.log(masterBuffer);
 masterBufferSplit=masterBuffer.split("\n");
 masterBufferSplit.forEach(lin => {
     nlin=lin.split(" ");
     if(nlin[0].includes("PacketGenerated:")){
         console.log(`Packet is generated------Source: ${nlin[1]} Destination: ${nlin[2]}`);
     }
     if(nlin[0].includes("PacketRemoved:")){
        console.log(`Packet is removed------Source: ${nlin[1]}`);
    }
    if(nlin[0].includes("PacketFlow:")){
        console.log(`Packet sent------Source: ${nlin[1]} Destination: ${nlin[2]} NextHop: ${nlin[3]}`);
    }
    if(nlin[0].includes("FlowTable:")){
        console.log(`New row of flowtable updated------Source: ${nlin[1]} Destination: ${nlin[2]} NextHopDecided: ${nlin[3]}`);
    }
    if(nlin[0].includes("MatrixStart")){
        console.log(`Matrix started`);
        matrix=[];
    }
    if(nlin[0].includes("MatrixEnd")){
        console.log(`Matrix Ended`);
        console.log(matrix);
    }
    if(nlin[0].includes("Matrix")){
        matlin=[];
        nlin.forEach(d=>{
            if(!d.includes("Matrix")){
                matlin.push(+d);
            }
        });
        if(matlin.length!=0){
            matrix.push(matlin);
        }
    }
 });

}
});



