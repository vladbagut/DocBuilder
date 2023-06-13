// ---------PDF TEMPLATES --------------

import * as moment from 'moment';

export function asigAutoTemplate(value, config, semnatura) {
  return {
    pageSize: 'A4',
    pageMargins: [20, 40, 20, 40],
    content: [
      {
        columns: [
          {
            width: '65%',
            fontSize: 11,
            stack: [
              {
                text: 'CONTRACT DE ASIGURARE DE RASPUNDERE CIVILA AUTO RCA',
                bold: true,
              },
              {
                text:
                  config.companie +
                  '                   Tel.: ' +
                  config.telefon,
                margin: [0, 3, 0, 0],
              },
              {
                text: 'Brocker / Agent : ' + config.agent,
                fontSize: 10,
                margin: [0, 15, 0, 0],
              },
              {
                text: 'Sucursala / Agentia: ' + config.sucursala,
                fontSize: 10,
              },
            ],
          },
          {
            width: '*',
            fontSize: 10,
            stack: [
              {
                columns: [
                  {
                    text: 'Seria:',
                    bold: true,
                    width: 'auto',
                    margin: [0, 0, 5, 0],
                  },
                  {
                    text: config.serie,
                  },
                  {
                    text: 'Nr. ',
                    bold: true,
                    width: 'auto',
                    margin: [0, 0, 5, 0],
                  },
                  config.numarSerie,
                ],
              },
              {
                columns: [
                  {
                    text: 'R.C.  ',
                    bold: true,
                    width: 'auto',
                    margin: [0, 3, 3, 20],
                  },
                  {
                    text: config.RC,
                    margin: [0, 3, 0, 20],
                  },
                  {
                    text: 'C.U.I.  ',
                    bold: true,
                    width: 'auto',
                    margin: [17, 3, 3, 20],
                  },
                  {
                    text: config.CUI,
                    margin: [0, 3, 0, 20],
                  },
                ],
              },
              'Cod Broker/Agent: ' + config.codAgent,
            ],
          },
        ],
      },
      {
        fontSize: 10,
        margin: [0, 5, 0, 0],
        table: {
          headerRows: 0,
          widths: ['25%', '*', '25%', '25%'],
          body: [
            [
              { stack: ['Nume/Denumire Asigurat', 'Proprietar'] },
              value.nume,
              { stack: ['Fel, Tip, Marca', 'Model Vehicul:'] },
              value.modelVehicul,
            ],
            [
              'C.U.I / C.N.P Proprietar:',
              value.CNP,
              'Nr. inmatriculare/inregistrare:',
              value.nrInmatriculare,
            ],
            [
              { stack: ['Nume/Denumire Asigurat', 'Utilizator'] },
              '',
              {
                stack: ['NR.identificare - Serie CIV', 'Nr de inventar'],
              },
              { stack: [value.serieŞasiu, value.nrInventar] },
            ],
            [
              'C.U.I / C.N.P Utilizator:',
              '',
              {
                stack: ['Capacitatea cilindrica', 'Putere'],
              },
              { stack: [value.capacitateaCilindrica, value.putere] },
            ],
            [
              {
                stack: ['Adresa asigurat/utilizator', 'Tel:', 'E-mail:'],
              },
              value.adresa,
              {
                stack: ['Nr.locuri', 'Masa max. autorizata'],
              },
              { stack: [value.numarLocuri, value.greutateMaximaAdmisa] },
            ],
          ],
        },
      },
      {
        text:
          'Valabilitate contract de la: ' +
          getDateFromMoment(value.data) +
          ' pana la: ' +
          getDateFromMoment(value.data, true) +
          ' emisa in data de: ' +
          moment().format('DD.MM.YYYY'),
        margin: [0, 10, 0, 0],
      },
      {
        text:
          'Prima de asigurare de: ' +
          (value.primaAsigurare || '_____________________'),
        margin: [0, 10, 0, 0],
      },
      {
        fontSize: 10,
        margin: [0, 10, 0, 0],
        table: {
          headerRows: 0,
          widths: ['50%', '*'],
          body: [
            [
              'Limita de despagubire pentru vatamari corporale si deces:',
              value.limitaDespagubireVatamari,
            ],
            [
              'Limita de despagubire pentru pagube materiale:',
              value.limitaDespagubirePagube,
            ],
          ],
        },
      },
      {
        fontSize: 9,
        text: 'Comisa de Supraveghere a Asigurăriar primeste si raspunde la toate sesizările şi reciamațiie privind activitatea asigurăbrior, easigurdorior s ntemedarlorn asigurn sisau reasigurăi Bucureşti str. Amiral Constantin Balescu nr.18, sector 1, telefon: 021.316.78.81, 21.31678.88; fax: 021.316.78.54 Condițte conractuale sunt prevăzut in Normale prind asigurarea obigetore de răspundere ivilă pntru rejudi produse prin accidente de vehicule aprobate prin Ordinul preşedintaui Comisiei de Supraveghere a Asigurarior rr. 00 0/2007.',
        margin: [0, 10, 0, 0],
      },
      {
        margin: [0, 50, 0, 0],
        columns: [
          {
            stack: [
              {
                text: 'Semnatura asigurat: ',
                width: 'auto',
              },
              {
                text: '- - - - - - - - - - - - - - - - - - - - - -',
                width: 'auto',
                color: 'gray',
                margin: [0, 50, 0, 0],
              },
            ],
          },
          {
            stack: [
              {
                text: 'Semnatura agent asigurare: ',
                width: 'auto',
                alignment: 'center',
              },
              [semnatura],
              {
                text: '- - - - - - - - - - - - - - - - - - - - - -',
                width: 'auto',
                alignment: 'center',
                color: 'gray',
                margin: [0, semnatura ? 0 : 50, 0, 0],
              },
            ],
          },
        ],
      },
    ],
  };
}

