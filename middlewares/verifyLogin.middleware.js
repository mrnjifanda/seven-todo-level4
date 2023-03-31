const functions = require('../functions/main');
const User = require('../models/User');

async function verifyLogin(req, res, next) {

    let error = true;
    const cookies = req.cookies;
    if (cookies.auth_token) {

        const id_user = functions.token.verify(cookies.auth_token);
        if (id_user) {

            error = false;
            const user = await User.findOne({ _id: id_user.id });
            req.user = user;
            next();
        }
    }

    if (error === true) {

        return res.redirect('/auth/login?message=' + encodeURIComponent('Please login'));
    }
}

module.exports = verifyLogin;