const itemForm = document.getElementById('item-form');
const inputItem = document.getElementById('item-name');
const itemList = document.getElementById('item-list');
const filter = document.getElementById('filter');
const clrbtn = document.getElementById('clear');
const formbtn=document.getElementById('form-btn');
let isEditMode=false;

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    button.appendChild(createIcon("fa-solid fa-xmark"));
    return button;
}

function clearUI() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clrbtn.style.display = 'none';
        filter.style.display = 'none';
    }
    else {
        clrbtn.style.display = 'block';
        filter.style.display = 'block';

    }
    isEditMode=false;
    formbtn.innerHTML=' <i class="fa-solid fa-plus"></i> Add Item';
    formbtn.style.backgroundColor='#333';
}
function addItemSubmit(e) {
    e.preventDefault();
    const item = inputItem.value;
    if (item === '') {
        alert('Please enter an Item!');
        return;
    }

    if(isEditMode){
        const item_edit=itemList.querySelectorAll('.edit-mode');
        //Removing from local-storage
        removeItemFromLocalStorage(item_edit[0].textContent);
        //Removing from DOM
        item_edit[0].remove();
        isEditMode=false;
       
    }

    if(checkIfItemExists(item)){
        alert(`${item} already exists in the list.`);
        return;
    }

    //add item to DOM
    addItem(item);

    //add item to local storage
    addItemToLocalStorage(item);
    //clear the input field
    clearUI();
    inputItem.value = "";
    return;

}
function addItem(item) {
    //create a new li element
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    li.appendChild(createButton("remove-item btn-link text-red"));
    itemList.appendChild(li);
    return;

}

function addItemToLocalStorage(item) {
    const items = getItemsFromLocalStorage();
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}

function getItemsFromLocalStorage() {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    }
    else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function clickSubmit(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        const item = e.target.parentElement.parentElement;


        if (confirm('Are you sure?')) {
            // removing item from DOM
            item.remove();

            //removing item from Local Storage
            removeItemFromLocalStorage(item.textContent);
            clearUI();

        }
    }
    else{
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item){
    isEditMode=true;
    itemList.querySelectorAll('li').forEach((item)=>{
        item.classList.remove('edit-mode');
    });
    item.classList.add('edit-mode');
    

    formbtn.innerHTML='<i class="fa-solid fa-pen"></i>  Update Item';
    formbtn.style.backgroundColor='#228B22';
    inputItem.value=item.textContent;


}



function removeItemFromLocalStorage(item) {
    const items = getItemsFromLocalStorage();
    const index = items.indexOf(item);
    if (index > -1) {
        items.splice(index, 1);
    }
    localStorage.setItem('items', JSON.stringify(items));
    return;
}




function clearAll(e) {
    //Removing from DOM
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    //Removing all items from Local storage;
    localStorage.clear();
    clearUI();
    return;
}

function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');

    items.forEach((item) => {
        const str = item.firstChild.textContent.toLowerCase();
        if (!str.startsWith(text)) {
            item.style.display = 'none';
        }
        else {
            item.style.display = 'flex';
        }

    })
}

function displayItems() {
    const items = getItemsFromLocalStorage();
    items.forEach((item) => {
        addItem(item);
        clearUI();
    })
}

function checkIfItemExists(i){
    const items = getItemsFromLocalStorage();
    for(let x=0;x<items.length;x++){
        if(items[x]===i){
            return true;
        }
    }
    return false;

}

// Event Listeners
itemForm.addEventListener('submit', addItemSubmit);
itemList.addEventListener('click', clickSubmit);
clrbtn.addEventListener('click', clearAll);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);
clearUI();