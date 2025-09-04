const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

const router = express.Router();

// Create and get tasks
router.post('/projects/:projectId/tasks', authMiddleware, createTask);
router.get('/projects/:projectId/tasks', authMiddleware, getTasks);

// Update and delete tasks by taskId
router.put('/tasks/:taskId', authMiddleware, updateTask);
router.delete('/tasks/:taskId', authMiddleware, deleteTask);

module.exports = router;
