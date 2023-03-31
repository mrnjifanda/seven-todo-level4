const express = require('express');
const router = express.Router();
const verifyLogin = require('../middlewares/verifyLogin.middleware');
const functions = require('../functions/main');

router.get('/', verifyLogin, (req, res) => {

    const user = req.user;
    let show_message_query = functions.show_message(req);

    return res.render('account/profile', {
        user: req.user,
        errors: false,
        show_message_query
    });
});

module.exports = router;