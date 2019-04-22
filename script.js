const { spawn } = require('child_process');


let ears=spawn('java',['-jar','dsdn.jar']);

var masterBuffer="";
var regex=/endgame--/g;
ears.stdout.on('data',(d)=>{
   d=''+d;
   masterBuffer+=d;
if(regex.test(d)){
 console.log(masterBuffer);
}
});



