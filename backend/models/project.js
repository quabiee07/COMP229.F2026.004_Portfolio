const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    completion: { type: Date, default: Date.now },
    description: String,
    image: String,

});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;