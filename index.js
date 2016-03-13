var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var numberOfUsers = 0;
//var players = [];
//var playing = [];

var groups = [];

var groupNames = [];
var express = require('express');
var group;
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var jsonParser = bodyParser.json()

app.use('/public', express.static('public'));

app.get('/client',function(req,res){
    console.log("test");
    res.sendfile("client.html");
});

app.post('/client', function (req, res) {
    var name = req.body.name;
    var group = req.body.group;
    console.log(group + name);
    res.sendfile('client.html', { name: req.body.name, group: req.body.group});
});


app.get('/host', function(req, res){
    res.sendfile('host.html');
});

app.post('/host', function (req, res) {
    var name = req.body.name;
    var group = req.body.group;
    console.log(group + name);
    res.sendfile('host.html', { name: req.body.name, group: req.body.group});
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
    /**
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
    **/
    /**
    socket.on('group', function(msg){
        console.log('group: ' + msg);
    });
    **/
    socket.on('name', function(msg, grp){
        var arrayLength = groups.length;
        console.log(arrayLength);
        for (var i = 0; i < arrayLength; i++) {
            if (groups[i].type == grp){
                groups[i].players.push(msg);
                groups[i].playing.push(1);
                console.log("condition met");
                io.emit('reload', groups[i].players, groups[i].playing, grp, { for: 'everyone' });
            }
        }
    });
    socket.on('status', function(msg, grp){
        console.reload
        var arrayLength = groups.length;
        for (var i = 0; i < arrayLength; i++) {
            if (groups[i].type == grp){
                var index = groups[i].players.indexOf(msg);
                groups[i].playing[index] = 0;
                io.emit('reload', groups[i].players, groups[i].playing, grp, { for: 'everyone' });
            }
        }

    });
    socket.on('launch', function(grp){
        console.log('Message from Host');
        var newGroup = new Group(grp);
        groups.push(newGroup);
        console.log('arraypushed');
    });
    socket.on('startgame', function(grp){
        io.emit('start', grp, { for: 'everyone' });
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

function Group (type) {
    this.type = type;
    this.players = [];
    this.playing = [];
    this.testing = "call trace stack from object";
}




