const {makeFile} = require("./helpers/3.5 Tabla multiplicaicón");
const argv = require("./config/yargs");



console.clear();


makeFile(argv.b, argv.l, argv.v)
    .then(fileName => console.log(fileName.rainbow, "creado".random) )
    .catch(err => console.log(err) );