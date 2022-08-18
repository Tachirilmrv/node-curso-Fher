const {request, response} = require('express');

const {Product, Category} = require('../models/index.model');



// /api/products
const getProducts = async (req = request, res = response) => {
    const {from = 0, limit = 5} = req.query;
    const [prods, total] = await Promise.all( [
        Product.find( {status: true} )
            .skip(Number(from) )
            .limit(Number(limit) )
            .populate("user", "name")
            .populate("category", "name"),
        Product.countDocuments( {status: true} )
    ] );


    res.status(200).json( {
        "msg": "GET productos",
        prods,
        total
    } );
}

const getProductByID = async (req = request, res = response) => {
    const {id} = req.params;
    const prod = await Product.findById(id)
                            .populate("user", "name")
                            .populate("category", "name");
    
    
    res.status(200).json( {
        "msg": "GET producto",
        prod
    } );
}

const crtProduct = async (req = request, res = response) => {
    let {status, user,  /* Ignored */
    /* Used */   name, category, ...rb} = req.body;
    name = name.toUpperCase();
    category = category.toUpperCase();
    const prod = await Product.findOne( {name} );
    
    
    if(prod) {
        return res.status(400).json( {
            "msg": `El producto ${prod.name} ya está resgistrado`
        } );
    }

    
    const cat = await Category.findOne( {name: category} );


    if(!cat) {
        return res.status(400).json( {
            "msg": `La categoría ${category} no existe`
        } );
    }


    const newProd = new Product( {
        name,
        category: cat,
        user: req.reqUser,
        ...rb
    } );


    await newProd.save();
    
    
    res.status(201).json( {
        "msg": "POST producto",
        newProd
    } );
}

const updProduct = async (req = request, res = response) => {
    let {status, user,  /* Ignored */
    /* Used */   name, category, ...rb} = req.body;
    const {id} = req.params;
    

    if(name) {
       name = name.toUpperCase();


       rb.name = name;
    }

    if(category) {
        category = category.toUpperCase();
        const cat = await Category.findOne( {name: category} );


        if(!cat) {
            return res.status(400).json( {
                "msg": `La categoría ${category} no existe`
            } );
        }


        rb.category = cat;
    }


    const mProd = await Product.findByIdAndUpdate(id, {
        user: req.reqUser,
        ...rb
    } );
    
    
    res.status(200).json( {
        "msg": "PUT producto",
        mProd
    } );
}

const delProduct = async (req = request, res = response) => {
    const {id} = req.params;
    const dProd = await Product.findByIdAndUpdate(id, {
        status: false, 
        user: req.reqUser
    } );
    
    
    res.status(200).json( {
        "msg": "DELETE producto",
        dProd
    } );
}



module.exports = {
    getProducts,
    getProductByID,
    crtProduct,
    updProduct,
    delProduct
}