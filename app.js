var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/index.html'));
});

app.get('/index.js', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/index.js'));
});

app.get('/locations.json', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/locations.json'));
});

app.get('/marker.webp', function(req, res) {
    res.sendFile(path.join(process.cwd() + '/marker.webp'));
});

app.listen(process.argv[2]);
