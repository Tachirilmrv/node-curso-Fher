const inquirer = require("inquirer");
const readline = require("readline").createInterface( {
    input: process.stdin,
    output: process.stdout
} );

require("colors");



const mainMenu = async (search, history) => {
    // Define las opciones del menú principal
    const question = {
        type: "list",
        name: "opt",
        message: "¿Qué desea hacer?",
        choices: [
            {
                value: '1',
                name: `${"1.".green} Buscar ciudad`
            },
            {
                value: '2',
                name: `${"2.".green} Historial`
            },
            {
                value: '0',
                name: `${"0.".green} Salir`
            }
        ]
    }

    var option = '';
    

    do {
        console.clear();
        
        console.log("-----------------------".green);
        console.log(" Seleccione una opción".blue);
        console.log("----------------------- \n".green);
        
        
        let {opt} = await inquirer.prompt(question);

        switch (opt) {
            case '1':
                const mb_places = await search_city(search);
                const ssc = await select_city(mb_places);

                
                if (ssc.id !== '0') {
                    const place = mb_places.find(p => p.id === ssc.id);
                    const weather = await search.city_weather(place.lat, place.lng);
    
                    await history.add_history(place);
    
                    await display_shits(place, weather);
                }
            break;
            case '2':   
                const shc = await select_city(history.history);

                    
                if (shc.id !== '0') {
                    const place = history.history.find(p => p.id === shc.id);
                    const weather = await search.city_weather(place.lat, place.lng);

                    await history.add_history(place);

                    await display_shits(place, weather);
                }
            break;
            case '0':
                option = '0';
                
                history.dump();
            break;
        }
        
        await pause()
    } while(option !== '0');

    readline.close();
}


// Search a city
const search_city = async (search) => {
    // Define la pregunta a promptear para buscar una ciudad
    const question = [
        {
            type: "input",
            name: "place",
            message: "Inserte la ciudad que desea buscar:",

            validate(value) {
                if (value.length === 0) {
                    return "Por favor, ingrese un valor"
                }

                return true;
            }
        }
    ];

    const {place} = await inquirer.prompt(question);

    return await search.search_city(place);
};

// List places returned by MapBox
const list_places = async (places_list) => {
    return places_list.map( (place, i) => ( {
        value: place.id,
        name: `${i + 1}.`.green + `${place.place_name}`
    } ) );
}

// Select a city
const select_city = async (places_list) => {
    const choices = await list_places(places_list);
    
    choices.push( {
        value: '0',
        name: `${`0.`.yellow} Cancelar`
    } );

    const question = {
        type: "list",
        name: "id",
        message: "Seleccione la ciudad",
        choices
    }


    return inquirer.prompt(question);
}


// Display the whole data
const display_shits = async (place, weather) => {
    const {place_name, lat, lng} = place;
    const {temp, feels_like, temp_min, temp_max, pressure, humidity} = weather;
    const the_whole_shit = "\nInformación de la ciudad:\n".green + 
                           `Ciudad: ${place_name}\n` +
                           `Latitud: ${lat}\n` +
                           `Longitud: ${lng}\n` +
                           `Temperatura: ${temp}C\n` +
                           `Sensación térmica: ${feels_like}C\n`.green + 
                           `Temperatura mínima: ${temp_min}C\n`.cyan + 
                           `Temperatura máxima: ${temp_max}C\n`.yellow +
                           `Presión atmosférica: ${pressure}hPa\n` +
                           `Humedad relativa: ${humidity}%`;


    console.log(the_whole_shit);
}


// Pausa la entrada en la cosola
const pause = async () => {
    const question = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${"enter".green} para continuar`
        }
    ];


    console.log();
    
    await inquirer.prompt(question);
}



module.exports = {
    mainMenu
}