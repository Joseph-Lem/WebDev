
document.querySelector(".launchButton").onclick = function(){ bob() };

function bob(){
    console.log("hello");
    

    function moveVertical() {
        let launch = document.querySelector(".rocket");
        if(!launch.style.top){
            launch.style.top = "0px";
        }
        let pixels = parseInt(launch.style.top, 10);
        let currentPos = pixels;
        if(currentPos > -800){
            console.log("currentPos: " + currentPos);
            launch.style.top = (currentPos - 1) + "px";
        }
        else{
            window.clearInterval(timer)
            launch.style.top = "0px";
        }
    };
    let timer = window.setInterval(moveVertical, 10);
}