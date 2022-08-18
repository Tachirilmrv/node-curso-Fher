const path = require('path');
const {v4: uuidv4} = require('uuid');



// Verifies the extension of the file and returns its path
const pathUpload = async (files, allowedExt, dir = '') => {
    return new Promise( (resolve, reject) => { 
        const {f} = files;
        const ext = f.name.split('.').pop();
        const fileName = `${uuidv4() }.${ext}`;
        const uploadPath = path.join(__dirname, '../uploads/', dir,  fileName);


        if(!allowedExt.includes(ext) ) {
            return reject("Extensión de archivo no permitida");
        } else {
            f.mv(uploadPath, (err) => {
                if(err) {
                    return reject(err);
                }
            } );
    
        
            resolve( [fileName, uploadPath] );
        }
    } );
}



module.exports = {
    pathUpload
}