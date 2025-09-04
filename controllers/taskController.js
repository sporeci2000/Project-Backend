const Task = require('../models/Task');
const Project = require('../models/Project');

// Create a new task under a specific project
async function createTask(req, res) {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project || project.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: 'Project not found or unauthorized' });
        }

        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            project: req.params.projectId,
        });

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// Get all tasks for a specific project
async function getTasks(req, res) {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project || project.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: 'Project not found or unauthorized' });
        }

        const tasks = await Task.find({ project: req.params.projectId });
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// Update a task 
async function updateTask(req, res) {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        const project = await Project.findById(task.project);
        if (!project || project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.status = req.body.status || task.status;

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// Delete a task 
async function deleteTask(req, res) {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        const project = await Project.findById(task.project);
        if (!project || project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await task.remove();
        res.status(200).json({ success: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
};
