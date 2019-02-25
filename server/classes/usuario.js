

class Users {

    constructor(){
        this.persons = []
    }

    addPersons(id, name){
        let person = { id, name };

        this.persons.push(person)

        return this.persons
    }

    getPersons(){
        return this.persons;
    }

    getPerson(id){
        let pers = this.persons.find((p)=> p.id === id)
        return  pers
    }

    getPersonsRoom(){

    }

    deletePerson(id){
        let per = this.persons.findIndex((p)=> p.id === id)
        
        let perDelete = this.persons.splice(per, 1)

        return perDelete
    }

}

module.exports = {Users}