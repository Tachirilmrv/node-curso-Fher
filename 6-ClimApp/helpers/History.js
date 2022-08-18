const fs = require('fs');
const path = "./db/city_list.json";



class History {
    history = [];



    constructor () {
        
    }



    async add_history(place) {
        if(!this.history.includes(place) ) {
            if(this.history.length >= 5) {
                this.history = this.history.splice(1, 4)
            }

            this.history.push(place);
        }
    }
    
    
    async dump() {
        fs.writeFileSync(path, JSON.stringify(this.history) );
    };
    
    async pick () {
        if(fs.existsSync(path) ) {
            this.history = JSON.parse(fs.readFileSync(path, {encoding: "utf-8"} ) );
        }
    };
}



module.exports = History;