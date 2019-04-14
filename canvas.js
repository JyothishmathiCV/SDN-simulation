var canvas=document.querySelector('canvas');

canvas.width=2000;
canvas.height=1000;

var adj="0 1 1 0 0 0 0 0 0 0\n1 0 1 1 1 0 0 0 0 0\n1 1 0 1 1 0 0 0 0 0\n0 1 1 0 1 1 0 0 0 0\n0 1 1 1 0 1 1 0 0 0\n0 0 0 1 1 0 1 1 0 0\n0 0 0 0 1 1 0 0 1 0\n0 0 0 0 0 1 0 0 0 1\n0 0 0 0 0 0 1 0 0 1\n0 0 0 0 0 0 0 1 1 0";
adj=adj.split("\n");
for(var a = 0;a<adj.length;a++){
    adj[a]=adj[a].split(" ");
}
console.log(adj);

var adjMat=[[0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0]
    ];

var rect=[];
adjMat.forEach(e=>{
    rect.push({
        name:'',
        x:0,
        y:0
    });
})
var c = canvas.getContext('2d');
var lengthR = 100;
var breadth = 100;

var visited=[];
adjMat.forEach(e => {
    visited.push(0);    
});


function unv(a){
    var u=[];
    for(var i=0;i<a.length;i++){
        if(a[i]==1 && rect[i].x==0){
            u.push(i);
            //rect[i].x=10;
            //visited[i]=1;
        }
    }
    return u;
}

var index=0;

var xco = 100 ;
var yco = 100 ;
var ybuf=breadth+100;
var first=0;
// Draw the first client first
c.fillRect(xco,yco,breadth,lengthR);
rect[first].x=xco;
rect[first].y=yco;
rect[first].name='';//Add name of the client
xco=xco+lengthR+100;


function bfsDraw (i,a){
    if(visited[i]==0){
        visited[i]=1;
        var toDraw=unv(a[i]);
        var no=toDraw.length;
        // var ybuf=h/no;
        yco=100;
        console.log(i,toDraw);
        toDraw.forEach(u=>{
            console.log(`${u} ${xco} ${yco}`);
            c.fillRect(xco,yco,breadth,lengthR);
            rect[u].x=xco;
            rect[u].y=yco;
            c.beginPath();
            c.moveTo(rect[i].x+50,rect[i].y+50);
            c.lineTo(xco+50,yco+50);
            c.stroke();
            
            yco+=ybuf;
        });
        xco=xco+lengthR+100;        
        toDraw.forEach(e=>{
            bfsDraw(e,a);
        });

    }
}

bfsDraw(0,adjMat);


