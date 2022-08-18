// HTML references
const newTicketLbl = document.getElementById("newTicketLbl");
const newTicketBtn = document.getElementById("newTicketBtn");



const socket = io();


socket.on('connect', () => {
    newTicketBtn.disabled = false;
} );

socket.on('disconnect', () => {
    newTicketBtn.disabled = true;
} );

socket.on("inf-last-ticket", (last) => {
    newTicketLbl.innerText = `Ticket ${last.number}`;
} );



newTicketBtn.addEventListener('click', () => {
    socket.emit("next-ticket", null, (ticket) => {
        newTicketLbl.innerText = `Ticket ${ticket.number}`; 
    } );
} );