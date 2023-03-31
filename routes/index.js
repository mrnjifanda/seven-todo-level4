var express = require('express');
const Task = require('../models/Task');
var router = express.Router();
const functions = require('../functions/main');

/* GET home page. */
router.get('/', async function (req, res, next) {

  let show_message_query = functions.show_message(req);
  const tasks = await Task.find();
  res.render('index', { tasks, show_message_query });
});

module.exports = router;
