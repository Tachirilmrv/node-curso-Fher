const jwt = require('jsonwebtoken');

const {User} = require('../models/index.model');



const checkJWTSocket = async (token) => {
    try {
        const {_id} = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(_id);


        if(user && user.status) {
            return user;
        } else {
            throw new Error("No existe este usuario");
        }
    } catch(error) {
        console.log(error);
    }
}



module.exports = {
    checkJWTSocket
}