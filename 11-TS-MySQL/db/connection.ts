import {Sequelize} from "sequelize";



const db = new Sequelize("cursofh-ts-msql", "tachiri", "Lmrv 1803", {
    host: "localhost",
    dialect: "mariadb"
} );



export default db;