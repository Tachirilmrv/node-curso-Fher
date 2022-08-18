const mongoose = require('mongoose');

require('dotenv');



const dbConnection = () => {
    const dbURL = process.env.MONGODB_CNN;


    try {
        mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } );

        console.log("Base de datos conectada");  
    } catch (error) {
        console.log(error);
        throw new Error("Error al establecer la conexión con la base de datos");
    }
}



module.exports = {
    dbConnection
}