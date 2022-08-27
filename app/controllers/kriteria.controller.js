const db = require('../models');
const Kriteria = db.model.Kriteria;
const Op = db.Sequelize.Op;

// Create and Save a new Kriteria
exports.create = (req, res) => {
  // Validate request
  if (!req.body.k1) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Kriteria
  const kriteria = {
    alternatifId: req.body.alternatifId,
    k1: req.body.k1,
    k2: req.body.k2,
    k3: req.body.k3,
    k4: req.body.k4
  };

  // Save Kriteria in the database
  Kriteria.create(kriteria)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Kriteria.',
      });
    });
};

// Retrieve all Kriterias from the database.
exports.findAll = (req, res) => {
  const k1 = req.query.k1;
  var condition = k1 ? { name: { [Op.iLike]: `%${k1}%` } } : null;
  console.log(k1);
  Kriteria.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Kriterias.',
      });
    });
};

// Find a single Kriteria with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Kriteria.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Kriteria with id=' + id,
      });
    });
};

// Update a Kriteria by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Kriteria.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Kriteria was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Kriteria with id=${id}. Maybe Kriteria was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Kriteria with id=' + id,
      });
    });
};

// Delete a Kriteria with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Kriteria.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Kriteria was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Kriteria with id=${id}. Maybe Kriteria was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Kriteria with id=' + id,
      });
    });
};

// Delete all Kriterias from the database.
exports.deleteAll = (req, res) => {
  Kriteria.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Kriterias were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Kriteria.',
      });
    });
};

