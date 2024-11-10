var express = require('express');
var Task = require('../models/task');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Task.find()
    .then((tasks) => {      
      const currentTasks = tasks.filter(task => !task.completed);
      const completedTasks = tasks.filter(task => task.completed === true);
      console.log('Fetched tasks:', tasks);  // Ajoutez un log pour vérifier les données récupérées
      res.render('index', { currentTasks: currentTasks, completedTasks: completedTasks });
    })
    .catch((err) => {
      console.error("Error fetching tasks:", err);
      res.send('1');  // Message d'erreur pour la récupération des tâches
    });
});

router.post('/addTask', function(req, res, next) {
  const taskName = req.body.taskName;
  const createDate = Date.now();
  
  var task = new Task({
    taskName: taskName,
    createDate: createDate
  });
  console.log('Adding new task:', taskName);  // Vérifiez si la tâche est bien créée

  task.save()
    .then(() => { 
      console.log('Task added:', taskName);
      res.redirect('/');
    })
    .catch((err) => {
      console.error("Error adding task:", err);
      res.send('2');  // Message d'erreur pour l'ajout de tâche
    });
});

router.post('/completeTask', function(req, res, next) {
  const taskId = req.body._id;

  Task.findByIdAndUpdate(taskId, { completed: true, completedDate: Date.now() })
    .then(() => { 
      console.log('Completed task:', taskId);
      res.redirect('/');
    })
    .catch((err) => {
      console.error("Error completing task:", err);
      res.send('3');  // Message d'erreur pour la mise à jour de la tâche
    });
});

router.post('/deleteTask', function(req, res, next) {
  const taskId = req.body._id;

  Task.findByIdAndDelete(taskId)
    .then(() => { 
      console.log('Deleted task:', taskId);
      res.redirect('/');
    })
    .catch((err) => {
      console.error("Error deleting task:", err);
      res.send('4');  // Message d'erreur pour la suppression de tâche
    });
});


module.exports = router;
