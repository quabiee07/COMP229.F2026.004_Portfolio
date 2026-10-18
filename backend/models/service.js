const mongoose = require('mongoose');

// Defined the schema for the Service model
const serviceSchema = new mongoose.Schema({
    title: String,
    description: String,
}, { collection: 'services' }); // Specify the collection name

serviceSchema.set('toJSON', {
      virtuals: true,
    versionKey: false,
    transform: (document, returnedObject) => {
        delete returnedObject._id;
    }
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;