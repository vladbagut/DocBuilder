/*
key: {
  label: nume document
  fields: {
      key: {
        label: nume camp,
        big: boolean (default false) - extinde campul pe mai multe linii (adresa)
        column: 2, (default 1)
        shortLabel: 'nume scurt (cod) ca o informatie aditionala'
        isRequired: true,
        isEmail
        isCNP
        isNumber
      }
    }
  }
*/

export const docTypes = {
  asigAuto: {
    label: 'Asigurare AUTO RCA',
    fields: {
      nume: {
        label: 'Nume',
        isRequired: true,
      },
      CNP: {
        label: 'CNP',
        isCNP: true,
      },
      adresa: {
        label: 'Adresa',
        big: true,
      },
      nrInmatriculare: {
        label: 'Numar inmatriculare',
        column: 2,
      },
      modelVehicul: {
        label: 'Model vehicul',
        column: 2,
      },
      serieŞasiu: {
        label: 'Serie şasiu',
        shortLabel: 'E',
        column: 2,
      },
      nrInventar: {
        label: 'Numar inventar',
        shortLabel: 'X',
        column: 2,
      },
      capacitateaCilindrica: {
        label: 'Capacitatea cilindrica',
        shortLabel: 'P.1',
        column: 2,
      },
      putere: {
        label: 'Putere',
        shortLabel: 'P.2',
        column: 2,
      },
      numarLocuri: {
        label: 'Numar locuri',
        shortLabel: 'S.1',
        column: 2,
        isNumber: true,
      },
      greutateMaximaAdmisa: {
        label: 'Greutate maxima admisa',
        shortLabel: 'F.1',
        column: 2,
      },
    },
  },
  fisaInscriere: {
    label: 'Fisa inscriere facultate',
    fields: {
      nume: {
        label: 'Nume',
        isRequired: true,
      },
      CNP: {
        label: 'CNP',
        isCNP: true,
      },
      adresa: {
        label: 'Adresa',
        big: true,
      },
      email: {
        label: 'E-mail',
        isEmail: true,
      },
      imagine: {
        label: 'Imagine',
        column: 2,
      },
    },
  },
};
