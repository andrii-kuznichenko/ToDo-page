//Class Event
class Event{
  constructor(title, priority, date, description,checkBox){
    this.title = title;
    this.priority = priority;
    this.date = date;
    this.description = description;
    this.checkBox = checkBox;
  }
}
// Class EventList
class EventList{
  constructor(eventsList){
    this.eventsList = [];
  }
  addEvent(event){
    this.eventsList.splice(0,0,event);
  }
}
// Class CardEvent
class CardEvent{
  constructor(event, title, priority, date, description, li, deleteButton, updateButton, checkBox){
    this.event = event;
    this.title = title;
    this.priority = priority;
    this.date = date;
    this.description = description;
    this.li = li;
    this.deleteButton = deleteButton;
    this.updateButton = updateButton;
    this.checkBox = checkBox;

  }
}
//class CardEventList
class CardEventList{
  constructor(cardEventsList){
    this.cardEventsList = [];
  }
  addCardEvent(event){
    this.cardEventsList.splice(0,0,event);
  }
}

const eventList = new EventList([]);
const cardEventList = new CardEventList([]);

//Manipulation with the local storage
const saveToLocalStorage = () => {
  const stringifiedEvents = JSON.stringify(eventList.eventsList);
  console.log(stringifiedEvents);
  localStorage.setItem('ToDoList', stringifiedEvents);
};

const loadFromLocalStorage = () => {
  const parsedData = JSON.parse(localStorage.getItem('ToDoList'));
  console.log('🚀 ~ file: index.js:64 ~ data:', parsedData);
  if (parsedData) {
    eventList.eventsList = parsedData;
    render();
  } else {
    eventList.eventsList = [];
  }
};

//update screen
const render = () => {
  const fullList = document.getElementById('list-elements');
  fullList.innerHTML = '';

  eventList.eventsList.forEach(element =>{
    const firstRow = document.createElement('div');
    const secondRow = document.createElement('div');
    const firstcolumn = document.createElement('div');
    const secondcolumn = document.createElement('div');
    const checkBox = document.createElement('input');
    const firstColumnRow = document.createElement('div');
    const secondColumnRow = document.createElement('div');

    firstRow.classList.add('d-flex');
    firstRow.classList.add('flex-row');
    firstRow.classList.add('justify-content-between');

    secondRow.classList.add('d-flex');
    secondRow.classList.add('flex-row');
    secondRow.classList.add('justify-content-between');

    firstcolumn.classList.add('col-6');
    secondcolumn.classList.add('col-6');
    secondcolumn.classList.add('text-end');

    firstColumnRow.classList.add('d-flex');
    firstColumnRow.classList.add('flex-row');
    firstColumnRow.classList.add('align-items-center');
    secondColumnRow.classList.add('col-3');
    secondColumnRow.classList.add('text-end');

    checkBox.classList.add('form-check-input');
    checkBox.classList.add('m-2');

  
    const cardEvent = createEventElement(element);


    cardEvent.priority.addEventListener('click', changePriority = () => {
      console.log(element.priority);
        if(element.priority === 'High'){
          cardEvent.priority.classList.remove('btn-danger');
          cardEvent.priority.classList.add('btn-warning');
          element.priority = 'Medium';
        } else if(element.priority === 'Medium'){
          cardEvent.priority.classList.remove('btn-warning');
          cardEvent.priority.classList.add('btn-secondary');
          element.priority = 'Low';
        } else {
          cardEvent.priority.classList.remove('btn-secondary');
          cardEvent.priority.classList.add('btn-danger');
          element.priority = 'High';
        }
      saveToLocalStorage();
      render();
    });

    firstcolumn.append(cardEvent.deleteButton);
    firstcolumn.append(cardEvent.updateButton);
    secondcolumn.append(cardEvent.priority);

    firstRow.append(firstcolumn);
    firstRow.append(secondcolumn);


    firstColumnRow.append(cardEvent.checkBox);
    firstColumnRow.append(cardEvent.title);
    secondColumnRow.append(cardEvent.date);

    secondRow.append(firstColumnRow);
    secondRow.append(secondColumnRow);

    cardEvent.li.append(firstRow);
    cardEvent.li.append(secondRow);
    cardEvent.li.append(cardEvent.description);

    fullList.append(cardEvent.li);
    checkExpiredDate();
  })

}


