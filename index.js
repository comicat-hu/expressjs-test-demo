var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var ejs = require('ejs');
var route = require('./route.js');
var app = express();
var port = 3000;

app.set('view engine', 'ejs');
app.use(cookieParser());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', csrf({ cookie: true }), route);
// error handler
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);

    // handle CSRF token errors here
    res.status(403)
    res.send('ForbiddenError: invalid csrf token');
})

var server = app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${server.address().port}`);
});

module.exports = server;