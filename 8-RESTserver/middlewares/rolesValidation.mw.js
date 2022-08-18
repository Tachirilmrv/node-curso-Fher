const {request, response} = require('express');



const adminRole = async (req = request, res = response, next) => {
    if(!req.reqUser) {
        return res.status(500).send("Algo salió mal");
    }


    const {role} = req.reqUser;


    if(role !== "ADMIN_ROLE") {
        return res.status(401).json( {
            "msg": "No tiene permisos de administración"
        } );
    }
    
    
    next();
}

const hasRole = (...roles) => {
    return (req = request, res = response, next) => {
        const {role} = req.reqUser;
        
        
        if(!req.reqUser) {
            return res.status(500).send("Algo salió mal");
        }

        if(!roles.includes(role) ) {
            return res.status(401).send("No está autorizado");  
        }


        next();
    }
}



module.exports = {
    adminRole,
    hasRole
}