const createError = require('http-errors');
const path = require('path')

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const keys = require('./config/keys')

// Connect to the database.
mongoose.connect(keys.mongoUri, keys.mongoOptions);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {console.log('db connected')});

// Socket.
io.on('connection', function(){
    require('./sockets/userJoined')(io, socket);
    require('./sockets/chatRoomMessage')(io, socket);
    require('./sockets/joinPrivateRoom')(io, socket);
    require('./sockets/privateMessage')(io, socket);
    require('./sockets/disconnect')(io, socket);
});

// TODO
app.get('/', (req, res) => { res.sendFile(path.join(__dirname + '/client/build/index.html'))});
app.get('*', (req, res) => { res.status(404).send('error')})

// catch 404 error and forward to error handler.
app.use((request, response, next) => {
    next(createError(404));
})

// Error handler
app.use((error, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //sending error
    res.status(err.status || 500).send(err);
});

module.exports = { app, server }