var express = require('express');
var route = require('./route.js');
var app = express();
var port = 3000;

app.use('/', route);

var server = app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${server.address().port}`);
});

module.exports = server