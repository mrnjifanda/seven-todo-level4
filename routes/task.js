const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const functions = require('../functions/main');

router.get('/view/:id', async (req, res) => {

  return functions.findAndShowTask(res, req.params.id, 'view');
});

router.get('/edit/:id', async (req, res) => {

  return functions.findAndShowTask(res, req.params.id, 'edit');
});

router.get('/add-new', (req, res) => {

  let show_message_query = functions.show_message(req);
  return res.render('tasks/add', {
    errors: null,
    show_message_query
  });
});

router.post('/add-new', async function (req, res, next) {

  const body = req.body;
  const errors = [];
  if (!body.name) {

    errors.push({
      'type': 'danger',
      'message': 'Task name is required'
    });
  }

  if (!body.date) {

    errors.push({
      'type': 'danger',
      'message': 'Task date is required'
    });
  }

  if (errors.length === 0) {

    const task = await Task.find({ name: body.name });
    if (task.length !== 0) {

      errors.push({
        type: 'warning',
        message: `Task with name ${body.name} already exist!!! Please change name.`
      });
    } else {

      const newTask = new Task({
        name: body.name,
        date: body.date,
        description: body.description
      });

      const save = await newTask.save();
      return res.redirect('/?message=' + encodeURIComponent('Task added successfully'));
    }
  }

  return res.render('tasks/add', {
    errors
  });
});

router.post('/edit/:id', async (req, res) => {

  const id = req.params.id;
  const body = req.body;
  const update = await Task.findOneAndUpdate({ _id: id }, {
    name: body.name,
    date: body.date,
    description: body.description
  });

  return res.redirect('/task/view/' + id + '?message=' + encodeURIComponent('updated successfully'));
});

router.post('/delete/:id', async (req, res) => {

  const deleteTask = await Task.deleteOne({ _id: req.params.id });
  res.redirect('/?message=' + encodeURIComponent('Task deleted successfully'));
});

module.exports = router;
