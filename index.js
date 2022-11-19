const express = require ('express');
const { urlencoded } = require ('express');
const { Server } = require('http');
const path = require ('path');
const router = require ('./routes');
const app = express();

app.use (express.json);
app.use (urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 8080);
app.use('/api', router);

const server = app.listen(app.get('port'), () =>{
    console.info(`Server listening in ${app.get('port')}`)
});

const io = new Server(server);

Socket (io);