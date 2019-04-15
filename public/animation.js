var animate=(function(){
var velocity=3;
var mutexLock=0;
var rect;
var eventHorizon=[];
var reqid;
var i=0;
var brush;
var reversedir=false;


    function draw(){
        clear();
        let eventPool=eventHorizon.length;
        eventHorizon.forEach((d,j)=>{
            if(!d.cache){calcAngle(d)};
            if(!d.reached){
                d.x+=d.cache[1];
                d.y+=d.cache[0];
                drawRect(d.color,d.x,d.y);
                if(d.reversedir){
                    if(d.x <= d.dest[0] && d.y <= d.dest[1]){ i+=1;d.reached=true};
                    return;
                }
                if(d.x>=d.dest[0] && d.y>=d.dest[1]){ i+=1;d.reached=true}
            }
          
            if(i==eventPool){stop();flush()}
        });
          if(mutexLock){
            requestAnimationFrame(draw);
          }
    }
    
    function flush(){
        while(eventHorizon.length)
            eventHorizon.pop();
    console.log(rect[1]);
    }
    function drawRect(color,x,y){
        brush.fillStyle=color;
        brush.fillRect(x,y+20,50,50);
    }
     
    function clear(){
        brush.clearRect(0,0,2000,1500);
    }

    function calcAngle(d){
        const {x,y}=d;
        const destx=d.dest[0];
        const desty=d.dest[1];
        var angle = Math.atan2(desty - y, destx - x);
        var sin = Math.sin(angle) * velocity;
        var cos = Math.cos(angle) * velocity;
        d.cache=[sin,cos];
    }

    function stop(){
        window.cancelAnimationFrame(reqid);
        reqid=false;
        mutexLock=0;
        i=0;
        clear();
    }


    function transform(obj){
        var src=rect[obj.source];
        var dest=rect[obj.destination];
        var temp={
            x:src.x,
            y:src.y,
            color:rect[obj.destination]['color'],
            dest:[dest.x,dest.y],
            cache:'',
            reached:false
        }
        decideDir(temp);
        return  temp;
    }

    function decideDir(d){
        if(d.x>=d.dest[0] && d.y>=d.dest[1])
           d.reversedir=true
        else{
            d.reversedir=false;
        }
    }



      function isAlpha(arr){
          return arr.map(x=>{
              var reg=/^[A-Za-z]{1,1}$/;
            return reg.test(x.replace(/\s+/,""))?parseInt(x,36)-10:+x;
          });
      }


      function converse(obj){
        eventHorizon.push(transform(obj));
          if(mutexLock){return ;}
          mutexLock=1;
          draw();
      }

    return {
        init:function(v,r,c){
            velocity=v||velocity;
            rect=r;
            brush=c;

            return {
                feed:function(str){
                    var nos=str.split("=>");
                    var [source,destination]=isAlpha(nos);
                        converse({source,destination});
 
               },
               peek:function(){
                   return eventHorizon.length;
               },
               checkMutex:function(){
                   return mutexLock;
               }
            }
           
        }

    }
})();