let optionsList = ["thing1", "thing2", "thing3", "thing4"];
let chosenList = ['fake'];

let optionEl = document.querySelector("#options");
let chosenEl = document.querySelector("#chosen");

for(let el of optionsList){
    let listItem = document.createElement("li");
    listItem.textContent = el;
    optionEl.appendChild(listItem);
}
for(let el of chosenList){
    let listItem = document.createElement("li");
    listItem.textContent = el;
    chosenEl.appendChild(listItem);
}

let addButt = document.querySelector("#addB");
let removeButt = document.querySelector("#removeB");

addButt.onclick = () => {console.log("add stuff")};
removeButt.onclick = () => {console.log("remove stuff")};