const Project = require('../models/Project');

// Create a new project
async function createProject(req, res) {
    try {
        const project = await Project.create({
            name: req.body.name,
            description: req.body.description,
            user: req.user._id, // owner is the logged-in user
        });
        res.status(201).json({ success: 'Project created', project });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// Get all projects for logged-in user
async function getProjects(req, res) {
    try {
        const projects = await Project.find({ user: req.user._id });
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// Get single project by ID
async function getProjectById(req, res) {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: 'Project not found or unauthorized' });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// Update a project 
async function updateProject(req, res) {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: 'Project not found or unauthorized' });
        }

        project.name = req.body.name || project.name;
        project.description = req.body.description || project.description;

        await project.save();
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// Delete a project 
async function deleteProject(req, res) {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ error: 'Project not found or unauthorized' });
        }

        await project.remove();
        res.status(200).json({ success: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
