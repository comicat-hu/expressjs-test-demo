var DataBase = require('../lib/DataBase.js');

function login(req, res) {
    var method = req.method;
    switch (method) {
        case 'GET':
            return res.render('login', { csrfToken: req.csrfToken() });
            break;
        case 'POST':
            // var db = new DataBase;
            var option = {
                tableName: 'Users',
                key: {
                    username: req.body.username
                }
            }

            DataBase.get(option, (result) => {
                if (!result || result.password !== req.body.password) {
                    return res.send('login failed');
                } else {
                    return res.send('login success');
                }
            });

            break;
        default:
            return res.send('Can not ' + method + ' /login');
    }
}

module.exports = login;