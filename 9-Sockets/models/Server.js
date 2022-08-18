const cors = require('cors');
const express = require('express');

const {socketController} = require('../sockets/socket.controller');



class Server {
    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.server);
        this.paths = {};


        // Middlewares
        this.middlewares();

        // Sockets
        this.sockets();
    }


    middlewares() {
        this.app.use(cors() );

        // Directorio Público
        this.app.use(express.static('public') );
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        } );
    }
}



module.exports = Server;