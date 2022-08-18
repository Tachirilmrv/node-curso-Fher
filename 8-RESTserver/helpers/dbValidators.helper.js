const mongoose = require('mongoose');

const {User, Role, Category, Product} = require('../models/index.model');



// Role related
const validRole = async (role = '') => {
    const existRole = await Role.findOne( {role} );


    // Verificar que existe el rol especificado
    if(!existRole) {
        throw new Error(`El rol ${role} no está registrado en la base de datos`);
    }
}



// User related
const dupEmail = async (email = '') => {
    const existEmail = await User.findOne( {email} );


    // Verificar correos duplicados
    if(existEmail) {
        throw new Error(`El correo ${email} ya está registrado en la base de datos`);
    }
}

const existEmail = async (email = '') => {
    const existEmail = await User.findOne( {email} );


    // Verificar que existe el correo especificado
    if(!existEmail) {
        throw new Error(`El correo ${email} no está registrado en la base de datos`);
    }
}


const validUserID = async (id) => {
    const existUser = await User.findById(id);


    // Verificar que existe uid especificado
    if(!existUser) {
        throw new Error(`El id ${id} no está registrado en la base de datos`);
    }
}



// Category related
const validCatID = async (id) => {
    const existCat = await Category.findById(id);


    // Verificar que existe uid especificado
    if(!existCat) {
        throw new Error(`El id ${id} no está registrado en la base de datos`);
    }
}



// Product related
const validProdID = async (id) => {
    const existProd = await Product.findById(id);


    // Verificar que existe uid especificado
    if(!existProd) {
        throw new Error(`El id ${id} no está registrado en la base de datos`);
    }
}


// DB collections related
const validCollection = async (collection) => {
    const collNames = [];
    const collections = await mongoose.connection.db.listCollections().toArray();
    

    collections.forEach( (c) => {
        collNames.push(c.name);
    } );


    // Verificar que existe la colección especificada
    if(!collNames.includes(collection) ) {
        throw new Error(`La colección ${collection} no existe en la base de datos`);
    }
}



module.exports = {
    validRole,
    dupEmail,
    existEmail,
    validUserID,
    validCatID,
    validProdID,
    validCollection
}