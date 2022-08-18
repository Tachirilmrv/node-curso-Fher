const axios = require("axios");



class Search {
    async search_city(place = "La Habana") {
        try {
            const instance = axios.create( {
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: {
                    "language": "es",
                    "access_token": process.env.MAPBOX_KEY
                }
            } );
            const resp = await instance.get();
    
    
            return resp.data.features.map(mb_place => ( {
                id: mb_place.id,
                place_name: mb_place.place_name,
                lat: mb_place.center [1],
                lng: mb_place.center [0]
            } ) );
        } catch (error) {
            console.log("Algo ha salido mal");
            console.log(error);
            
            
            return [];
        }
    }

    async city_weather(lat, lon) {
        try {
            const instance = axios.create( {
                baseURL: "https://api.openweathermap.org/data/2.5/weather",
                params: {
                    lat,
                    lon,
                    "appid": process.env.OPENWEATHER_KEY,
                    "units": "metric",
                    "lang": "es"
                }
            } );
            const resp = await instance.get();


            return resp.data.main;
        } catch (error) {
            console.log("Algo ha salido mal");
            console.log(error);
        }
    }
}



module.exports = Search;