const db = require('../models');
const Alternatif = db.model.Alternatif;
const Kriteria = db.model.Kriteria;
const Op = db.Sequelize.Op;
const rumus = require("../helper/rumus");
const { application } = require('express');
//const rank = rumus.result
// Create and Save a new alternatif
exports.create = (req, res) => {
  // Validate request
  
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  // Create a alternatif
  const alternatif = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    date: req.body.date,
    published: req.body.published ? req.body.published : true,
  };

  // Save alternatif in the database
  Alternatif.create(alternatif)
    .then((data) => {
      res.send(data);
      //console.log(data.toJSON());
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the alternatif.',
      });
    });

};

// Retrieve all alternatifs from the database.
exports.findAll = async (req, res) => {
 
 // console.log("ini cek",cek)
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  //console.log(name);
  await Alternatif.findAll({
    include: [
      {
        model: Kriteria,
        required: true,
      },
    ],
    where: condition,
  })
    .then((data) => {
    // var cek = rumus(data)
      res.send(data);

     //console.log("ini data",data[1].dataValues);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving alternatifs.',
      });
    });
};

// Find a single alternatif with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Alternatif.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Alternatif with id=' + id,
      });
    });
};

// Update a Alternatif by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Alternatif.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Alternatif was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Alternatif with id=${id}. Maybe Alternatif was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Alternatif with id=' + id,
      });
    });
};

// Delete a Alternatif with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Alternatif.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Alternatif was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Alternatif with id=${id}. Maybe Alternatif was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Alternatif with id=' + id,
      });
    });
};

// Delete all Alternatifs from the database.
exports.deleteAll = (req, res) => {
  Alternatif.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Alternatifs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Alternatif.',
      });
    });
};

// find all published Alternatif
exports.findAllPublished = (req, res) => {
  Alternatif.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Alternatif.',
      });
    });
};


// exports.findAll= async (req, res) =>{
//   const cek = rumus(Alternatif,Kriteria)

//   await Alternatif.findAll({

//   }).then((cek) => {
//     res.send(cek)
//     console.log("cek")
//   })

  
//  