const Search = require('./models/Search');
const History = require('./helpers/History');

const io = require('./helpers/io');

require('dotenv').config()



const main = async () => {
    const s = new Search();
    const h = new History();

    await h.pick();


    io.mainMenu(s, h);                                                          // Muestra el menú principal
}


main();