const Model = require('../models/project');
const { formatObject } = require('../utils/util_functions');

//Fetch all projects
async function getProjects(req, res, next) {
    try {
        const projects = await Model.find();
        res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            data: projects.map(doc => formatObject(doc)),
        });
    } catch (error) {
        next(error);
    }
}

// Fetch a single project by ID
async function getProjectById(req, res, next) {
    try {
        const project = await Model.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Project fetched successfully",
            data: formatObject(project),
        });

    } catch (error) {
        next(error);    
    }
}

// Create a new project
async function createProject(req, res, next) {
    try {
        const project = await Model.create(req.body);
        res.status(201).json({
            success: true,
            message: "Project added successfully",
            data: formatObject(project),
        });
    } catch (error) {
        next(error);
    }
}

// Update an existing project by ID
async function updateProject(req, res, next) {
    try {
        const project = await Model.findOneAndReplace({ _id: req.params.id }, req.body);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Project updated successfully",
        });
    } catch (error) {
        next(error);
    }
}
// Delete a project by ID
async function deleteProject(req, res, next) {
    try {
        const project = await Model.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}


module.exports = { getProjects, createProject, getProjectById, updateProject, deleteProject };