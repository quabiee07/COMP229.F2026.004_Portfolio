const Model = require('../models/service');
const { formatObject } = require('../utils/util_functions');

async function getServices(req, res, next) {
    try {
        const services = await Model.find();
        res.status(200).json({
            success: true,
            message: "Services fetched successfully",
            data: services.map(doc => formatObject(doc)),
        });
    } catch (error) {
        next(error);
    }
}

async function getServiceById(req, res, next) {
    try {
        const service = await Model.findById(req.params.id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Service fetched successfully",
            data: formatObject(service),
        });

    } catch (error) {
        next(error);
    }
}

async function createService(req, res, next) {
    try {
        const service = await Model.create(req.body);
        res.status(201).json({
            success: true,
            message: "Service added successfully",
            data: formatObject(service),
        });
    } catch (error) {
        next(error);
    }
}


async function updateService(req, res, next) {
    try {
        const service = await Model.findOneAndReplace({ _id: req.params.id }, req.body);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Service updated successfully",
        });
    } catch (error) {
        next(error);
    }
}

async function deleteService(req, res, next) {
    try {
        const service = await Model.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Service deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}


module.exports = { getServices, createService, getServiceById, updateService, deleteService };