const mongoose = require('mongoose');

// Defined the schema for the Reference model
const referenceSchema = new mongoose.Schema({
    name: String,
    testimonial: String,
    position : String,
    company: String,
}, { collection: 'references' }); // Specify the collection name

referenceSchema.set('toJSON', {
      virtuals: true,
    versionKey: false,
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;

    }
});

const Reference = mongoose.model('Reference', referenceSchema);
module.exports = Reference;