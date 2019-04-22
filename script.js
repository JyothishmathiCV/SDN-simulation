const { spawn } = require('child_process');


let ears=spawn('java',['-jar','dsdn.jar']);

ears.stdout.on('data',(d)=>{
    console.log(''+d);
    console.log("_______________");
});



