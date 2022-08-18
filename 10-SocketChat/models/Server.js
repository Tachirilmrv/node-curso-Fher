const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');

const {dbConnection} = require('../database/config.db');
const socketController = require('../sockets/controller');

require('dotenv').config();



class Server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.path = {
            auth:       "/api/auth",
            categories: "/api/categories",
            products:   "/api/products",
            search:     "/api/search",
            upload:     "/api/upload",
            user:       "/api/user"
        }

        this.dbConnect();

        this.middlewares();

        this.routes();

        this.sockets();

        this.listen();
    }


    dbConnect () {
        dbConnection();
    }

    middlewares() {
        this.app.use(cors() );
        this.app.use(express.json() );
        this.app.use(express.static("public") );
        this.app.use(fileUpload( {
            useTempFiles: true,
            tempFileDir: "/tmp/",
            createParentPath: true
        } ) );
    }

    routes() {
        this.app.use(this.path.auth,       require("../routes/auth.routes") );
        this.app.use(this.path.categories, require("../routes/categories.routes") );
        this.app.use(this.path.products,   require("../routes/products.routes") );
        this.app.use(this.path.search,     require("../routes/search.routes") );
        this.app.use(this.path.upload,     require("../routes/upload.routes") );
        this.app.use(this.path.user,       require("../routes/user.routes") );
    }

    sockets() {
        this.io.on("connection", socketController);
    }

    listen() {
        this.server.listen(this.port);
    }
}



module.exports = Server;