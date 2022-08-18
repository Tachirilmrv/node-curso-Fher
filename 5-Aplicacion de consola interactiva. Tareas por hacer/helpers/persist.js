const fs = require('fs');



const path = "./db/taskList.json";


// Escribe un obejto a un .json
const dump = (data) => {
    fs.writeFileSync(path, JSON.stringify(data) );
};

// Lee un objeto desde un .json
const pick = () => {
    if(fs.existsSync(path) ) {
        return JSON.parse(fs.readFileSync(path, {encoding: "utf-8"} ) );
    }
};



module.exports = {
    dump,
    pick
}