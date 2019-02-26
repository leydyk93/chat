var socket = io();

var params = new URLSearchParams(window.location.search);

var user = { name: params.get('name') , sala: params.get('sala')}

if(!params.has('name') || !params.has('sala')){
    window.location = 'index.html'
    throw new Error('El nombre es necesario')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('connectChat', user, function(resp){
        //console.log('Usuarios conectados', resp)
        renderUSer(resp)
        
    })
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


// socket.emit('createMessage', {
//     message
// })

socket.on('createMessage', (data)=>{
    ///console.log(data)
    renderMessage(data, false)
    scrollBottom()
})

socket.on('privateMessage', (data)=>{
    console.log("Message",data)
})

socket.on('listPersons', (data)=>{
    renderUSer(data)
    //console.log(data, "lista de personas")
})
