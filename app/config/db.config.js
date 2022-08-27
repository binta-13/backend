module.exports = {
  HOST: 'localhost',
  USER: 'binta',
  PASSWORD: 'binta',
  DB: 'skripsi',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
