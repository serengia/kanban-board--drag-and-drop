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

function drag(e) {
  draggedItem = e.target;
  console.log("DRAGGED::", draggedItem);
}

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

