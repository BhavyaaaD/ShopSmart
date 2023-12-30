const itemForm=document.getElementById('item-form');
const inputItem=document.getElementById('item-name');
const itemList=document.getElementById('item-list')

function createIcon(classes){
    const icon=document.createElement('i');
    icon.className=classes;
    return icon;
}
function createButton(classes){
    const button=document.createElement('button');
    button.className=classes;
    button.appendChild(createIcon("fa-solid fa-xmark"));
    return button;
}

function addItem(e){
    e.preventDefault();
    const input=inputItem.value;
    if(input===''){
        alert("Please enter an Item");
        return;
    }
    //create a new li element
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(input));
    li.appendChild(createButton("remove-item btn-link text-red"));
    itemList.appendChild(li);
    //clear the input field
    inputItem.value="";
    return;


}

itemForm.addEventListener('submit',addItem);

