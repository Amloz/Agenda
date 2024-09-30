const eventForm = document.getElementById('eventForm');
const eventTable = document.getElementById('eventTable');
const eventNameInput = document.getElementById('eventName');
const eventDateInput = document.getElementById('eventDate');

let events = []; // Arreglo para almacenar los eventos

eventForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const eventName = eventNameInput.value;
    const eventDate = eventDateInput.value;

    if (eventName && eventDate) {
        const newEvent = {
            name: eventName,
            date: eventDate
        };
        events.push(newEvent);
        renderEvents();
        eventNameInput.value = '';
        eventDateInput.value = '';
        localStorage.setItem('events', JSON.stringify(events));
    } else if(!eventName && !eventDate) {
        alert('Por favor, ingresa un nombre y una fecha para el evento.');
    } else if (!eventName){
        alert('Por favor, ingresa un nombre para el evento.');
    } else if (!eventDate){
        alert('Por favor, ingresa una fecha para el evento.');
    } 
});

function renderEvents(filteredEvents = events) {
    eventTable.innerHTML = '';

    filteredEvents.forEach(event => {
        const newRow = document.createElement('tr');
        const nameCell = document.createElement('td');
        const dateCell = document.createElement('td');
        const actionsCell = document.createElement('td');

        nameCell.textContent = event.name;
        dateCell.textContent = event.date;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', () => {
            const index = events.indexOf(event);
            events.splice(index, 1);
            //Actualizar localStorage
            localStorage.setItem('events', JSON.stringify(events));
            renderEvents();
        });
        actionsCell.appendChild(deleteButton);

        newRow.appendChild(nameCell);
        newRow.appendChild(dateCell);
        newRow.appendChild(actionsCell);
        eventTable.appendChild(newRow);
    });
}

const storedEvents = localStorage.getItem('events');
if (storedEvents) {
  events = JSON.parse(storedEvents);
  renderEvents();
}