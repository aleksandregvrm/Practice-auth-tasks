const express = require('express');
const {getAllTasks,updateTask,deleteTask,addTask,getTask} = require('../controllers/tasks');
const router = express.Router();

router.route('/').post(addTask).get(getAllTasks);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;