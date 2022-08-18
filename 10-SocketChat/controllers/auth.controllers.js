const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const {request, response} = require('express');

require('dotenv');

const {User} = require('../models/index.model');
const {nonGoogleVerify} = require('../helpers/index.helper');


// /api/auth/login
const loginPost = async (req = request, res = response) => {
    const privateKey = process.env.SECRET;
    const {email} = req.body;
    const {_id, password, status} = await User.findOne( {email} );
    const validPassw = bcryptjs.compareSync(req.body.password, password);


    // Verificar que existe el usuario está activo
    if(!status) {
        return res.status(400).json( {
            "msg": "No existe este usuario"
        } );
    }

    // Verificar que las contraseñas coinciden
    if(!validPassw) {
        return res.status(400).json( {
            "msg": "La contraseña es incorrecta"
        } );
    }
    

    // Crear token con payload = uid del usuario
    const token = await jwt.sign( {_id}, privateKey, {expiresIn: "4h"} );


    res.status(200).json( {
        "msg": "bish",
        token
    } );
}

// /api/auth/google
const googlePost = async (req = request, res = response) => {
    const privateKey = process.env.SECRET;
    const {id_token} = req.body;
    const {name, email} = await nonGoogleVerify(id_token);
    let user = await User.findOne( {email} );


    // Si el usuario no existe crear uno nuevo
    if(!user) {
        const pass = `${email} ${name} :P oogle`;
        const password = bcryptjs.hashSync(pass);

        user = new User( {
            name,
            email,
            password,
            google: true
        } );


        await user.save();
    }

    // Verificar el estado del usuario
    if(!user.status) {
        return res.status(401).json( {
            "msg": "El usuario no existe. Fue eliminado"
        } );
    }

    // Crear token con payload = uid del usuario
    const {_id} = user;
    const token = await jwt.sign( {_id}, privateKey, {expiresIn: "4h"} );

    
    res.status(200).json( {
        "msg": "POST google",
        user,
        token
    } );
}

// /api/auth
const renewToken = async (req = request, res = response) => {
    const {reqUser} = req;
    const privateKey = process.env.SECRET;

    // Crear token con payload = uid del usuario
    const {_id} = reqUser;
    const token = jwt.sign( {_id}, privateKey, {expiresIn: "4h"} );


    res.status(200).json( {
        user: reqUser,
        token
    } );
}



module.exports = {
    loginPost,
    googlePost,
    renewToken
}