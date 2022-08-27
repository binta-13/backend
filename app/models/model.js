module.exports = (sequelize, Sequelize) => {
  const Alternatif = sequelize.define('alternatif', {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  },{datetime: false,});

  const Kriteria = sequelize.define('kriteria', {
    k1: {
      type: Sequelize.FLOAT,
    },
    k2: {
      type: Sequelize.FLOAT,
    },
    k3: {
      type: Sequelize.FLOAT,
    },
    k4: {
      type: Sequelize.FLOAT,
    },
  });

  Alternatif.hasOne(Kriteria);
  Kriteria.belongsTo(Alternatif);

  return { Alternatif, Kriteria };
};
