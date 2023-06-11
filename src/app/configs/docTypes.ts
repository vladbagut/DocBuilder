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
        isSeparator
        isText
--------------------------------------*/

export const docTypes = {
  asigAuto: {
    label: 'Asigurare AUTO RCA',
    fields: {
      separator1: {
        label: 'Date asigurat:',
        isSeparator: true,
        margin: '5px 0px 20px 0px',
        value: true,
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
        value: true,
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
        label: 'Data de la care incepe contractul',
        isDate: true,
      },
      separator3: {
        label: 'Date autovehicul:',
        isSeparator: true,
        column: 2,
        margin: '5px 0px 20px 0px',
        value: true,
      },
      nrInmatriculare: {
        label: 'Numar inmatriculare',
        shortLabel: 'A',
        column: 2,
      },
      modelVehicul: {
        label: 'Model vehicul',
        shortLabel: 'D1-D3',
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
    label: 'Fişă înscriere facultate',
    fields: {
      separator1: {
        label: 'Date personale',
        isSeparator: true,
        column: 1,
        margin: '5px 0px 20px 0px',
        value: true,
      },
      nume: {
        label: 'Nume',
        isRequired: true,
      },
      CNP: {
        label: 'CNP',
        isCNP: true,
      },
      nationalitatea: {
        label: 'Naționalitatea',
      },
      localitate: {
        label: 'Localitate',
        shortLabel: 'nastere',
        line: 1,
      },
      judet: {
        label: 'Judet',
        inLine: 1,
      },
      buletinSerie: {
        label: 'Buletin serie',
        line: 2,
      },
      buletinNo: {
        label: 'Nr',
        inLine: 2,
      },
      buletinEliberatDe: {
        label: 'Eliberat de',
        line: 3,
      },
      buletinEliberatLaData: {
        label: 'Data eliberarii',
        isDate: true,
        inLine: 3,
      },
      adresa: {
        label: 'Adresa',
        big: true,
      },
      separator2: {
        label: 'Părinţi / suținători legali',
        isSeparator: true,
        column: 1,
        margin: '5px 0px 20px 0px',
      },
      mama: {
        label: 'Mama',
        column: 1,
      },
      tata: {
        label: 'Tata',
        column: 1,
      },
      adresaParinti: {
        label: 'Adresa',
        big: true,
      },
      foto: {
        label: 'Fotografie',
        column: 2,
        isImage: true,
      },
      separator3: {
        label: 'Studii',
        isSeparator: true,
        column: 1,
        margin: '5px 0px 20px 0px',
      },
      liceul: {
        label: 'Liceul absolvit',
        column: 1,
      },
      sectia: {
        label: 'Sectia absolvită',
        line: 5,
        column: 1,
      },
      anulAbsolvirii: {
        label: 'Anul absolvirii',
        inLine: 5,
        column: 1,
        isNumber: true,
        length: 4,
      },
      medieBac: {
        label: 'Media generală bacalaureat',
        column: 1,
        isNumber: true,
      },
      separator4: {
        label: 'Limbi străine cunoscute',
        isSeparator: true,
        column: 1,
        margin: '5px 0px 20px 0px',
      },
      text3: {
        label: 'Nivel: 1-Incepator,    2-Mediu,    3-Avansat',
        isText: true,
        column: 1,
      },
      engleza: {
        label: 'Engleza',
        column: 1,
        line: 9,
      },
      franceza: {
        label: 'Franceza',
        column: 1,
        inLine: 9,
      },
      germana: {
        label: 'Germana',
        column: 1,
        inLine: 9,
      },
      italiana: {
        label: 'Italiana',
        column: 1,
        line: 10,
      },
      spaniloa: {
        label: 'Spaniloa',
        column: 1,
        inLine: 10,
      },
      rusa: {
        label: 'Rusa',
        column: 1,
        inLine: 10,
      },
      text1: {
        label: 'Certificat de competenţă lingvistică',
        isText: true,
        column: 1,
      },
      certificatLingvisticTip: {
        label: 'tip',
        column: 1,
        line: 11,
      },
      certificatLingvisticLimba: {
        label: 'limba',
        column: 1,
        inLine: 11,
      },
    },
  },
};
