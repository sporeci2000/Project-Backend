const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');

const router = express.Router();

// Protect all routes with auth middleware
router.use(authMiddleware);

// Create a new project
router.post('/', createProject);

// Get all projects for logged-in user
router.get('/', getProjects);

// Get a single project by ID 
router.get('/:id', getProjectById);

// Update a project by ID 
router.put('/:id', updateProject);

// Delete a project by ID 
router.delete('/:id', deleteProject);

module.exports = router;
