const { io } = require('../server');

const { Users} = require('../classes/usuario')

const { createMessage } = require('../utilities/utilities')

let users = new Users()
io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('connectChat', (data, callback)=>{
        
        if(!data.name){
            callback({
                error: true,
                message: "Es necesario el nombre del usuario"
            })
        }

        let pers = users.addPersons(client.id, data.name)
        client.broadcast.emit('listPersons', users.getPersons())
        callback(pers)

    })

    client.on('createMessage', (data)=>{
        let per = users.getPerson(client.id)

        let message = createMessage(per.name, data.message)
       
        client.broadcast.emit('createMessage', message)
    })

    client.on('disconnect', ()=>{
        let per = users.deletePerson(client.id)
        client.broadcast.emit('listPersons', users.getPersons())
        client.broadcast.emit('createMessage', createMessage('Admin', ` El usuario ${per[0].name} ha abandonado el chat`))
    })

    //mensajes privado

    client.on('privateMessage', (data)=>{
        let per = users.getPerson(client.id)
        client.broadcast.to(data.for).emit('privateMessage', createMessage('Admin', `Yo ${per.name} te envio el msj ${data.message}`))
    })
    
});