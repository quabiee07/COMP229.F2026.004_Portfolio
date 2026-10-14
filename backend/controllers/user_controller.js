const Model = require('../models/user');
const { formatObject } = require('../utils/util_functions');

async function getUsers(req, res, next) {
    try {
        const users = await Model.find();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users.map(doc => formatObject(doc)),
        });
    } catch (error) {
        next(error);
    }
}

async function getUserById(req, res, next) {
    try {
        const user = await Model.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: formatObject(user),
        });

    } catch (error) {
        next(error);
    }
}

async function createUser(req, res, next) {
    try {
        const user = await Model.create(req.body);
        res.status(201).json({
            success: true,
            message: "User added successfully",
            data: formatObject(user),
        });
    } catch (error) {
        next(error);
    }
}


async function updateUser(req, res, next) {
    try {
        const user = await Model.findOneAndReplace({ _id: req.params.id }, req.body);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
        });
    } catch (error) {
        next(error);
    }
}

async function deleteUser(req, res, next) {
    try {
        const user = await Model.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}


module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };