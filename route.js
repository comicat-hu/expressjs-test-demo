var express = require('express');
var login = require('./routes/login');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/login', (req, res) => {
    return login(req, res);
});

module.exports = router;