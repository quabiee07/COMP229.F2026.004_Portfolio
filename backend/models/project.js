const mongoose = require('mongoose');

// Defined the schema for the Project model
const projectSchema = new mongoose.Schema({
    title: String,
    completion: { type: Date, default: Date.now },
    description: String,
    image: String,

}, { collection: 'projects' }); // Specify the collection name

projectSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (document, returnedObject) => {
        delete returnedObject._id;
    }
});


const Project = mongoose.model('Project', projectSchema);
module.exports = Project;