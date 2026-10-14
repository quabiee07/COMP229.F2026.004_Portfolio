const express = require('express');
const router = express.Router();
const controller = require('../controllers/reference_controller');

router.get('/', controller.getReferences);
router.get('/:id', controller.getReferenceById);
router.post('/', controller.createReference);
router.put('/:id', controller.updateReference);
router.delete('/:id', controller.deleteReference);

module.exports = router;