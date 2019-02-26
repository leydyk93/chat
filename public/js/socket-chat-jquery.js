
var params = new URLSearchParams(window.location.search);

var name = params.get('name')
var sala = params.get('sala')

var divUSer = $('#divUsuarios');
var sendForm = $('#sendForm');
var textMessage = $('#textMessage');
var divChatbox = $('#divChatbox');

// funciones para renderizar 

function renderUSer(per) {
    console.log(per)

    var html = '';

    html += '<li>';
    html += '   <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (let i = 0; i < per.length; i++) {
        html += '<li>';
        html += '    <a data-id="' + per[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + per[i].name + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUSer.html(html);
}

function renderMessage(message, me) {

    var messa = '';
    var date = new Date(message.date)
    var hour = date.getHours() + ':' + date.getMinutes();
   
    var adminClass = 'info';

    if ( message.name == 'Admin') {
        adminClass = 'danger'
    }
   
    if(!me){
        messa += '<li class="animated fadeIn">';
        
        if(message.name !== 'Admin')
        messa += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        
        messa += '<div class="chat-content">';
        messa += '<h5>' + message.name + '</h5>';
        messa += '<div class="box bg-light-'+adminClass+'">' + message.message + '</div>';
        messa += '</div>';
        messa += '<div class="chat-time">'+hour+'</div>';
        messa += '</li>';
    }else {
        messa += '    <li class="reverse">';
        messa += '    <div class="chat-content">';
        messa += '        <h5>' + message.name + '</h5>';
        messa += '        <div class="box bg-light-inverse">'+ message.message +'</div>';
        messa += '    </div>';
        messa += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        messa += '    <div class="chat-time">'+hour+'</div>';
        messa += '    </li>';
    }
    divChatbox.append(messa);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//listener
divUSer.on('click', 'a', function () {
    var id = $(this).data('id');

    if (id) {
        console.log(id)
    }
})

sendForm.on('submit', function (e) {
    e.preventDefault();

    if (textMessage.val().trim().length === 0) {
        return;
    }

    socket.emit('createMessage', {
        message: textMessage.val()
    }, function (message) {

        if (message) {

            renderMessage(message, true)
            scrollBottom()
            textMessage.val('').focus()

        }
    })

})