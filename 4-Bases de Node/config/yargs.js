const argv = require("yargs")
                .option('b', {
                    alias: "base",
                    type: "number",
                    demandOption: true,
                    desc: "Número del cual se quiere obtener la tabla de multiplicación"
                } )
                .option('v', {
                    alias: "verbose",
                    type: "boolean",
                    default: false,
                    desc: "Muestra la tabla de multiplicar a escribir en el archivo"
                } )
                .option('l', {
                    alias: "limit",
                    type: "number",
                    default: 10,
                    desc: "Hasta que número multiplicar la base"
                } )
                .check( (argv, options) => {
                    if(isNaN(argv.b) ) {
                        throw "La base ha de ser un número"
                    }

                    return true;
                } )
                .argv;



module.exports = argv;