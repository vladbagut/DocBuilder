/*  ---------  LEGENDA -----------

  fields:
        label: nume field,
        big: extinde campul pe mai multe linii (de ex. adresa)
        column: 2, (default 1)
        shortLabel: 'nume scurt (cod) ca o informatie aditionala'
        margin: "20px 0px 5px 10px"
        isRequired: validare de field required,
        isEmail:  validare de field e-mail,
        isCNP: validare CNP
        isNumber: validare camp numeric,
        length: number of char
        isImage: imagine
        group, inGroup
        line, inLine
        isText
--------------------------------------*/

export const docTypes = {
  asigAuto: {
    label: 'Asigurare AUTO RCA',
    fields: {
      group1: {
        label: 'Date asigurat:',
        group: 1,
        margin: '5px 0px 20px 0px',
      },
      nume: {
        label: 'Nume',
        isRequired: true,
        inGroup: 1,
      },
      CNP: {
        label: 'CNP',
        isCNP: true,
        inGroup: 1,
      },
      adresa: {
        label: 'Adresa',
        big: true,
        inGroup: 1,
      },

      group3: {
        label: 'Date autovehicul:',
        group: 3,
        column: 1,
        margin: '5px 0px 20px 0px',
      },
      nrInmatriculare: {
        label: 'Numar inmatriculare',
        shortLabel: 'A',
        column: 1,
        inGroup: 3,
      },
      modelVehicul: {
        label: 'Model vehicul',
        shortLabel: 'D1-D3',
        column: 1,
        inGroup: 3,
      },
      serieŞasiu: {
        label: 'Serie şasiu',
        shortLabel: 'E',
        column: 1,
        inGroup: 3,
      },
      nrInventar: {
        label: 'Numar inventar',
        shortLabel: 'X',
        column: 1,
        inGroup: 3,
      },
      capacitateaCilindrica: {
        label: 'Capacitatea cilindrica',
        shortLabel: 'P.1',
        column: 1,
        inGroup: 3,
      },
      putere: {
        label: 'Putere',
        shortLabel: 'P.2',
        column: 1,
        inGroup: 3,
      },
      numarLocuri: {
        label: 'Numar locuri',
        shortLabel: 'S.1',
        column: 1,
        isNumber: true,
        inGroup: 3,
      },
      greutateMaximaAdmisa: {
        label: 'Greutate maxima admisa',
        shortLabel: 'F.1',
        column: 1,
        inGroup: 3,
      },

      group2: {
        label: 'Valori asigurare:',
        group: 2,
        margin: '5px 0px 20px 0px',
        column: 2,
      },
      primaAsigurare: {
        label: 'Prima de despagubire',
        inGroup: 2,
        column: 2,
      },
      limitaDespagubireVatamari: {
        label: 'Limita despagubire vatamari / deces',
        inGroup: 2,
        column: 2,
      },
      limitaDespagubirePagube: {
        label: 'Limita despagubire pagube materiale',
        inGroup: 2,
        column: 2,
      },
      data: {
        label: 'Data de la care incepe contractul',
        isDate: true,
        inGroup: 2,
        column: 2,
      },
    },
  },
  fisaInscriere: {
    label: 'Fişă înscriere facultate',
    fields: {
      group1: {
        label: 'Date personale',
        group: 1,
        column: 1,
        margin: '15px 0px 20px 0px',
        collapsed: false,
      },
      nume: {
        label: 'Nume',
        isRequired: true,
        inGroup: 1,
      },
      CNP: {
        label: 'CNP',
        isCNP: true,
        inGroup: 1,
      },
      nationalitatea: {
        label: 'Naționalitatea',
        inGroup: 1,
      },
      localitate: {
        label: 'Localitate',
        shortLabel: 'nastere',
        line: 1,
        inGroup: 1,
      },
      judet: {
        label: 'Judet',
        inLine: 1,
        inGroup: 1,
      },
      buletinSerie: {
        label: 'Buletin serie',
        line: 2,
        inGroup: 1,
      },
      buletinNo: {
        label: 'Nr',
        inLine: 2,
        inGroup: 1,
      },
      buletinEliberatDe: {
        label: 'Eliberat de',
        line: 3,
        inGroup: 1,
      },
      buletinEliberatLaData: {
        label: 'Data eliberarii',
        isDate: true,
        inLine: 3,
        inGroup: 1,
      },
      adresa: {
        label: 'Adresa',
        big: true,
        inGroup: 1,
      },

      group11: {
        label: 'Date de contact',
        group: 11,
        column: 1,
        margin: '5px 0px 20px 0px',
        collapsed: true,
      },
      telefon: {
        label: 'Numar de telefon',
        column: 1,
        inGroup: 11,
      },
      email: {
        label: 'E-mail',
        column: 1,
        inGroup: 11,
        isEmail: true,
      },

      group2: {
        label: 'Părinţi / suținători legali',
        group: 2,
        column: 1,
        margin: '5px 0px 20px 0px',
        collapsed: true,
      },
      mama: {
        label: 'Mama',
        column: 1,
        inGroup: 2,
      },
      tata: {
        label: 'Tata',
        column: 1,
        inGroup: 2,
      },
      adresaParinti: {
        label: 'Adresa',
        big: true,
        inGroup: 2,
      },

      foto: {
        label: 'Fotografie',
        column: 2,
        isImage: true,
      },

      group3: {
        label: 'Studii',
        group: 3,
        column: 1,
        margin: '5px 0px 20px 0px',
        collapsed: true,
      },
      liceul: {
        label: 'Liceul absolvit',
        column: 1,
        inGroup: 3,
      },
      sectia: {
        label: 'Sectia absolvită',
        line: 5,
        column: 1,
        inGroup: 3,
      },
      anulAbsolvirii: {
        label: 'Anul absolvirii',
        column: 1,
        isNumber: true,
        length: 4,
        inLine: 5,
        inGroup: 3,
      },

      group4: {
        label: 'Limbi străine cunoscute',
        group: 4,
        column: 1,
        margin: '5px 0px 20px 0px',
        collapsed: true,
      },
      text3: {
        label:
          'Nivelul:  <span class="ps-3 comment"> 1-Incepator </span><span class="ps-3 comment"> 2-Mediu </span><span class="ps-3 comment"> 3-Avansat </span>',
        isText: true,
        column: 1,
        inGroup: 4,
      },
      engleza: {
        label: 'Engleză',
        column: 1,
        line: 9,
        inGroup: 4,
      },
      franceza: {
        label: 'Franceză',
        column: 1,
        inLine: 9,
        inGroup: 4,
      },
      germana: {
        label: 'Germană',
        column: 1,
        inLine: 9,
        inGroup: 4,
      },
      italiana: {
        label: 'Italiană',
        column: 1,
        line: 10,
        inGroup: 4,
      },
      spaniloa: {
        label: 'Spaniolă',
        column: 1,
        inLine: 10,
        inGroup: 4,
      },
      rusa: {
        label: 'Rusă',
        column: 1,
        inLine: 10,
        inGroup: 4,
      },
      text1: {
        label: 'Certificat de competenţă lingvistică:',
        isText: true,
        column: 1,
        inGroup: 4,
      },
      certificatLingvisticTip: {
        label: 'Tip',
        shortLabel: 'Certificat',
        column: 1,
        line: 11,
        inGroup: 4,
      },
      certificatLingvisticLimba: {
        label: 'Limba',
        shortLabel: 'Certificat',
        column: 1,
        inLine: 11,
        inGroup: 4,
      },

      group6: {
        label: 'Media de admitere',
        group: 6,
        column: 2,
        margin: '55px 0px 20px 0px',
        collapsed: false,
      },

      medieBac: {
        label: 'Media BAC',
        shortLabel: 'MB',
        column: 2,
        isNumber: true,
        inGroup: 6,
      },
      notaBac1: {
        label: 'Nota BAC',
        shortLabel: 'NB',
        column: 2,
        isNumber: true,
        inGroup: 6,
        line: 20,
      },
      materiaBac1: {
        label: 'Materia',
        column: 2,
        inLine: 20,
        inGroup: 6,
      },
      optiuneFormulaCalcul: {
        isOption: true,
        column: 2,
        inGroup: 6,
      },
      legenda: {
        label:
          '<div class="ps-3 comment d-flex"><span class="red d-inline-block">MB - </span> <span>Media la examenul de bacalaureat</span></div>' +
          '<div class="ps-3 comment d-flex"><span class="red d-inline-block">NB - </span> <span>Nota cea mai mare obtinuta la bacalaureat pentru una din materiile: <span class="fs-500">matematica</span>, <span class="fs-500">informatica</span>, <span class="fs-500">fizica</span></span></div>' +
          '<div class="ps-3 comment d-flex"><span class="red d-inline-block">NTG - </span> <span>Nota la testul grilă la matematică</span></div>',
        isText: true,
        column: 2,
        inGroup: 6,
      },
    },
  },
};
