import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

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

import { docTypes } from 'src/app/configs/docTypes';
import * as PDFTemplates from 'src/app/configs/pdfTemplates';

export type UpFile = {
  file: File;
  fileName: string;
  fileBase64: string;
  croppedFile?: File;
  croppedFileBase64?: string;
  expanded: boolean;
  textExtracting?: boolean;
};

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
  cropImg(e, upFile: UpFile): void {
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
    return PDFTemplates[this.selectedDocType.key + 'Template']
      ? PDFTemplates[this.selectedDocType.key + 'Template'](
          this.form.value,
          this.getImagine()
        )
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
}
