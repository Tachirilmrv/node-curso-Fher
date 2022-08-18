const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const {v4: uuidv4} = require('uuid');
const {request, response} = require('express');

const {pathUpload} = require('../helpers/fileManagement.helper');
const {User, Product} = require('../models/index.model');



cloudinary.config(process.env.CLOUDINARY_URL);


const getFile = async (req = request, res = response) => {
    let model;
    const {collection, id} = req.params;


    switch (collection) {
        case "users":
            model = await User.findById(id);


            if(!model || !model.status) {
                return res.status(404).json( {
                    "msg": `El usuario con id ${id} no existe`
                } );
            }
        break;

        case "products":
            model = await Product.findById(id);


            if(!model || !model.status) {
                return res.status(404).json( {
                    "msg": `El producto con id ${id} no existe`
                } );
            }
        break;


        default:
            return res.status(400).json( {
                "msg": "No se pueden obtener recursos de esta colección"
            } );
    }


    if(fs.existsSync(model.img) ) {
        res.status(200).sendFile(model.img);
    } else {
        const noImage = path.join(__dirname, "../assets/imgs/no-image.jpg");

        res.status(404).sendFile(noImage);
    }
}

const uploadFile = async (req = request, res = response) => { 
    const {dir} = req.query;
    const allowedExt = ['jpg', 'jpeg', 'png', 'gif'];

    let uploadPath;
    

    try {
        uploadPath = await pathUpload(req.files, allowedExt, dir);
    } catch (err) {
        return res.status(400).json( {
            "msg": err
        } );
    }
            
  
    res.status(201).json( {
        "msg": "POST a uploadFile",
        "file": uploadPath[0],
        "path": uploadPath[1]
    } );
}

const uploadFileCloudinary = async (req = request, res = response) => {
    const allowedExt = ['jpg', 'jpeg', 'png', 'gif'];
    const {f} = req.files;
    const ext = f.name.split('.').pop();


    if(!allowedExt.includes(ext) ) {
        return res.status(400).json( {
            "msg": "Extensión de archivo no permitida"
        } );
    }


    const fileName = `${uuidv4() }`;
    const uplPath = `rest_server_curso_fh/imgs/generic_trash/${fileName}`;
    const {tempFilePath} = f;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath, {public_id: uplPath} );


    res.status(200).json( {
        "msg": "POST a uploadFile cloudinary",
        "resource": secure_url
    } );
}

const updFileUpload = async (req = request, res = response) => {
    let model;
    const allowedExt = ['jpg', 'jpeg', 'png', 'gif'];
    const {collection, id} = req.params;


    switch (collection) {
        case "users":
            model = await User.findById(id);


            if(!model || !model.status) {
                return res.status(404).json( {
                    "msg": `El usuario con id ${id} no existe`
                } );
            }
        break;

        case "products":
            model = await Product.findById(id);


            if(!model || !model.status) {
                return res.status(404).json( {
                    "msg": `El producto con id ${id} no existe`
                } );
            }
        break;


        default:
            return res.status(400).json( {
                "msg": "No está permitida la subida de recursos en esta colección"
            } );
    }


    if(model.img) {
        const imgPath = path.join(__dirname, "../uploads/imgs", collection, id, model.img.split('/').pop() );

        
        if(fs.existsSync(imgPath) ) {
            fs.unlinkSync(imgPath);
        }
    }


    const uplPath = await pathUpload(req.files, allowedExt, `imgs/${collection}/${id}`);
    
    model.img = uplPath[1];


    await model.save();


    res.status(200).json( {
        "msg": "PUT a updFile",
        model
    } );
}

const updFileUploadCloudinary = async (req = request, res = response) => {
    let model;
    const allowedExt = ['jpg', 'jpeg', 'png', 'gif'];
    const {f} = req.files;


    if(!allowedExt.includes(f.name.split('.').pop() ) ) {
        return res.status(400).json( {
            "msg": "Extensión de archivo no permitida"
        } );
    }


    const {collection, id} = req.params;


    switch (collection) {
        case "users":
            model = await User.findById(id);


            if(!model || !model.status) {
                return res.status(404).json( {
                    "msg": `El usuario con id ${id} no existe`
                } );
            }
        break;

        case "products":
            model = await Product.findById(id);


            if(!model || !model.status) {
                return res.status(404).json( {
                    "msg": `El producto con id ${id} no existe`
                } );
            }
        break;


        default:
            return res.status(400).json( {
                "msg": "No está permitida la subida de recursos en esta colección"
            } );
    }


    const {tempFilePath} = f;
    const uplPath = `rest_server_curso_fh/imgs/${collection}/${id}`;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath, {public_id: uplPath} );

    
    model.img = secure_url;


    await model.save();


    res.status(200).json( {
        "msg": "PUT a updFile cloudinary",
        model
    } );
}



module.exports = {
    getFile,
    uploadFile,
    uploadFileCloudinary,
    updFileUpload,
    updFileUploadCloudinary
}