var animate=(function(){
var velocity=3;
var mutexLock=0;
var rect;
var eventHorizon=[];
var i=0;
var brush;
var reversedir=false;
var sdnobj;

    function draw(res,rej){
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
          
            if(i==eventPool){stop();flush();}
        });
          if(mutexLock){
            requestAnimationFrame(draw);
          }
    }
    
    function flush(){
        console.log(eventHorizon);
        while(eventHorizon.length){
        eventHorizon[eventHorizon.length-1].res("done");
        eventHorizon.pop();
        }
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
        clear();
        reqid=false;
        mutexLock=0;
        i=0;
        clear();
    }


    function transform(obj,res,rej){
        var src,dest;
        if("dest" in obj){
          src=sdnobj;
          dest=rect[obj.dest];
        }else if("sdnobj" in obj){
             src=rect[obj.source];
             dest=sdnobj;
        }else{
             src=rect[obj.source];
             dest=rect[obj.destination];
        }
        var temp={
            x:src.x,
            y:src.y,
            color:dest['color'],
            dest:[dest.x,dest.y],
            cache:'',
            reached:false,
            res,
            rej
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


      function converse(obj,res,rej){
        eventHorizon.push(transform(obj,res,rej));
          if(mutexLock){return ;}
          mutexLock=1;
          console.log(res,rej)
          draw(res,rej);
      }
      function trim(str){
          return str.replace(/\s+/g,"");
      }

    return {
        init:function(v,r,c,sdn){
            sdnobj=sdn;
            velocity=v||velocity;
            rect=r;
            brush=c;

            return {
                feed:function(str){
                    str=trim(str);
                    return new Promise((res,rej)=>{
                        var nos=str.split("=>");
                        var [source,destination]=isAlpha(nos);
                            converse({source,destination},res,rej);
                    });
 
               },
               peek:function(){
                   return eventHorizon.length;
               },
               manpSdn(str){
                str=trim(str);
                return new Promise((res,rej)=>{
                    if(str[0]=="=>")
                    {
                        var [source]=isAlpha([str[0]]);
                        converse({sdnobj,dest},res,rej);
                    }else{
                        var [source]=isAlpha([str[0]]);
                        converse({source,sdnobj},res,rej);
                    }
                 
                });
               },
               checkMutex:function(){
                   return mutexLock;
               }
            }
           
        }

    }
})();




