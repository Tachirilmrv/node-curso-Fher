import express from "express";
import cors from "cors";

import db from "../db/connection";
import userRouter from "../routes/user.routes";



class Server {
    private app: express.Application;
    private port: string;
    private path = {
        user: "/api/user"
    };


    constructor() {
        this.app = express();
        this.port = process.env.PORT || "8088";


        this.dbConnection();
        this.middlewares();
        this.routes();
    }


    async dbConnection() {
        try {
            await db.authenticate();

            console.log("Base de datos online");
        } catch(error) {
            console.error(error);


            throw new Error("Me resingo en tu puta madre Typescript");
        }
    }

    middlewares() {
        this.app.use(cors() );
        this.app.use(express.json() );
        this.app.use(express.static("public") );
    }

    routes() {
        this.app.use(this.path.user, userRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Aplicación corriendo en el puerto " + this.port);
        } );
    }
}



export default Server;