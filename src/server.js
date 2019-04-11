const express = require('express'); // Micro framework que ajuda a lidar com requisições (rotas)
const mongoose = require('mongoose'); // Abstrair o banco de dados e permite lidar com apenas código js
const path = require('path');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box =>{
        socket.join(box);
    });
});

mongoose.connect(require('./.mongooseConnection'), {
    useNewUrlParser: true
});

app.use(cors());
app.use((req, res, next) => {
    req.io = io;

    return next();
});
app.use(express.json()); // ajuda a entender as informações em formato json
app.use(express.urlencoded({extended: true})); // permite o envio de arquivos
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes.js')); // Para poder utilizar o arquivo de rotas

server.listen(3333);