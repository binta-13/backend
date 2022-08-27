const router = require('express').Router();

const alternatif = require('../controllers/alternatif.controller');

const rumus = require('../helper/rumus');

// Create a new alternatif
router.post('/', alternatif.create);

// Retrieve all Alternatif
router.get('/', alternatif.findAll);

router.get('/rank', rumus);

// Retrieve all published alternatif
router.get('/published', alternatif.findAllPublished);

// Retrieve a single Tutorial with id
router.get('/:id', alternatif.findOne);

// Update a Tutorial with id
router.put('/:id', alternatif.update);

// Delete a Tutorial with id
router.delete('/:id', alternatif.delete);

// Delete all alternatif
router.delete('/', alternatif.deleteAll);

module.exports = router;
