let optionsList = ["thing1", "thing2", "thing3", "thing4"];
let chosenList = ['fake'];

let optionEl = document.querySelector("#options");
let chosenEl = document.querySelector("#chosen");

function addOptionsItem (name){
    let listItem = document.createElement("li");
    listItem.textContent = name;
    optionEl.appendChild(listItem);
}

for(let el of optionsList){
    addOptionsItem(el);
}

function addChosenItem(name){
    let listItem = document.createElement("li");
    listItem.textContent = name;
    chosenEl.appendChild(listItem);
}

for(let el of chosenList){
    addChosenItem(el);
}

function removeFromOptions(index){
    optionEl.removeChild(optionEl.childNodes[index+1])
}

function removeFromChosen(index){
    chosenEl.removeChild(chosenEl.childNodes[index+1])
}

let addButt = document.querySelector("#addB");
let removeButt = document.querySelector("#removeB");


addButt.onclick = () => {moveToOptions(w)};
removeButt.onclick = () => {moveToChosen(w)};


function moveToOptions(index){

    addChosenItem(optionsList[index]);
    removeFromOptions(index);
    chosenList.push(optionsList[index]);
    optionsList.splice(index, 1);
}

function moveToChosen(index){

    addOptionsItem(chosenList[index]);
    removeFromChosen(index);
    optionsList.push(chosenList[index]);
    chosenList.splice(index, 1);
}



let isSelected = [];

for (let el of document.querySelectorAll("#options li")) {
  isSelected.push(false);
  el.onclick = () => {
    // index of the element???
    let allItems = Array.from(document.querySelectorAll("#options li"));
    let index = allItems.indexOf(el);
    //console.log("Index: " + index);
    // toggle the appropriate isSelected element
    isSelected[index] = !isSelected[index];
    if (isSelected[index]) {
      el.style.backgroundColor = "red";
    }
    else {
      el.style.backgroundColor = "";
    }
  };
}