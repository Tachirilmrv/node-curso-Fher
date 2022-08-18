class Users {
    constructor() {
        this.persons = [];
    }

    
    get onlineUsers() {
        return this.persons;
    }

    
    addPerson(id, name, room) {
        const person = {id, name, room};
        
        
        this.persons.push(person);
        
        
        return person;
    }

    getPerson(id) {
        const person = this.persons.filter(p => p.id === id)[0];
    
    
        return person;
    }

    delPerson(id) {
        const person = this.getPerson(id);

        this.persons = this.persons.filter(p => p.id != id);


        return person;
    }

    onUsersByRoom(room) {
        return this.persons.filter(p => p.room === room);
    }
}



module.exports = Users;