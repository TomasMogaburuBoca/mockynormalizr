const { Socket } = require("socket.io");

const containerChat = document.getElementById('chat');

function sendMessage(){
    let message = document.getElementById('message')
    let email = document.getElementById('email')
    let names = document.getElementById('names')
    let lastname = document.getElementById('lastname')
    let alias = document.getElementById('alias')
    let age = document.getElementById('age')


Socket.emit ('client:newMessage', {
    author: {
        email: email.value,
        names: names.value,
        lastname: lastname.value,
        age: age.value,
        alias: alias.value,
        avatar: ''
    },
    text: message.value,
    dateTime: dayjs().format('DD/MM/YYYY HH:MM:ss')
    });
}

function renderMessage(messages) {
    console.log(messages);
    let div =document.getElementById('chat-content');

    for (let index = div.childNodes.length -1; index < messages.length; index ++){
        const element = messages [index];
        let msg = document.createElement ('span');

        msg.id = 'msg-' + index;
        msg.classList('msg');
        msg.innerHTML = "<div class ='head>'" + element.author.email + '</div>';
        msg.innerHTML += "<p class='body>" + element.text + '</p>';
        msg.innerHTML += "<div class='footer'>" + element.dateTime + "</div>";
        div.appendChild (msg);
    }
}

Socket.on ('server: sendMessages', async (data) =>{
    const author = new normalizr.schema.Entity(
        'author', {}, { idAttribute: 'email' }
    );
    const messages = new normalizr.schema.Entity('messages');
    const schema = new normalizr.schema.Array({
        messages: messages,
        author: author
    });
    const messageDenormalized = normalizr.denormalize(
        data.result,
        schema,
        data.entities
    );

    const original = JSON.stringify(data.original).length;
    const dataNormalizr = JSON.stringify(data.result).length;

    const resp = await fetch('./chat.handlebars');
    const hbs = await resp.text();
    const template = Handlebars.compile(hbs);
    const html = template({ messagesDenormalized });
    containerChat.innerHTML = html;
    renderMessages(messagesDenormalized);
    console.log(original, dataNormalizr)
    const compressionValue = ((dataNormalizr/original ) * 100);
    document.getElementById(
        'compression'
    ).innerHTML = `<div class='head'> ${Math.ceil(compressionValue)} %</div>`;
});