



    var canvas=document.querySelector('canvas');
    var cv2=document.querySelector("#lol");

    cv2.width=2000;
    cv2.height=1500;
    canvas.width=2000;
    canvas.height=1500;
    
    var adj="0 1 1 0 0 0 0 0 0 0\n1 0 1 1 1 0 0 0 0 0\n1 1 0 1 1 0 0 0 0 0\n0 1 1 0 1 1 0 0 0 0\n0 1 1 1 0 1 1 0 0 0\n0 0 0 1 1 0 1 1 0 0\n0 0 0 0 1 1 0 0 1 0\n0 0 0 0 0 1 0 0 0 1\n0 0 0 0 0 0 1 0 0 1\n0 0 0 0 0 0 0 1 1 0";
    adj=adj.split("\n");
    for(var a = 0;a<adj.length;a++){
        adj[a]=adj[a].split(" ");
    }
    console.log(adj);
    
    var colors=["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#f4511e","#cddc39","#fb8c00","#263238"];
    
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
    adjMat.forEach((e,i)=>{
        rect.push({
            name:String.fromCharCode(i+65),
            x:0,
            y:0,
            color:colors[i]
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
            }
        }
        return u;
    }
    
    var index=0;
    
    var xco = 100 ;
    var yco = 100 ;
    var ybuf=breadth+100;
    // Draw the first client first
    
    changeColor(c,rect[0].color);
    c.fillRect(xco,yco,breadth,lengthR);
    rect[0].x=xco;
    rect[0].y=yco;
    xco=xco+lengthR+100;
    c.font='42px Poppins';
    changeColor(c,"white");
    c.fillText(rect[0].name,rect[0].x+20,rect[0].y+50);
    
    function bfsDraw (i,a){
        if(visited[i]==0){
            visited[i]=1;
            writeText(c,rect,i);
            var toDraw=unv(a[i]);
            var no=yco=100;
            toDraw.forEach(u=>{
                constructRect(c, rect, u, xco, yco, breadth, lengthR, i);
                yco+=ybuf;
            });
            xco=xco+lengthR+100;        
            toDraw.forEach(e=>bfsDraw(e,a));
        }
    }
    
    function writeText(c,rect,i){
        changeColor(c,"white");
        c.fillText(rect[i].name,rect[i].x+20,rect[i].y+50);
    }
    
    function constructRect(c,rect,u,xco,yco,breadth,lengthR,i){
                changeColor(c, rect[u].color);
                c.fillRect(xco,yco,breadth,lengthR);    
                rect[u].x=xco;
                rect[u].y=yco;
                changeColor(c,"black",1);
                lineRect(c, rect, i, breadth, lengthR,xco,yco);
    }
    
    function lineRect(c,rect,i,breadth,lengthR,xco,yco){
        c.beginPath();
        c.moveTo(rect[i].x+breadth,rect[i].y+lengthR/2);
        c.lineTo(xco,yco+50);
        c.stroke();
    }
    
    function changeColor(c,color,bool){
        if(bool){
            c.lineWidth="7";
            c.strokeStyle=color;
            return ;
        }
    c.fillStyle=color;
    }
    
    
    
    bfsDraw(0,adjMat);
    




let c2=cv2.getContext('2d');



c.fillStyle="black"
var myControl=animate.init(3,rect,c2);
myControl.feed("a => c");
myControl.feed("f => i");
myControl.feed("a => j");
setTimeout(function(){
    myControl.feed("a => g"); //mimicing packet arriving at any time
},2000);








