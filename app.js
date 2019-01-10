const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.get('/:user', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('a user has connected');

    socket.on('chat message', function(msg) {
        console.log(msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    })
});

http.listen(3000, function() {
    console.log('server has started at port 3000');
});
