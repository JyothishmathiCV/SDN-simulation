const { spawn } = require('child_process');



let ears=spawn('java',['Test']);

ears.stdout.on('data',(d)=>{
    console.log(''+d);
    console.log("_______________");
});



