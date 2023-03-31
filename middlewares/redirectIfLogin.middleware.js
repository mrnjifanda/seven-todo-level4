const functions = require('../functions/main');
const User = require('../models/User');

async function redirectIfLogin(req, res, next) {

    const cookies = req.cookies;
    if (cookies.auth_token) {

        const id_user = functions.token.verify(cookies.auth_token);
        if (id_user) {

            return res.redirect('/account?message=' + encodeURIComponent('You are already connected'));
        }
    }

    next();
}

module.exports = redirectIfLogin;