const createEventElement = (element)  => {

  const li = document.createElement('li');
  const h2 = document.createElement('h3');
  const priorityFilter = document.createElement('button');
  const h3 = document.createElement('h5');
  const p = document.createElement('p');
  const buttonDelete = createButtonDelete();
  const buttonUpdate = createButtonUpdate();
  const checkBox = document.createElement('input')

  h3.classList.add('mt-2');

  checkBox.type = 'checkbox';
  checkBox.classList.add('m-2');
  li.classList.add('list-group-item');
  li.classList.add('mt-3');

  li.classList.add('bg-transparent');
  
  buttonUpdate.addEventListener('click', () => {
    h2.innerHTML = '';
    p.innerHTML = '';
    h3.innerHTML = '';

    element.checkBox = 'checkBoxUnactive';
    checkBox.checked = false;

    const inputUpdate = document.createElement('input');
    const inputDate = document.createElement('input');
    const inputDescription = document.createElement('textarea');


    inputUpdate.type = 'text';
    inputUpdate.value = element.title;
    inputUpdate.classList.add('form-control');
    inputUpdate.classList.add('bg-transparent');
    h2.append(inputUpdate);

    inputDate.type = 'date';
    inputDate.value = element.date;
    inputDate.classList.add('form-control');
    inputDate.classList.add('bg-transparent');
    h3.append(inputDate);

    inputDescription.value = element.description;
    inputDescription.classList.add('form-control');
    inputDescription.classList.add('bg-transparent');
    p.append(inputDescription);

    buttonUpdate.innerText = 'Aprove Changes';
    buttonUpdate.addEventListener('click', () => {
      element.title = inputUpdate.value;
      element.date = inputDate.value;
      element.description = inputDescription.value;
      buttonUpdate.innerText = 'Change';
      saveToLocalStorage();
      render();
    })


  })

  checkBox.addEventListener('click', () => {
    if(element.checkBox   === 'checkBoxActive'){
      element.checkBox = 'checkBoxUnactive';
      h2.innerHTML = `${element.title}`

    } else if (element.checkBox === 'checkBoxUnactive'){
      element.checkBox = 'checkBoxActive';
      console.log(element.checkBox);
      h2.innerHTML = `<del>${element.title}</del>`
    }
    saveToLocalStorage();
  })

  checkBox.id = element.checkBox;

    if(checkBox.id   === 'checkBoxActive'){
      console.log(checkBox.id);
      h2.innerHTML = `<del>${element.title}</del>`;
      checkBox.checked = true;

    } else if (checkBox.id === 'checkBoxUnactive'){
      h2.innerHTML = `${element.title}`;
      checkBox.checked = false;
    }

  
  priorityFilter.textContent = element.priority;
  h3.textContent = element.date;
  p.textContent = element.description;


  priorityFilter.classList.add('btn');
  choosePriorityColor(priorityFilter, element);


  const cardEvent = new CardEvent(element,h2,priorityFilter,h3,p,li, buttonDelete, buttonUpdate, checkBox);
  cardEventList.addCardEvent(cardEvent);

  return cardEvent;
}


const createButtonUpdate = () => {
  const button = document.createElement('button');
  button.textContent = 'Change';
  button.classList.add('btn');
  button.classList.add('btn-link');

  return button;
}


const createButtonDelete = () => {
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.classList.add('btn');
  button.classList.add('btn-link');

  const deleteButtonHandler = () =>{
    cardEventList.cardEventsList.forEach((element,index) => {
      console.log(element);
      if(element.deleteButton === button){
        cardEventList.cardEventsList.splice(index,1);
        eventList.eventsList.forEach((eventD, indexD) => {
          if(element.event === eventD){
            eventList.eventsList.splice(indexD,1);
            console.log(cardEventList.cardEventsList);
            saveToLocalStorage();
            render();
          }
        })
      }
    })
  }

  button.addEventListener('click', deleteButtonHandler);
  return button;
}

//Function for choosing color for filter
const choosePriorityColor = (priorityFilter, element) =>{
  if(element.priority === 'High'){
    priorityFilter.classList.add('btn-danger');
  } else if(element.priority === 'Medium'){
    priorityFilter.classList.add('btn-warning');
  } else{
    priorityFilter.classList.add('btn-secondary');
  }
}

//Change the color if date is expired
checkExpiredDate = () => {
  //Get todays date
  const today = new Date (Date.now());
  const todayDate = [today.getFullYear(),today.getMonth()+1,today.getDate()];

  //Get and formating date from storage
  eventList.eventsList.forEach(element => {
    let dateArray = element.date.split('-');
    dateArray = dateArray.map(string => {
      if(string[0] === '0'){
        string = string[1];
      }
      return parseInt(string);
    })
    console.log(dateArray);
//compare date with today to understan if this date expired
    if(todayDate[0] === dateArray[0] && todayDate[1] === dateArray[1] && todayDate[2] === dateArray[2]){
      cardEventList.cardEventsList.forEach(cardEvent => {
        if(cardEvent.event === element){
          cardEvent.date.style.color = '#ff9966';
        }
      })
    } else if(todayDate[0] > dateArray[0]){
      cardEventList.cardEventsList.forEach(cardEvent => {
        if(cardEvent.event === element){
          cardEvent.date.style.color = 'red';
        }
      })
    } else if (todayDate[0] < dateArray[0]) {
      cardEventList.cardEventsList.forEach(cardEvent => {
        if(cardEvent.event === element){
          cardEvent.date.style.color = 'green';
        }
      });
    } else if (todayDate[0] === dateArray[0]){
      if(todayDate[1] > dateArray[1]){
        cardEventList.cardEventsList.forEach(cardEvent => {
          if(cardEvent.event === element){
            cardEvent.date.style.color = 'red';
          }
        })
      } else if (todayDate[1] < dateArray[1]){
        cardEventList.cardEventsList.forEach(cardEvent => {
          if(cardEvent.event === element){
            cardEvent.date.style.color = 'green';
          }
        })
      } else if (todayDate[1] === dateArray[1]){
        if(todayDate[2] > dateArray[2]){
          cardEventList.cardEventsList.forEach(cardEvent => {
            if(cardEvent.event === element){
              cardEvent.date.style.color = 'red';
            }
          })
        } else if (todayDate[2] < dateArray[2]){
          cardEventList.cardEventsList.forEach(cardEvent => {
            if(cardEvent.event === element){
              cardEvent.date.style.color = 'green';
            }
          })
        }
      }
    }

});
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')
  loadFromLocalStorage();
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.checkValidity()) {

          event.stopPropagation()
          form.classList.add('was-validated')

        } else{

          addEvent(event, eventList, cardEventList);
          render(cardEventList);
          form.reset();
          form.classList.remove('was-validated');

        }
      }, false)
    })
})()

const addEvent = (event,eventList, cardEventList) =>{
  const title = event.target.title.value;
  const priority = event.target.priority.value;
  const date = event.target.date.value;
  const describtion = event.target.description.value;
  const checkBoxId = 'checkBoxUnactive';


  const newEvent = new Event(title, priority, date, describtion, checkBoxId);

  eventList.addEvent(newEvent);
  saveToLocalStorage();

}

