// ---------PDF TEMPLATES --------------

export function asigAutoTemplate(value) {
  let nrSerie: any = localStorage.getItem('NrSerie') || 1000000;
  nrSerie++;
  localStorage.setItem('NrSerie', nrSerie);

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
              'GROUPAMA ASIGURARI S.A.                   Tel.: 0740085442',
              {
                text: 'Brocker / Agent ___________________________',
                fontSize: 10,
                margin: [0, 5, 0, 0],
              },
              {
                text: 'Sucursala / Agentia ___________________________',
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
                    text: 'Seria',
                    bold: true,
                    width: 'auto',
                    margin: [0, 0, 5, 0],
                  },
                  {
                    text: 'RO/XX/YYY/SS',
                    color: 'red',
                  },
                  {
                    text: 'Nr. ',
                    bold: true,
                    width: 'auto',
                    margin: [0, 0, 5, 0],
                  },
                  nrSerie,
                ],
              },
              {
                columns: ['R.C.', 'C.U.I.'],
                margin: [0, 0, 0, 20],
              },
              'Cod Broker/Agent ______________________',
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
        text:
          'Prima de asigurare de: ' +
          ' _____________ ' +
          'RON, incasata cu: ' +
          ' ______________ ' +
          'din data de :' +
          ' _______________',
        margin: [0, 10, 0, 0],
      },
      {
        fontSize: 10,
        margin: [0, 10, 0, 0],
        table: {
          headerRows: 0,
          widths: ['50%', '*'],
          body: [
            ['Limita de despagubire pentru vatamari corporale si deces:', ''],
            ['Limita de despagubire pentru pagube materiale:', ''],
          ],
        },
      },
      {
        fontSize: 9,
        text: 'Comisa de Supraveghere a Asigurăriar primeste si raspunde la toate sesizările şi reciamațiie privind activitatea asigurăbrior, easigurdorior s ntemedarlorn asigurn sisau reasigurăi Bucureşti str. Amiral Constantin Balescu nr.18, sector 1, telefon: 021.316.78.81, 21.31678.88; fax: 021.316.78.54 Condițte conractuale sunt prevăzut in Normale prind asigurarea obigetore de răspundere ivilă pntru rejudi produse prin accidente de vehicule aprobate prin Ordinul preşedintaui Comisiei de Supraveghere a Asigurarior rr. 00 0/2007.',
        margin: [0, 10, 0, 0],
      },
    ],
  };
}

export function fisaInscriereTemplate(value, imagine) {
  return {
    content: [
      {
        text: 'Cerere pasaport',
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
          [imagine],
        ],
      },
    ],
    styles: {
      bold16: {
        fontSize: 16,
        bold: true,
      },
    },
  };
}
