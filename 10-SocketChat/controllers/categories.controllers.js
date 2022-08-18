const {request, response} = require('express');

const {Category} = require('../models/index.model');



// /api/categories
const getCategories = async (req = request, res = response) => {
    const {from = 0, limit = 5} = req.query;
    const [cats, total] = await Promise.all( [
        Category.find( {status: true} )
            .skip(Number(from) )
            .limit(Number(limit) )
            .populate("user", "name"),
        Category.countDocuments( {status: true} )
    ] );


    res.status(200).json( {
        "msg": "GET categorías",
        cats,
        total
    } );
}

const getCategoryByID = async (req = request, res = response) => {
    const {id} = req.params;
    const cat = await Category.findById(id).populate("user", "name");
    
    
    res.status(200).json( {
        "msg": "GET categoría",
        cat
    } );
}

const crtCategory = async (req = request, res = response) => {
    let {name} = req.body;
    name = name.toUpperCase();
    const cat = await Category.findOne( {name} );
    
    
    if(cat) {false
        return res.status(400).json( {
            "msg": `La categoría ${cat.name} ya está registrada`
        } );
    }
    
    
    const newCat = new Category( {
        name,
        user: req.reqUser}
    );


    await newCat.save();
    
    
    res.status(201).json( {
        "msg": "POST categoría",
        newCat
    } );
}

const updCategory = async (req = request, res = response) => {
    let {name} = req.body;
    const {id} = req.params;
    

    name = name.toUpperCase();


    const mCat = await Category.findByIdAndUpdate(id, {
        name,
        user: req.reqUser
    } );
    
    
    res.status(200).json( {
        "msg": "PUT categoría",
        mCat
    } );
}

const delCategory = async (req = request, res = response) => {
    const {id} = req.params;
    const dCat = await Category.findByIdAndUpdate(id, {
        status: false, 
        user: req.reqUser
    } );
    
    
    res.status(200).json( {
        "msg": "DELETE categoría",
        dCat
    } );
}



module.exports = {
    getCategories,
    getCategoryByID,
    crtCategory,
    updCategory,
    delCategory
}