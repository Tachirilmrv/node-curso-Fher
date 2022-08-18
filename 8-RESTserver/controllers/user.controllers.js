const bcryptjs = require('bcryptjs');
const {request, response} = require('express');

const {User} = require('../models/index.model');


// /api/user
const getUsers = async (req = request, res = response) => {
    const {from = 0, limit = 5} = req.query;
    const [users, total] = await Promise.all( [
        User.find( {status: true} )
            .skip(Number(from) )
            .limit(Number(limit) ),
        User.countDocuments( {status: true} )
    ] );


    res.status(200).json( {
        msg: "GET users",
        users,
        total
    } );
}

const crtUser = async (req = request, res = response) => {
    const {name, email, password, img, role} = req.body;
    const newUser = new User( {name, email, password, img, role} );


    newUser.password = bcryptjs.hashSync(password);

    await newUser.save();

    
    res.status(201).json( {
        msg: "POST user",
        newUser
    } );
}

const updUser = async (req = request, res = response) => {
    const {id} = req.params;
    const {uid, email, password, google, ...restBody} = req.body;
    

    if(password) {
        restBody.password = bcryptjs.hashSync(password);
    }
    
    const mUser = await User.findByIdAndUpdate(id, restBody);


    res.status(200).json( {
        msg: "PUT user",
        mUser
    } );
}

const delUser = async (req = request, res = response) => {
    let dUser;
    const {_id, role} = req.reqUser;
    const {id} = req.params;


    if(role !== "ADMIN_ROLE") {
        if(_id == id) {
            dUser = await User.findByIdAndUpdate(id, {status: false} );
        } else {
            return res.status(401).json( {
                "msg": "No autorizado a borrar un usuario que no sea usted"
            } );
        }
    } else {
        dUser = await User.findByIdAndUpdate(id, {status: false} );
    }


    res.status(200).json( {
        msg: "DELETE user",
        mUser: dUser,
        uid: _id
    } );
}



module.exports = {
    getUsers,
    crtUser,
    updUser,
    delUser
};