const mongoose = require('mongoose');

// Defined the schema for the Reference model
const referenceSchema = new mongoose.Schema({
    name: String,
    testimonial: String,
    position : String,
    company: String,
});

const Reference = mongoose.model('Reference', referenceSchema);
module.exports = Reference;