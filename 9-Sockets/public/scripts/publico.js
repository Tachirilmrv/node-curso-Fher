const socket = io();


socket.on("current-state", (payload) => {
    const audio = new Audio("./public/audio/new-ticket.mp3");
    
    
    audio.play();

    
    for (let i = 1; i <= 4; i++) {
        const ticket = payload[i - 1];


        const lbl = document.getElementById(`ticket${i}Lbl`);
        const desk = document.getElementById(`desk${i}Lbl`);


        lbl.innerText = `Ticket ${ticket.number}`;
        desk.innerText = ticket.desk;
    }
} ); 