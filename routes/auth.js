const express = require('express');
const router = express.Router();
const User = require('../models/User');
const redirectIfLogin = require('../middlewares/redirectIfLogin.middleware');



const functions = require('../functions/main');

router.get('/register', redirectIfLogin, (req, res) => {

    let show_message_query = functions.show_message(req);
    return res.render('auth/register', {
        errors: null,
        show_message_query
    });
});

router.get('/login', redirectIfLogin, (req, res) => {

    let show_message_query = functions.show_message(req);
    return res.render('auth/login', {
        errors: null,
        show_message_query
    });
});

router.post('/login', async (req, res) => {

    const body = req.body;
    let errors = [];
    if (!body.email || !body.password) {

        errors.push({
            type: 'danger',
            message: 'Please enter your email and your password'
        });
    }

    if (errors.length === 0) {

        const user = await User.findOne({ email: body.email });
        if (user) {

            const compare = await functions.password.compare(body.password, user.password);
            if (compare === true) {

                // token = encode (user)
                // save token in session, cookies or send to user.

                // express-session
                // req.session

                // cookie
                // res.setHeader('Set-Cookie', new_copkie,  {
                //     httpOnly: true,
                //     maxAge: 7 * 24 * 60 * 60
                // })

                // JWT
                // jsonwebtoken


                // dotenv

                const token = functions.token.generate(user._id);
                res.cookie("auth_token", token);
                return res.redirect('/account');
            }
        }

        errors.push({
            type: 'warning',
            message: 'Incorect redentials'
        });
    }

    return res.render('auth/login', { errors });
});

router.post('/register', async (req, res) => {

    const body = req.body;
    const expected_body = ['name', 'date-of-birth', 'role', 'username', 'email', 'password', 'password-confirm'];
    let errors = [];
    expected_body.forEach(expected => {

        if (!body[expected]) {

            errors.push({
                'type': 'danger',
                'message': `${expected} required`
            });
        }
    });

    if (body.password !== body['password-confirm']) {

        errors.push({
            type: 'warning',
            message: 'Please enter same two password'
        });
    }

    if (errors.length === 0) {

        const hash = await functions.password.hash(body.password);
        const user = new User({
            name: body.name,
            date_of_birth: body['date-of-birth'],
            role: body.role,
            username: body.username,
            email: body.email,
            password: hash,
        });

        try {

            const save = await user.save();
            res.redirect('/auth/login?message=' + encodeURIComponent('User create successfuly'));
        } catch (error) {

            errors.push({
                type: 'warning',
                message: error.message
            });
        }
    }

    return res.render('auth/register', { errors });
});

router.post('/logout', (req, res) => {

    res.clearCookie('auth_token');
    return res.redirect('/auth/login?message=' + encodeURIComponent('Logout successful') + 'type=warning');
});

module.exports = router;
