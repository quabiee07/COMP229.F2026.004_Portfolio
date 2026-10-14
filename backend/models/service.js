const mongoose = require('mongoose');

// Defined the schema for the Service model
const serviceSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;