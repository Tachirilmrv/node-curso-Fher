const {request, response} = require('express');



const existFile = async (req = request, res = response, next) => {
    if (!req.files || !req.files.f || Object.keys(req.files).length === 0) {
        return res.status(400).json( {
            "msg": "No se subió ningún archivo"
        } );
    }


    next();
}



module.exports = {
    existFile
}