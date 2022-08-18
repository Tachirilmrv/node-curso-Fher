const TicketManager = require("../models/TicketManager");



const ticketManager = new TicketManager();


const socketController = (socket) => {
    console.log('Cliente conectado', socket.id);
    

    socket.emit("inf-last-ticket", ticketManager.last);
    socket.emit("current-state", ticketManager.last4);
    socket.emit("to-serve", ticketManager.all.length);
    

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    } );
    
    socket.on('next-ticket', (payload, callback) => {
        const ticket = ticketManager.nextTicket();

        socket.broadcast.emit("to-serve", ticketManager.all.length);
        
        callback(ticket);
    } );

    socket.on('tc-costumer', ( {desk}, callback) => {
        const ticket = ticketManager.serveTicket(desk);


        if(!ticket) {
            return callback( {
                error: "No hay tickets disponibles"
            } );
        } else {
            socket.broadcast.emit("current-state", ticketManager.last4);
            socket.broadcast.emit("to-serve", ticketManager.all.length);
            socket.emit("to-serve", ticketManager.all.length);

            callback( {
                error: null,
                ticket
            } );
        }
    } );
}



module.exports = {
    socketController
}