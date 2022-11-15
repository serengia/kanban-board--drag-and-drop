function drag(e) {
  console.log(e.target);
}

const backlogContainer = document.querySelector(".backlog");
const inprogressContainer = document.querySelector(".inprogress");
const completeContainer = document.querySelector(".complete");
const onholdContainer = document.querySelector(".onhold");

let draggedItem;

const getItems = (collectionName) => {
  if (localStorage.getItem(collectionName)) {
    return JSON.parse(localStorage.getItem(collectionName));
  }
  return [{id: 1, text: "Item one"}, {id: 2, text: "Item two"}];
};

function createItem(data) {
  let liEl = document.createElement("li");
  liEl.classList.add("list-item");
  liEl.draggable = true;
  liEl.setAttribute("ondragstart", "drag(event)");
  liEl.setAttribute("data-id", data.id);
  liEl.innerText = data.text
  
  return liEl
}

function setItems(key, valueArr){
  localStorage.setItem(key) = JSON.stringify(valueArr)
};



function updateUiList(arrItems, container, createItemFun){
 container.innerHTML = ""
  arrItems.forEach(itemObj => { 
    container.appendChild(createItemFun(itemObj))
  })
}

// Update UI lists
updateUiList(getItems("backlog"), backlogContainer, createItem)
updateUiList(getItems("inprogress"), inprogressContainer, createItem)
updateUiList(getItems("complete"), completeContainer, createItem)
updateUiList(getItems("onhold"), onholdContainer, createItem)

// Allow drop on containers

const containers = [backlogContainer, inprogressContainer, completeContainer, onholdContainer]
let draggedOverContainerIndex;

containers.forEach(cont =>{
  cont.setAttribute("ondragover", "allowDrop(event)");
  cont.setAttribute("ondrop", "drop(event)");
})

function drag(e) {
  draggedItem = e.target;
}

function allowDrop(e){
e.preventDefault()
e.target.closest("ul").classList.add("over")
console.log(e.target.closest("ul"));
}

function drop(e){
  e.preventDefault()
  const parentContainer = containers[draggedOverContainerIndex];
  parentContainer.appendChild(draggedItem)
  containers.forEach(con => {
    con.classList.remove("over")
  })
}

function dragEnter(index){
  draggedOverContainerIndex = index;  

}


