/*  ---------  STRUCTURA: -----------

documentKey: {
  label: nume document
  fields: {
      fieldKey: {
        label: nume field,
        big: extinde campul pe mai multe linii (de ex. adresa)
        column: 2, (default 1)
        shortLabel: 'nume scurt (cod) ca o informatie aditionala'
        margin: "20px 0px 5px 10px"
        isRequired: validare de field required,
        isEmail:  validare de field e-mail,
        isCNP: validare CNP
        isNumber: validare camp numeric
        isSeparator,
      }
    }
  }
--------------------------------------*/

export const docTypes = {
  asigAuto: {
    label: 'Asigurare AUTO RCA',
    fields: {
      separator1: {
        label: 'Date asigurat:',
        isSeparator: true,
        margin: '5px 0px 20px 0px',
      },
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
      separator2: {
        label: 'Valori asigurare:',
        isSeparator: true,
        margin: '17px 0px 20px 0px',
      },
      primaAsigurare: {
        label: 'Prima de despagubire',
      },
      limitaDespagubireVatamari: {
        label: 'Limita despagubire vatamari / deces',
      },
      limitaDespagubirePagube: {
        label: 'Limita despagubire pagube materiale',
      },
      data: {
        label: 'Valabilitate contract de la:',
        isDate: true,
      },
      separator3: {
        label: 'Date autovehicul:',
        isSeparator: true,
        column: 2,
        margin: '5px 0px 20px 0px',
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
    configFields: {
      companie: {
        label: 'Compania de asigurari',
      },
      sucursala: {
        label: 'Sucursala / Agentia',
      },
      telefon: {
        label: 'Telefon',
      },
      agent: {
        label: 'Brocker / Agent',
      },
      codAgent: {
        label: 'Cod Brocker / Agent',
      },
      serie: {
        label: 'Serie',
      },
      numarSerie: {
        label: 'Numar',
      },
      RC: {
        label: 'R.C',
      },
      CUI: {
        label: 'C.U.I.',
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
    configFields: {
      facultatea: {
        label: 'Facultatea',
      },
    },
  },
};
