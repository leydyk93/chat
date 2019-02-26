

class Users {

    constructor(){
        this.persons = []
    }

    addPersons(id, name, sala){
        let person = { id, name, sala};

        this.persons.push(person)

        return this.getPersonsRoom(sala)
    }

    getPersons(){
        return this.persons;
    }

    getPerson(id){
        let pers = this.persons.find((p)=> p.id === id)
        return  pers
    }

    getPersonsRoom(sala){
        let perSala = this.persons.filter( ele => ele.sala === sala )
        return perSala
    }

    deletePerson(id){
        let per = this.persons.findIndex((p)=> p.id === id)
        
        let perDelete = this.persons.splice(per, 1)

        return perDelete
    }

}

module.exports = {Users}