export function fisaInscriereTemplate(value, config, semnatura) {
  return {
    pageSize: 'A4',
    pageMargins: [30, 40, 20, 40],
    content: [
      {
        columns: [
          {
            width: '*',
            stack: [
              {
                columns: [
                  {
                    width: 'auto',
                    stack: [getImagine(config.logo, 110)],
                    margin: [0, 0, 10, 0],
                  },
                  {
                    width: '*',
                    fontSize: 9,
                    stack: [
                      config.adresa,
                      'Tel: ' + config.telefon,
                      config.website,
                    ],
                  },
                ],
              },
              {
                margin: [0, 10, 0, 30],
                fontSize: 8,
                text: config.facultatea,
                width: 50,
              },
            ],
          },
          {
            width: 'auto',
            stack: [
              getImagine(value.foto, 100),
              {
                margin: [0, 10, 0, 0],
                text: 'Tel:        ' + getFieldValue(value, 'telefon', 30),
                fontSize: 8,
              },
              {
                margin: [0, 5, 0, 30],
                text: 'E-mail:  ' + getFieldValue(value, 'email', 30),
                fontSize: 8,
              },
            ],
          },
        ],
      },

      {
        margin: [0, 10, 0, 0],
        with: '*',
        alignment: 'center',
        text: 'FIŞĂ DE ÎNSCRIERE',
      },
      {
        with: '*',
        alignment: 'center',
        fontSize: 10,
        text: 'la concursul de admitere în învăţământul universitar de licenţă (ciclul I de studii universitare)',
      },
      {
        margin: [0, 25, 0, 0],
        with: '*',
        fontSize: 10,
        text: '1. Numele şi prenumele candidatului: ' + value.nume,
      },
      {
        margin: [0, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text:
          '2. Cod numeric personal:  ' +
          (value.CNP
            ? value.CNP
            : '___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___ ___'),
      },
      {
        margin: [0, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text: '3. Sexul:  ' + extrageDateDinCNP(value.CNP).sex,
      },
      {
        margin: [0, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text:
          '4. Naționalitatea:  ' +
          (value.nationalitatea || '_________________'),
      },
      {
        margin: [0, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text: '5. Data naşterii:  ' + extrageDateDinCNP(value.CNP).dataNasterii,
      },
      {
        margin: [0, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text:
          '5. Locul naşterii:  ' +
          'localitatea: ' +
          (value.localitate || '_________________') +
          ' ,  judetul: ' +
          (value.judet || '________________'),
      },
      {
        margin: [0, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text:
          '6. Carte identitate:  ' +
          'seria: ' +
          (value.buletinSerie || '______') +
          ' ,  nr.: ' +
          (value.buletinNo || '____________') +
          ' ,  eliberat: ' +
          (value.buletinEliberatDe || '______________________') +
          ' ,  la data:  ' +
          (getDateFromMoment(value.buletinEliberatLaData) || '_______________'),
      },
      {
        margin: [0, 10, 0, 0],
        with: '*',
        fontSize: 10,
        columns: [
          {
            margin: [0, 0, 3, 0],
            width: 'auto',
            text: '7.',
          },
          {
            width: '*',
            text: 'Domiciliul stabil:  ' + getFieldValue(value, 'adresa', 91),
          },
        ],
      },
      value.adresa
        ? ''
        : {
            margin: [10, 7, 0, 0],
            with: '*',
            fontSize: 10,
            text: '   ' + '_'.repeat(109),
          },

      {
        margin: [0, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text: '8. Părinţi sau sutinători legali:',
      },
      {
        margin: [10, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text:
          '   mama:   ' +
          getFieldValue(value, 'mama', 46) +
          ' ,  tata:   ' +
          getFieldValue(value, 'tata', 46),
      },
      {
        margin: [10, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text: 'adresa:    ' + getFieldValue(value, 'adresaParinti', 99),
      },

      {
        margin: [0, 10, 0, 0],
        with: '*',
        fontSize: 10,
        columns: [
          {
            margin: [0, 0, 3, 0],
            width: 'auto',
            text: '9.',
          },
          {
            width: '*',
            text: 'Liceul absolvit:  ' + getFieldValue(value, 'liceul', 93),
          },
        ],
      },
      {
        margin: [10, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text:
          '   sectia absolvita:  ' +
          getFieldValue(value, 'sectia', 52) +
          '  ,   anul absolvirii: ' +
          getFieldValue(value, 'anulAbsolvirii', 22),
      },
      {
        margin: [-6, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text: '10. Limbi străine cunoscute:',
      },
      {
        margin: [10, 10, 0, 0],
        columns: [
          {
            width: '33%',
            fontSize: 9,
            text: 'Engleză: ' + getFieldValue(value, 'engleza', 21),
          },
          {
            width: '33%',
            fontSize: 9,
            text: 'Franceză: ' + getFieldValue(value, 'franceza', 21),
          },
          {
            width: '33%',
            fontSize: 9,
            text: 'Germană: ' + getFieldValue(value, 'germana', 22),
          },
        ],
      },
      {
        margin: [10, 10, 0, 0],
        columns: [
          {
            width: '33%',
            fontSize: 9,
            text: 'Italiană: ' + getFieldValue(value, 'italiana', 21),
          },
          {
            width: '33%',
            fontSize: 9,
            text: 'Spaniolă: ' + getFieldValue(value, 'spaniloa', 21),
          },
          {
            width: '33%',
            fontSize: 9,
            text: 'Rusă:        ' + getFieldValue(value, 'rusa', 22),
          },
        ],
      },
      {
        margin: [-6, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text: '11. Certificat de competenţă lingvistică:',
      },
      {
        margin: [10, 10, 0, 0],
        columns: [
          {
            width: '33%',
            fontSize: 9,
            text: 'Tip: ' + getFieldValue(value, 'certificatLingvisticTip', 21),
          },
          {
            width: '33%',
            fontSize: 9,
            text:
              'Limba: ' + getFieldValue(value, 'certificatLingvisticLimba', 21),
          },
        ],
      },
      {
        margin: [-6, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text: '12. Media de admitere:',
      },
      ...getMediaAdmitere(value, config),
    ],
  };
}

function getImagine(img, width) {
  return img
    ? {
        image: img,
        width: width,
        alignment: 'right',
      }
    : null;
}

function extrageDateDinCNP(CNP) {
  if (!CNP)
    return {
      sex: ' _____',
      dataNasterii: `ziua: ___________ ,  luna: ___________ ,  anul: _____________`,
    };

  const s = CNP.substring(0, 1);
  let sex, aa, an, zi, luna;
  switch (s) {
    case '1':
      sex = 'Masculin';
      aa = '19';
      break;
    case '2':
      sex = 'Feminin';
      aa = '19';
      break;
    case '3':
      sex = 'Masculin';
      aa = '18';
      break;
    case '4':
      sex = 'Feminin';
      aa = '18';
      break;
    case '5':
      sex = 'Masculin';
      aa = '20';
      break;
    case '6':
      sex = 'Feminin';
      aa = '20';
      break;
    case '7':
      sex = 'Masculin';
      aa = '19';
      break;
    case '8':
      sex = 'Feminin';
      aa = '19';
      break;
  }
  an = aa + CNP.substring(1, 3);
  luna = CNP.substring(3, 5);
  zi = CNP.substring(5, 7);

  return {
    sex,
    dataNasterii: `ziua:  ${zi},    luna:  ${luna},     anul:  ${an}`,
  };
}

function getDateFromMoment(data, addYear?) {
  if (!data) return '____ /____ /________ ';

  return addYear
    ? data.add(1, 'years').format('DD.MM.YYYY')
    : data.format('DD.MM.YYYY');
}

function getFieldValue(value, field, length = 10) {
  return value[field] || '_'.repeat(length);
}

function getMediaAdmitere(value, config) {
  if (config.tipConcurs === 0) {
    //dosare

    const formula1 = config.formulaDosare
      ?.replace('MAX', '')
      .replace('(', '')
      .replace(')', '')
      .split(',')[0];

    const p = formula1.split('+');
    const d1: number = +p[0].split('*')[0];
    const d2: number = +p[1].split('*')[0];

    const media =
      value.notaBac1 && value.medieBac
        ? Math.max(
            d1 * value.notaBac1 + d2 * value.medieBac,
            value.medieBac
          ).toPrecision(3)
        : 0;
    return [
      {
        margin: [12, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text:
          'Media de la bacalaureat ( MB ):   ' +
          getFieldValue(value, 'medieBac'),
      },
      {
        margin: [12, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text:
          'Nota cea mai mare obtinuta la bacalaureat ( NB ):   ' +
          getFieldValue(value, 'materiaBac1', 0) +
          (value.materiaBac1 ? '  :    ' : '') +
          getFieldValue(value, 'notaBac1'),
      },
      {
        margin: [12, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text:
          'Formula de calcul a mediei de admitere:  ' + config.formulaDosare,
      },
      {
        with: '*',
        fontSize: 10,
        columns: [
          {
            width: 'auto',
            margin: [12, 10, 0, 0],
            with: '*',
            fontSize: 10,
            text: 'Media de admitere:  ',
          },
          {
            text: media || '__________________',
            bold: media != 0 ? true : false,
            fontSize: 12,
            margin: [10, 7, 0, 0],
          },
        ],
      },
    ];
  } else {
    //examen

    let formulaCalcul = '_'.repeat(20);
    if (value.optiuneFormulaCalcul == 1) formulaCalcul = config.formulaExam1;
    if (value.optiuneFormulaCalcul == 2) formulaCalcul = config.formulaExam2;

    return [
      {
        margin: [12, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text:
          'Media de la bacalaureat ( MB ):   ' +
          getFieldValue(value, 'medieBac'),
      },
      {
        margin: [12, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text:
          'Nota cea mai mare obtinuta la bacalaureat ( NB ):   ' +
          getFieldValue(value, 'materiaBac1', 0) +
          (value.materiaBac1 ? '  :    ' : '') +
          getFieldValue(value, 'notaBac1'),
      },
      {
        margin: [12, 10, 0, 0],
        with: '*',
        fontSize: 10,
        text: 'Formula de calcul a mediei de admitere:  ' + formulaCalcul,
      },
    ];
  }
}
