// Referencias HTML
const deskLbl = document.getElementById('deskLbl');
const alertLbl = document.getElementById('alertLbl');
const servingLbl = document.getElementById('servingLbl');
const toServeLbl = document.getElementById('toServeLbl');
const nextTicketBtn = document.getElementById('nextTicketBtn');



const searchParams = new URLSearchParams(window.location.search);


if(!searchParams.has("desk") ) {
    window.location = "index.html";


    throw new Error("El escritorio es obligatorio");
}


const socket = io();

const desk = searchParams.get("desk");

deskLbl.textContent = desk;
alertLbl.style.display = "none";


socket.on('connect', () => {
    nextTicketBtn.disabled = false;
} );

socket.on('disconnect', () => {
    nextTicketBtn.disabled = true;
} );

socket.on("to-serve", (length) => {
    toServeLbl.textContent = length;
} );



nextTicketBtn.addEventListener('click', () => {
    socket.emit("tc-costumer", {desk}, ( {error, ticket} ) => {
        if(error) {
            servingLbl.innerText = "Nadie";
            alertLbl.style.display = '';
        } else {
            servingLbl.innerText = `Ticket ${ticket.number}`;
        }
    } );
} );