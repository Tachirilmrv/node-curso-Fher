const jwt = require('jsonwebtoken');
const {request, response} = require('express');

require('dotenv');



const {User} = require("../models/index.model");


const validateJWT = async (req = request, res = response, next) => {
    const token = req.header("x-token");
    const privateKey = process.env.SECRET;


    // Verificar que el token fue enviado como parte de los headers de la request
    if(!token) {
        return res.status(401).json( {
            "msg": "No está autorizado"
        } );
    }

    try {
        const {_id} = await jwt.verify(token, privateKey);
        const reqUser = await User.findById(_id);


        // Verificar que el usuario que hizo la request existe
        if(!reqUser) {
            throw new Error();
        }
    
        // Verificar que el usuario que hizo la request esté activo
        if(!reqUser.status) {
            throw new Error();
        }


        req.reqUser = reqUser;


        next();
    } catch (error) {
        console.log(error);
        
        
        return res.status(401).json( {
            "msg": "Token no válido"
        } );
    }
}



module.exports = {
    validateJWT
}