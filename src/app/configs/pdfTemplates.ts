// ---------PDF TEMPLATES --------------

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
          '______________ ' +
          ' pana la: ' +
          ' ______________ ' +
          'emisa in data de :' +
          ' _______________',
        margin: [0, 10, 0, 0],
      },
      {
        text: 'Prima de asigurare de: ' + value.primaAsigurare,
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
    content: [
      {
        text: 'Fisa de inscriere',
        bold: true,
        fontSize: 16,
        alignment: 'center',
        margin: [0, 0, 0, 20],
      },
      {
        columns: [
          {
            stack: [
              {
                columns: [
                  {
                    text: 'Nume: ',
                    width: 'auto',
                    margin: [0, 0, 5, 5],
                  },
                  {
                    text: value.nume,
                    bold: true,
                    color: '#3a7fa7',
                  },
                ],
              },
              {
                columns: [
                  {
                    text: 'CNP: ',
                    width: 'auto',
                    margin: [0, 0, 5, 0],
                  },
                  value.CNP,
                ],
              },
            ],
          },
          [getImagine(value.imagine)],
        ],
      },
    ],
  };
}

function getImagine(img) {
  return img
    ? {
        image: img,
        width: 150,
        alignment: 'right',
      }
    : null;
}
