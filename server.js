const express = require('express');
const cors = require('cors');

//const tutorialRoute = require('./app/routes/tutorial.routes');
const alternatifRoute = require('./app/routes/alternatif.routes');
const kriteriaRoute = require('./app/routes/kriteria.routes');

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to MY PROGRAM.' });
// });

// require('./app/routes/tutorial.routes')(app);

//app.use('/api/tutorial', tutorialRoute);
app.use('/api/alternatif', alternatifRoute);
app.use('/api/kriteria', kriteriaRoute);
// require('./app/routes/alternatif.routes')(app);
// require('./app/routes/kriteria.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
