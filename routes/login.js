function login(req, res) {
    var method = req.method;
    switch (method) {
        case 'GET':
            return res.render('login', { csrfToken: req.csrfToken() });
            break;
        case 'POST':
            return res.send('login success');
            break;
        default:
            return res.send('Can not ' + method + ' /login');
    }
}

module.exports = login;