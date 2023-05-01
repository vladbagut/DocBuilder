/*
{
  key: 'cheia de identificare a documentului',
  name: 'nume document',
  fields: [
      {
        key: 'cheia de identificare a campului',
        name: 'nume camp',
        big: true (default false) - extinde campul pe mai multe linii (adresa)
        column: 2, (default 1)
        shortName: 'nume scurt (cod) ca o informatie aditionala'
      }
    ]
  }
*/

export const docTypes = [
  {
    key: 'asigAuto',
    name: 'Asigurare AUTO RCA',
    fields: [
      {
        key: 'nume',
        name: 'Nume',
      },
      {
        key: 'CNP',
        name: 'CNP',
      },
      {
        key: 'adresa',
        name: 'Adresa',
        big: true,
      },
      {
        key: 'nrInmatriculare',
        name: 'Numar inmatriculare',
        column: 2,
      },
      {
        key: 'modelVehicul',
        name: 'Model vehicul',
        column: 2,
      },
      {
        key: 'serieŞasiu',
        name: 'Serie şasiu',
        shortName: 'E',
        column: 2,
      },
      {
        key: 'nrInventar',
        name: 'Numar inventar',
        shortName: 'X',
        column: 2,
      },
      {
        key: 'capacitateaCilindrica',
        name: 'Capacitatea cilindrica',
        shortName: 'P.1',
        column: 2,
      },
      {
        key: 'putere',
        name: 'Putere',
        shortName: 'P.2',
        column: 2,
      },
      {
        key: 'numarLocuri',
        name: 'Numar locuri',
        shortName: 'S.1',
        column: 2,
      },
      {
        key: 'greutateMaximaAdmisa',
        name: 'Greutate maxima admisa',
        shortName: 'F.1',
        column: 2,
      },
    ],
  },
  {
    key: 'contractVC',
    name: 'Contract vanzare Auto',
    fields: [
      {
        key: 'nume',
        name: 'Nume',
      },
      {
        key: 'CNP',
        name: 'CNP',
      },
      {
        key: 'adresa',
        name: 'Adresa',
        big: true,
      },
      {
        key: 'nrInmatriculare',
        name: 'Numar inmatriculare',
        column: 2,
      },
      {
        key: 'modelVehicul',
        name: 'Model vehicul',
        column: 2,
      },
    ],
  },
  {
    key: 'cererePasaport',
    name: 'Cerere pasapoarte',
    fields: [
      {
        key: 'nume',
        name: 'Nume',
      },
      {
        key: 'CNP',
        name: 'CNP',
      },
      {
        key: 'adresa',
        name: 'Adresa',
        big: true,
      },
      {
        key: 'imagine',
        name: 'Imagine',
        column: 2,
      },
    ],
  },
  {
    key: 'cerereVisa',
    name: 'Cerere viza',
    fields: [
      {
        key: 'nume',
        name: 'Nume',
      },
      {
        key: 'CNP',
        name: 'CNP',
      },
    ],
  },
  {
    key: 'contractMunca',
    name: 'Contract de munca',
    fields: [
      {
        key: 'nume',
        name: 'Nume',
      },
      {
        key: 'CNP',
        name: 'CNP',
      },
      {
        key: 'adresa',
        name: 'Adresa',
        big: true,
      },
      {
        key: 'imagine',
        name: 'Imagine',
        column: 2,
      },
    ],
  },
];
