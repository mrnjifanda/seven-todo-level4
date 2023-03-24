const Task = require('../models/Task')

async function findAndShowTask(res, id, view, errors = null) {

    const task = await Task.findById(id);
    if (task) {

        return res.render('tasks/' + view, {
            task,
            errors
        });
    }

    return res.redirect('/?message=' + encodeURIComponent('Task not found'));
}

module.exports = { findAndShowTask };