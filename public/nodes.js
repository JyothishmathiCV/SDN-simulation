var shazam = function () {
    var master;
    var sock;
    var status;
    var queue;
    var cog;
    var flowtable;
    var mutex=0;

    var colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#f4511e", "#cddc39", "#fb8c00", "#263238"];
    var packetqueue=[];
    function addPacket(data,frmated) {
        genpush(frmated[0],frmated[1]);
        uploadStatus("New packet incoming");
        setTimeout(() => {
            uploadStatus(data);
            var div = document.createElement('div');
            div.className = "animated fadeInRight";
            div.style.background = colors[+frmated[1]];
            queue.appendChild(div);
            sock.emit("packetadd");
            uploadStatus("Job added");
        }, 700);
    }


    async function move(a,b){
        uploadStatus(`Moving from ${a} => ${b}`);
        await myControl.feed(`${a} => ${b}`);
        uploadStatus(" Finished ");
        sock.emit("animationdone");
    }

    async function toSdn(a){
        uploadStatus(`Moving from ${a} => SDN`);
        await myControl.manpSdn(`${a} =>`);
        uploadStatus(" Finished ");
        sock.emit("tosdndone");
    }

    async function fromSdn(a){
        uploadStatus(`SDN => ${a}`);
        await myControl.manpSdn(`=> ${a}`);
        uploadStatus(" Finished ");
        sock.emit("fromsdndone");
    }

    function genpush(src,dest,hop){
        packetqueue.push({src,dest});
    }

    function pop(){
        packetqueue.shift();
    }


    function removePacket() {
        pop();
        uploadStatus("Done processing packet");
        var victim = queue.children[0];
        cog.style = "animation:rotate 0.8s";
        victim.classList.add("zoomOut");
        setTimeout(function () {
            victim.remove();
            cog.style = "";
            uploadStatus(" Finished ");
            sock.emit("packetremoveddone");
        }, 800);
    }



    function paintFlow() {
        colors.forEach((color, i) => {
            flowtable[i].style.background = color;
        });
    }

    function changeFlowTable(src, val) {
        uploadStatus(`Flowtable updated for ${src} with  nextHop of ${val}`);
        flowtable[src].innerHTML = val;
        setTimeout(()=>{
            uploadStatus(" Finished ");
            sock.emit("flowchange");
        },300);
    
    }

    function uploadStatus(data) {
        status.innerHTML = data;
    }




    function init(parent,socket) {
        master = parent;
        sock=socket;
         status = master.children[0];
         queue = master.children[1].children[1];
         cog = master.children[1].children[0];
         flowtable = master.children[2].children;
        paintFlow();
       return {
           changeFlowTable,
           move,
           toSdn,
           fromSdn,
           addPacket,
           removePacket
       }
    }


    return init;
}