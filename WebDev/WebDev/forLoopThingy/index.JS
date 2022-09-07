let data = ["this", "is", "a", "test"];

    for(let i of data){
      let w = document.createElement('p');
      let L = document.querySelector('body');
      L.append(w);
      w.append(i);
      let el = document.getElementsByTagName('p');
      el.onclick = function(){console.log('click'); el.style.color = "blue"};
    }