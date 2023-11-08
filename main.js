//Class Event
class Event{
  constructor(title, priority, date, description,dateAsObject){
    this.title = title;
    this.priority = priority;
    this.date = date;
    this.description = description
    this.dateAsObject = dateAsObject;
  }
}
// Class EventList
class EventList{
  constructor(eventsList){
    this.eventsList = [];
  }
  addEvent(event){
    this.eventsList.push(event);
  }
}
// Class CardEvent
class CardEvent{
  constructor(event, title, priority, date, description){
    this.event = event;
    this.title = title;
    this.priority = priority;
    this.date = date;
    this.description = description;

  }
}
//class CardEventList
class CardEventList{
  constructor(cardEventsList){
    this.cardEventsList = [];
  }
  addCardEvent(event){
    this.cardEventsList.push(event);
  }
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  const eventList = new EventList([]);
  const cardEventList = new CardEventList([]);
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault()
        if (!form.checkValidity()) {
          event.stopPropagation()
          form.classList.add('was-validated')
        } else{
          addEvent(event, eventList, cardEventList);
          checkExpiredDate(eventList, cardEventList);
          form.reset();
          form.classList.remove('was-validated')
        }
      }, false)
    })
})()

const addEvent = (event,eventList, cardEventList) =>{
  const title = event.target.title.value;
  const priority = event.target.priority.value;
  const date = event.target.date.value;
  const dateAsObject = event.target.date.valueAsDate;
  const describtion = event.target.description.value;
  const newEvent = new Event(title, priority, date, describtion, dateAsObject);
  eventList.addEvent(newEvent);

  createEventElement(newEvent, cardEventList);
}

const createEventElement = (element, cardEventList)  => {
  const listElements = document.getElementById('list-elements');

  const li = document.createElement('li');
  const h2 = document.createElement('h2');
  const priorityFilter = document.createElement('button');
  const h3 = document.createElement('h3');
  const p = document.createElement('p');

  li.classList.add('list-group-item');
  li.classList.add('mt-3');

  h2.textContent = element.title;
  priorityFilter.textContent = element.priority;
  h3.textContent = element.date;
  p.textContent = element.description;

  priorityFilter.classList.add('btn');
  choosePriorityColor(priorityFilter, element);

  addElementsOfEvent(element, h2, priorityFilter, h3, p, cardEventList);

  li.append(h2);
  li.append(priorityFilter);
  li.append(h3);
  li.append(p);

  listElements.append(li);
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

//Function for add HTML elements to CardEventList
addElementsOfEvent = (element, h2, priorityFilter, h3, p, cardEventList) => {
  const cardEvent = new CardEvent(element,h2,priorityFilter,h3,p);
  cardEventList.addCardEvent(cardEvent);
}


//Change the color if date is expired
checkExpiredDate = (eventList, cardEventList) => {
  const today = new Date (Date.now());
  eventList.eventsList.forEach(element => {
    if(element.dateAsObject > today){
      cardEventList.cardEventsList.forEach(eventInList => {
        if(eventInList.event === element){
          eventInList.date.style.color = 'green';
        }
      })
    } else if((element.dateAsObject < today)){
      cardEventList.cardEventsList.forEach(eventInList => {
        if(eventInList.event === element){
          eventInList.date.style.color = 'red';
        }
      })
    }
  })
};