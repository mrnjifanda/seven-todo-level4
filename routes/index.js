var express = require('express');
const Task = require('../models/Task');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {

  const tasks = await Task.find();
  res.render('index', { tasks });
});

module.exports = router;
