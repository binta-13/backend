const db = require('../models');
const Alternatif = db.model.Alternatif;
const Kriteria = db.model.Kriteria;

let kriteria = ['kelebaban', 'angin', 'hujan', 'panas'];

let costBenefit = ['benefit', 'benefit', 'benefit', 'cost'];
let bobot = [0.15, 0.2, 0.3, 0.35];

const alter = {};
const alterDetail = {};

module.exports = async (params, details) => {
  //console.log(params);

  const data = await Alternatif.findAll({
    raw: true,
    include: [
      {
        model: Kriteria,
        required: true,
        as: 'kriterium',
      },
    ],
  }).then(function (data) {
    return data;
  });
  // console.log(data);

  data.map((data) => {
    return (alter[data.name] = [
      data.name,
      data['kriterium.k1'],
      data['kriterium.k2'],
      data['kriterium.k3'],
      data['kriterium.k4'],
    ]);
  });

  data.map((data) => {
    return (alterDetail[data.name] = [data.image, data.description]);
  });

  // console.log('ini alternatif', alter);
  // console.log('ini alternatif detail', alterDetail);

  const alternatif = Object.keys(alter);
  const alternatifKriteria = Object.values(alter);

  //console.log('alternatifKriteria',alternatifKriteria);

  // console.log(alternatif);

  // console.log(alternatifDetail);

  let pembagi = [];
  for (let i = 0; i < kriteria.length; i++) {
    pembagi.push(0);
    for (let j = 0; j < alternatif.length; j++) {
      if (costBenefit[i] == 'cost') {
        if (j == 0) {
          pembagi[i] = alternatifKriteria[j][i];
        } else {
          if (pembagi[i] > alternatifKriteria[j][i]) {
            pembagi[i] = alternatifKriteria[j][i];
          }
        }
      } else {
        if (j == 0) {
          pembagi[i] = alternatifKriteria[j][i];
        } else {
          if (pembagi[i] < alternatifKriteria[j][i]) {
            pembagi[i] = alternatifKriteria[j][i];
          }
        }
      }
    }
  }

  let normalisasi = [];
  //console.log('normalisasi', normalisasi);
  for (let i = 0; i < alternatif.length; i++) {
    normalisasi.push([]);
    for (let j = 0; j < kriteria.length; j++) {
      normalisasi[i].push(0);
      if (costBenefit[j] == 'cost') {
        normalisasi[i][j] = pembagi[j] / kriteria[i][j];
      } else {
        normalisasi[i][j] = kriteria[i][j] / pembagi[j];
      }
      console.log('kriteria',kriteria);
    }
  }

  let hasil = [];

  for (let i = 0; i < alternatif.length; i++) {
    hasil.push(0);
    for (let j = 0; j < kriteria.length; j++) {
      hasil[i] = hasil[i] + normalisasi[i][j] * bobot[j];
    }
  }

  let alternatifRanking = [];
  let hasilRanking = [];

  for (let i = 0; i < alternatif.length; i++) {
    hasilRanking.push(hasil[i]);
    alternatifRanking.push(alternatif[i]);
  }
  console.log('kontol', alternatifRanking);
  console.log('hasilRanking',hasilRanking);
  for (let i = 0; i < alternatif.length; i++) {
    for (let j = 0; j < alternatif.length; j++) {
      if (j > i) {
        if (hasilRanking[j] > hasilRanking[i]) {
          tmphasil = hasilRanking[i];
          tmpalternatif = alternatifRanking[i];
          hasilRanking[i] = hasilRanking[j];
          alternatifRanking[i] = alternatifRanking[j];
          hasilRanking[j] = tmphasil;
          alternatifRanking[j] = tmpalternatif;
        }
      }
    }
  }

  
  const results = [];
  alternatifRanking.forEach((alternatif, kriteria) => {
   // console.log('kriteria',kriteria);
    results.push({
      details: alterDetail[alternatif],
      alternatif,
      hasil: hasilRanking[kriteria],
    });
    console.log('rank', hasilRanking[kriteria]);
  });

  // console.log('result', results);
  return results;

  // return params;
};
