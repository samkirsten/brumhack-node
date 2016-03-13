var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var numberOfUsers = 0;
var players = [];
var playing = [];
var express = require('express');
var group;
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/public', express.static('public'));


app.get('/client', function(req, res){
    //var name = req.body.name;
    //var group = req.body.group;
    //console.log("post received: %s %s", name, group);
    //res.send(name + ' ' + group);
    res.sendfile('client.html');
});


app.get('/host', function(req, res){
    res.sendfile('host.html');
});

app.get('/', function(req, res){
    res.sendfile('index.html');
});

app.get('/play', function(req, res){
    res.sendfile('play.html');
});

app.get('/about', function(req, res){
    res.sendfile('about.html');
});



io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
    socket.on('group', function(msg){
        console.log('group: ' + msg);
    });
    socket.on('name', function(msg){
        players.push(msg);
        playing.push(1);
        numberOfUsers++;
        console.log('name: ' + msg);
        io.emit('reload', players, playing, { for: 'everyone' });
    });
    socket.on('status', function(msg){
        var player = players.indexOf(msg);
        playing[player] = 0;
        io.emit('reload', players, playing, { for: 'everyone' });
    });
    socket.on('launch', function(){
        console.log('Message from Host');
        io.emit('start', { for: 'everyone' });
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});


