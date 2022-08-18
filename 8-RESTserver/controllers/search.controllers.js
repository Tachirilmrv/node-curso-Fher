const {request, response} = require('express');



const allowedCollections = ["users", "categories", "products"];


const genericSearch = async (req = request, res = response) => {
    const {collection, q, from = 0, limit = 5} = req.query;


    if(!q) {
        return res.status(400).json( {
            "msg": "La término a buscar debe ser especificado"
        } );
    }
    
    if(collection) {
        if(!allowedCollections.includes(collection) ) {
            return res.status(400).json( {
                "msg": `Las colecciones permitidas son ${allowedCollections}`
            } );
        }
    }


    
    
    
    res.status(200).json( {
        "msg": "GET search",
        collection,
        q,
        from,
        limit
    } );
}



module.exports = {
    genericSearch
}