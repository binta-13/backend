const router = require('express').Router();

const kriteria = require('../controllers/kriteria.controller');

// Create a new kriteria
router.post('/', kriteria.create);

// Retrieve all kriteria
router.get('/', kriteria.findAll);

// Retrieve all published kriteria
// x
// Retrieve a single Tutorial with id
router.get('/:id', kriteria.findOne);

// Update a Tutorial with id
router.put('/:id', kriteria.update);

// Delete a Tutorial with id
router.delete('/:id', kriteria.delete);

// Delete all kriteria
router.delete('/', kriteria.deleteAll);

module.exports = router;
