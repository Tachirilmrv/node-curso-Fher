import dotenv from "dotenv";

import User from "./models/user.model";
import Server from './models/Server';



dotenv.config();


const server = new Server();


server.listen();
User.sync();