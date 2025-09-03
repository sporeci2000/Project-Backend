const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Project name is required.'],
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true, // project must belong to a user
        },
    },
    { timestamps: true }
);

// Enforce validators when updating
mongoose.set('runValidators', true);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
