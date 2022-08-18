const fs = require('fs');
const path = require('path');

const Ticket = require('./Ticket');



class TicketManager {
    constructor() {
        this.last  = new Ticket(0, null);
        this.all   = [];
        this.last4 = [];
        this.today = new Date().getDate();

        this.init();
    }


    get toJson() {
        return {
            last:  this.last,
            all:   this.all,
            last4: this.last4,
            today: this.today,
        }
    }


    init() {
        const {last, all, last4, today} = require('../db/data.json');


        if(today === this.today) {
            this.last  = last;
            this.all   = all;
            this.last4 = last4;
        } else {
            this.saveToJSON();
        }
    }

    saveToJSON() {
        const dbPath = path.join(__dirname, "../db/data.json");


        fs.writeFileSync(dbPath, JSON.stringify(this.toJson) );
    }

    nextTicket() {
        const n = this.last.number + 1;
        const ticket = new Ticket(n, null);


        this.last = ticket;
        this.all.push(ticket);
        this.saveToJSON();


        return ticket;
    }

    serveTicket(desk) {
        if(this.all.length === 0) {
            return null;
        }

        
        const ticket = this.all.shift();

        ticket.desk = desk;


        this.last4.unshift(ticket);


        if(this.last4.length > 4) {
            this.last4.pop();
        }


        this.saveToJSON();


        return ticket;
    }
}



module.exports = TicketManager;