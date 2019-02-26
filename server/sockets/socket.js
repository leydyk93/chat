const { io } = require('../server');

const { Users} = require('../classes/usuario')

const { createMessage } = require('../utilities/utilities')

let users = new Users()
io.on('connection', (client) => {

    client.on('connectChat', (data, callback)=>{
        
        if(!data.name || !data.sala){
            callback({
                error: true,
                message: "Es necesario el nombre y una sala para establecer la conexión"
            })
        }
        client.join(data.sala)
        let pers = users.addPersons(client.id, data.name, data.sala)
        client.broadcast.to(data.sala).emit('listPersons', users.getPersonsRoom(data.sala))
        client.broadcast.to(data.sala).emit('createMessage', createMessage('Admin', `El usuario ${data.name} se ha unido al chat`))
        callback(pers)

    })

    client.on('createMessage', (data, callback)=>{
        let per = users.getPerson(client.id)

        let message = createMessage(per.name, data.message)
        
        client.broadcast.to(per.sala).emit('createMessage', message)

        callback(message)
    })

    client.on('disconnect', ()=>{
        let per = users.deletePerson(client.id)[0]
        client.broadcast.to(per.sala).emit('listPersons', users.getPersonsRoom(per.sala))
        client.broadcast.to(per.sala).emit('createMessage', createMessage('Admin', ` El usuario ${per.name} ha abandonado el chat`))
    })

    //mensajes privado

    client.on('privateMessage', (data)=>{
        let per = users.getPerson(client.id)
        client.broadcast.to(data.for).emit('privateMessage', createMessage('Admin', `Yo ${per.name} te envio el msj ${data.message}`))
    })
    
});