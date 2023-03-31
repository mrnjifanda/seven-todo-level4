const Task = require('../models/Task');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function findAndShowTask(res, id, view, errors = null) {

    const task = await Task.findById(id);
    let show_message_query = show_message(req);
    if (task) {

        return res.render('tasks/' + view, {
            task,
            errors,
            show_message_query
        });
    }

    return res.redirect('/?message=' + encodeURIComponent('Task not found'));
}

const password = {

    saltRounds: 10,
    hash: async (password) => {

        try {

            const salt = await bcrypt.genSalt(this.saltRounds);
            return await bcrypt.hash(password, salt);
        } catch (error) {

            console.log('Error: ');
            console.log(error);
        }
    },
    compare: async (password, hash) => {

        try {

            return await bcrypt.compare(password, hash);
        } catch (error) {

            console.log('Error: ');
            console.log(error);
        }
    }
}

const token = {
    generate: (id_user) => {

        return jwt.sign({ id: id_user }, process.env.JWT_SECRET);
    },
    verify: (token) => {

        try {

            return jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {

            return false;
        }
    }
};

const show_message = (req) => {

    let show_message_query = null;
    if (req.query.message) {

        show_message_query = {
            message: req.query.message,
            type: req.query.type ?? 'success'
        }
    }

    return show_message_query;
}

module.exports = { findAndShowTask, password, token, show_message };