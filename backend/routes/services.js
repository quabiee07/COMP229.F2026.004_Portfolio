const express = require('express');
const router = express.Router();
const controller = require('../controllers/service_controller');

// Defined routes for service-related operations
router.get('/', controller.getServices);
router.get('/:id', controller.getServiceById);
router.post('/', controller.createService);
router.put('/:id', controller.updateService);
router.delete('/:id', controller.deleteService);

module.exports = router;