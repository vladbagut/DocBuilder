export const config = {
  asigAuto: {
    fields: {
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
    fields: {
      facultatea: {
        label: 'Facultatea',
      },
      adresa: {
        label: 'Adresa',
      },
      telefon: {
        label: 'Telefon',
      },
      website: {
        label: 'Website',
      },
      logo: {
        label: 'Logo',
        isImage: true,
      },
      text1: {
        label: 'Forma de concurs',
        isText: true,
      },
      tipConcurs: {
        isOption: true,
        options: ['Concurs de dosare', 'Concurs cu test grilă la matematică'],
      },
      text2: {
        label: 'Formule de calcul pentru media de admitere',
        isText: true,
      },
      // text2: {
      //   label: 'Formule de calcul',
      //   isText: true,
      // },
      formulaDosare: {
        label: 'Formula concurs dosare',
      },
      formulaExam1: {
        label: 'Formula examen - varianta 1',
      },
      formulaExam2: {
        label: 'Formula examen - varianta 2',
      },
      text3: {
        label:
          '<div class="ps-3 comment"><span class="red">MB</span> - Media la examenul de bacalaureat</div><div class="ps-3 comment"><span class="red">NB</span> - Nota cea mai mare obtinuta la bacalaureat</div><div class="ps-3 comment"><span class="red">NTG</span> - Nota la testul grilă la matematică</div>',
        isText: true,
      },
    },
  },
};

export const initialConfig = {
  asigAuto: {
    companie: 'BAGUT-GROUP ASIGURARI S.A',
    sucursala: 'Cluj-Napoca',
    telefon: '074434565',
    agent: 'Bagut Vlad',
    codAgent: '343467',
    serie: 'RO/19/A19/PD',
    numarSerie: 122058759,
    RC: 'J40/2857/2010',
    CUI: '6291812',
  },
  fisaInscriere: {
    facultatea:
      'Facultatea de Electronica, Telecomunicatii si Tehnologia Informatiei',
    adresa: 'Strada Baritiu 25, Cluj-Napoca',
    telefon: '0264401200',
    website: 'www.utcluj.ro',
    logo: 'data:image/png;base64,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',
    formulaDosare: 'MAX( 0,6 * NB + 0,4 * MB, MB )',
    formulaExam1: '0.6 * NTG + 0.2 * NB + 0.2 * MB',
    formulaExam2: '0.8 * NTG  + 0.2 * MB',
    tipConcurs: 0,
  },
};
