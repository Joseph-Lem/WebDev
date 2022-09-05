documents.querySelector('launchButton').onclick = function(){
bob()
};
function bob(){
    let launch = document.querySelector('rocket');

    let moveVertical = function() {
        let currentPos = launch.style.marginTop;
        if(currentPos < -400){
            launch.style.marginTop = currentPos - 50;
        }
        else{
            window.clearInterval(timer)
        }
    };
    let timer = window.setInterval(moveVertical, 500);
}