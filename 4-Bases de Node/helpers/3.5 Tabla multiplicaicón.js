const fs = require('fs');
const colors = require('colors')



const makeFile = async (base, limit, verbose) => {
    let output = "";
    let consoleT = "";

    consoleT += "--------------- \n".red;
    consoleT += `Tabla del: ${base} \n`.green;
    consoleT += "--------------- \n".red;


    for (let i = 1; i <= limit; i++) {
        output += `${base} x ${i} = ${base * i} \n`;
        consoleT += `${base}`.yellow + ` x `.blue + `${i}`.yellow + ` = `.magenta + `${base * i}`.cyan + `\n`;
    }

    try {
        const fileName = `tabla ${base}.txt`;
        

        fs.writeFileSync(`out/${fileName}`, output);
        
        if (verbose) {
            console.log(consoleT);
        }
        
        
        return fileName;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    makeFile
}