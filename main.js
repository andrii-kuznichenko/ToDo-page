const inputText = document.querySelector('#input-thing');
const mainContainer = document.getElementById('main-container');
let flag = 0;

document.getElementById('add-button').onclick = () =>{
  if(inputText.value !== ''){
    //create div row
    const rowDiv = document.createElement("div");
    rowDiv.classList.add('d-flex');
    rowDiv.classList.add('justify-content-center');
    //create li tag
    const node = document.createElement("li");
    node.classList.add('list-group-item');
    node.classList.add('list-group-item-action');
    node.classList.add('text-start');
    //create button delete
    const buttonDel = document.createElement("button");
    buttonDel.classList.add('btn');
    buttonDel.classList.add('btn-danger');
    buttonDel.innerHTML = 'Delete';
    //create button update
    const buttonUpd = document.createElement("button");
    buttonUpd.classList.add('btn');
    buttonUpd.classList.add('btn-success');
    buttonUpd.innerHTML = 'Update';
    //put input inside li and get to ul
    const textnode = document.createTextNode(inputText.value);
    node.appendChild(textnode);
    document.getElementById("ul-list").appendChild(rowDiv);
    rowDiv.appendChild(node);
    //clear input
    inputText.value = '';
    inputText.focus();
    //add buttons
    rowDiv.appendChild(buttonDel);
    rowDiv.appendChild(buttonUpd);
    console.log(flag);
    flag = flag + 1;
  } else{
    alert("I am an alert box!");
  }
}
