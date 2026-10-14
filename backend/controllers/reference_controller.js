const Model = require('../models/reference');
const { formatObject } = require('../utils/util_functions');

//Fetch all references
async function getReferences(req, res, next) {
    try {
        const references = await Model.find();
        res.status(200).json({
            success: true,
            message: "References fetched successfully",
            data: references.map(doc => formatObject(doc)),
        });
    } catch (error) {
        next(error);
    }
}
// Fetch a single reference by ID
async function getReferenceById(req, res, next) {
    try {
        const reference = await Model.findById(req.params.id);
        if (!reference) {
            return res.status(404).json({
                success: false,
                message: "Reference not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Reference fetched successfully",
            data: formatObject(reference),
        });

    } catch (error) {
        next(error);
    }
}
// Create a new reference
async function createReference(req, res, next) {
    try {
        const reference = await Model.create(req.body);
        res.status(201).json({
            success: true,
            message: "Reference added successfully",
            data: formatObject(reference),
        });
    } catch (error) {
        next(error);
    }
}

// Update an existing reference by ID
async function updateReference(req, res, next) {
    try {
        const reference = await Model.findOneAndReplace({ _id: req.params.id }, req.body);
        if (!reference) {
            return res.status(404).json({
                success: false,
                message: "Reference not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Reference updated successfully",
        });
    } catch (error) {
        next(error);
    }
}
// Delete a reference by ID
async function deleteReference(req, res, next) {
    try {
        const reference = await Model.findByIdAndDelete(req.params.id);
        if (!reference) {
            return res.status(404).json({
                success: false,
                message: "Reference not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Reference deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}


module.exports = { getReferences, createReference, getReferenceById, updateReference, deleteReference };