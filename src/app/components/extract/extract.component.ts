import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { FileService } from 'src/app/services/file.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormControl, FormGroup } from '@angular/forms';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { uniqBy } from 'lodash';
import { TemplateDirective } from 'src/app/directives/template.directive';
import { ChangeBackgroundAnimation, FadingAnimation } from 'src/animations';
import { MatMenuTrigger } from '@angular/material/menu';
import * as Tesseract from 'tesseract.js';

import { createWorker } from 'tesseract.js';

export type UpFile = {
  file: File;
  fileName: string;
  fileBase64: string;
  croppedFile?: File;
  croppedFileBase64?: string;
  expanded: boolean;
  textExtracting?: boolean;
};

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

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss'],
  animations: [ChangeBackgroundAnimation, FadingAnimation],
})
export class ExtractComponent implements OnInit {
  errorMessage: string;
  CERTIFICATE_UPLOAD_FILE_MAX_SIZE = 5242880;
  CERTIFICATE_UPLOAD_FILE_FORMATS = '.jpeg,.jpg,.png';
  private worker;
  selectedDocType;
  form = new FormGroup({});
  public files: UpFile[] = [];
  textConsola = '';
  contextMenuPosition = { x: 0, y: 0 };
  openedTrigger = null;
  textExtracting: boolean;
  textExtractingFor;
  nrSerie;

  @ViewChildren(TemplateDirective)
  public templates: QueryList<TemplateDirective>;

  @ViewChildren(MatMenuTrigger)
  public menuTriggers: QueryList<MatMenuTrigger>;

  constructor(public fileService: FileService, private elRef: ElementRef) {
    uniqBy(
      docTypes
        ?.filter((item) => item['fields'])
        .map((item) => item['fields'].map((f) => f.key))
        .flat() || []
    ).map((field) => this.form.addControl(field, new FormControl()));
  }

  async ngOnInit() {
    try {
      this.worker = await createWorker();
      await this.worker.loadLanguage('ron+eng');
      await this.worker.initialize('ron+eng');
    } catch {}

    document.addEventListener('contextmenu', (event) => {
      if (this.openedTrigger) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }

  //  1. upload file ---------
  async setFile(file: File) {
    if (file) {
      const typeSplit = file.type.split('/');
      const fileType = '.' + typeSplit[typeSplit.length - 1];
      this.errorMessage = '';

      if (file.size > this.CERTIFICATE_UPLOAD_FILE_MAX_SIZE) {
        this.errorMessage =
          'Fisierul este prea mare, dimensiunea maxima este de 5MB';
      } else if (
        !this.CERTIFICATE_UPLOAD_FILE_FORMATS.split(',').includes(fileType)
      ) {
        this.errorMessage = 'Formatul fisierului este invalid';
      } else {
        const newFile: UpFile = {
          file: file,
          fileName: file.name,
          fileBase64: await this.fileService.getBase64(file),
          expanded: true,
        };
        this.files.unshift(newFile);
      }
    }
  }

  //  2. crop imagine ----------
  cropImg(e: ImageCroppedEvent, upFile: UpFile): void {
    upFile.croppedFileBase64 = e?.base64 || null;
    upFile.croppedFile = e
      ? this.fileService.base64ToFile(e.base64, 'picture')
      : null;
    this.textExtracting = false;
  }

  // 3. extract text din imagine ----------
  sendTextInField(text, field) {
    this.form
      .get(field)
      .setValue((this.form.get(field).value || '') + ' ' + text);
  }

  async sendFileInFiled(source?: { file?: File; fileBase64?: string }, field?) {
    if (field !== 'imagine') {
      //text
      this.extractText(source.file).then((text) => {
        if (field)
          this.form
            .get(field)
            .setValue((this.form.get(field).value || '') + ' ' + text);
        else {
          this.textConsola = text;
        }
      });
    } else {
      // imagine
      this.form
        .get('imagine')
        .setValue(
          source.fileBase64 || (await this.fileService.getBase64(source.file))
        );
    }
  }

  extractText(imageToProcess: File) {
    this.textExtracting = true;
    if (this.worker) {
      return this.worker
        .recognize(imageToProcess)
        .then(({ data: { text } }) => {
          return text;
        })
        .catch(() => {
          alert('Ups... tesseract not working');
          return '';
        })
        .finally(() => {
          this.textExtracting = false;
        });
    } else {
      return Tesseract.recognize(imageToProcess, 'eng', {
        logger: (m) => console.log(m),
      })
        .then(({ data: { text } }) => {
          return text;
        })
        .catch(() => {
          alert('Ups... tesseract not working');
          return '';
        })
        .finally(() => {
          this.textExtracting = false;
        });
    }
  }

  // 4. Utils (ALTE METODE)-------------
  deleteMedia(upFile: UpFile) {
    this.files.splice(this.files.indexOf(upFile), 1);
  }

  resizing() {
    var elements = this.elRef.nativeElement.querySelectorAll('img');
    elements.forEach((img) => {
      const last = img.src;
      img.src = null;
      img.src = last;
    });
  }

  getFormularTemplate() {
    var key = this.selectedDocType?.key;
    if (!key) return null;
    const filteredElements = this.templates.find(
      (elementRef) => elementRef.templateName == key
    );
    return filteredElements?.template;
  }

  onMenuOpen(trigger) {
    if (this.openedTrigger && this.openedTrigger !== trigger) {
      setTimeout(() => {
        this.openedTrigger.closeMenu();
        trigger.openMenu();
      }, 0);
    }
    this.openedTrigger = trigger;
  }

  getFormularFields(column) {
    if (this.selectedDocType) {
      const list = this.selectedDocType?.fields || [];
      if (column == 1) return list.filter((f) => !f.column || f.column == 1);
      else return list.filter((f) => f.column && f.column == 2);
    }
    return [];
  }

  get docTypes() {
    return docTypes;
  }

  // 5. Generare PDF  ----------
  resetForm() {
    Object.keys(this.form.controls).forEach((field) => {
      this.form.get(field).setValue('');
    });
  }
  generarePdf(actiune = 'open') {
    const documentDefinition = this.getPdfDefinition();
    switch (actiune) {
      case 'open':
        pdfMake.createPdf(documentDefinition).open();
        break;
      case 'print':
        pdfMake.createPdf(documentDefinition).print();
        break;
      case 'download':
        pdfMake.createPdf(documentDefinition).download();
        break;
      default:
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }
  getPdfDefinition() {
    return this[this.selectedDocType.key + 'PdfTemplate']
      ? this[this.selectedDocType.key + 'PdfTemplate']()
      : {};
  }
  getImagine() {
    if (
      this.selectedDocType?.fields.some((f) => f.key == 'imagine') &&
      this.form.get('imagine').value
    ) {
      return {
        image: this.form.get('imagine').value,
        width: 150,
        alignment: 'right',
      };
    }
    return null;
  }

  // ---------PDF TEMPLATES --------------
  asigAutoPdfTemplate() {
    const value = this.form.value;
    this.nrSerie = localStorage.getItem('NrSerie') || 1000000;
    this.nrSerie++;
    localStorage.setItem('NrSerie', this.nrSerie);

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
                    this.nrSerie,
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

  cererePasaportPdfTemplate() {
    const value = this.form.value;
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
            [this.getImagine()],
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
}
