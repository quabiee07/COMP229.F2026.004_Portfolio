const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
    name: String,
    testimonial: String,
    position : String,
    company: String,
});

const Reference = mongoose.model('Reference', referenceSchema);
module.exports = Reference;