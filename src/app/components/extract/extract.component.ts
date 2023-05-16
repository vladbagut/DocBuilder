import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { FileService } from 'src/app/services/file.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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

const Errors = {
  required: 'Câmpul este obligatoriu',
  InvalidCNP: 'CNP invalid',
  pattern: 'Câmpul este numeric',
};

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss'],
  animations: [ChangeBackgroundAnimation, FadingAnimation],
})
export class ExtractComponent implements OnInit, AfterViewInit {
  errorMessage: string;
  CERTIFICATE_UPLOAD_FILE_MAX_SIZE = 5242880;
  CERTIFICATE_UPLOAD_FILE_FORMATS = '.jpeg,.jpg,.png';
  private worker;
  selectedDocType;

  formGroup = new FormGroup({});
  configFormGroup = new FormGroup({});
  public files: UpFile[] = [];
  textConsola = '';
  contextMenuPosition = { x: 0, y: 0 };
  openedTrigger = null;
  textExtracting: boolean;
  textExtractingFor;
  docTypesList = [];
  configList = [];

  signatureBase64 = null;
  signOpenState;
  signaturePadOptions: Object = {
    minWidth: 1,
    penColor: '#3a7fa7',
  };
  configOpenState;

  @ViewChildren(TemplateDirective)
  public templates: QueryList<TemplateDirective>;

  @ViewChildren(MatMenuTrigger)
  public menuTriggers: QueryList<MatMenuTrigger>;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  constructor(
    public fileService: FileService,
    private elRef: ElementRef,
    public route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.initFormGroup();
    this.initConfigFormGroup();
  }

  async ngOnInit() {
    this.route.data.subscribe((routerData) => {
      const doc = this.docTypesList.find(
        (dt) => dt.key == routerData.docTypeKey
      );
      this.selectedDocType = doc;
    });

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

  ngAfterViewInit(): void {
    this.initSignature();
  }

  initFormGroup() {
    this.docTypesList = Object.keys(docTypes).map((key) => ({
      key,
      ...docTypes[key],
      fieldsList: Object.keys(docTypes[key].fields).map((fk) => ({
        key: fk,
        ...docTypes[key].fields[fk],
      })),
    }));

    this.configList = Object.keys(config).map((key) => ({
      key,
      ...config[key],
      fieldsList: Object.keys(config[key].fields).map((fk) => ({
        key: fk,
        ...config[key].fields[fk],
      })),
    }));

    this.formGroup = new FormGroup(
      Object.keys(docTypes).reduce((obj, key) => {
        obj[key] = this.getFormSubGroup(docTypes, key);
        return obj;
      }, {})
    );
  }

  initConfigFormGroup() {
    //config
    this.configFormGroup = new FormGroup(
      Object.keys(config).reduce((obj, key) => {
        obj[key] = this.getFormSubGroup(config, key);
        return obj;
      }, {})
    );

    //setare valori initiale
    const configObj = localStorage.getItem('config')
      ? JSON.parse(localStorage.getItem('config'))
      : initialConfig;

    this.configFormGroup.patchValue(configObj);

    this.configFormGroup.valueChanges.subscribe(() => {
      localStorage.setItem(
        'config',
        JSON.stringify(this.configFormGroup.value)
      );
    });
  }

  initSignature() {
    if (localStorage.getItem('signature')) {
      this.signatureBase64 = JSON.parse(localStorage.getItem('signature'));
      if (this.signatureBase64) {
        this.signaturePad.fromDataURL(this.signatureBase64);
        this.cd.detectChanges();
      }
    }
  }

  getFormSubGroup(dic, dicKey) {
    return new FormGroup(
      Object.keys(dic[dicKey].fields).reduce((_obj, _key) => {
        _obj[_key] = new FormControl(null, []);
        const field = dic[dicKey].fields[_key];
        if (field.isRequired) _obj[_key].addValidators([Validators.required]);
        if (field.isNumber)
          _obj[_key].addValidators([Validators.pattern(/^-?(0|[1-9]\d*)?$/)]);
        if (field.isCNP) _obj[_key].addValidators([CNPValidator()]);
        if (field.isEmail) _obj[_key].addValidators([Validators.email]);
        return _obj;
      }, {})
    );
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
    this.formGroup
      .get(this.selectedDocType.key)
      .get(field)
      .setValue(
        (this.formGroup.get(this.selectedDocType.key).get(field).value || '') +
          text
      );
  }

  async sendFileInFiled(source?: { file?: File; fileBase64?: string }, field?) {
    if (field?.isImage) {
      // imagine
      this.formGroup
        .get(this.selectedDocType.key)
        .get(field.key)
        .setValue(
          source.fileBase64 || (await this.fileService.getBase64(source.file))
        );
    } else {
      //text
      this.extractText(source.file).then((text) => {
        if (field) {
          text = this.processedText(text, field.key);
          this.formGroup
            .get(this.selectedDocType.key)
            .get(field.key)
            .setValue(
              (this.formGroup.get(this.selectedDocType.key).get(field.key)
                .value || '') + text
            );
        } else {
          this.textConsola = text;
        }
      });
    }
  }

  async sendFileInConfigField(file?: File, field?) {
    this.configFormGroup
      .get(this.selectedDocType.key)
      .get(field.key)
      .setValue(await this.fileService.getBase64(file));
  }

  processedText(text, field) {
    text = text.trim().trimStart().trimEnd();
    if (field == 'CNP' && text.endsWith('-')) {
      text = text.replace('-', '');
      text = text.trim().trimStart().trimEnd();
    }
    return text;
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

  getSelectedDocTypeFields(column?) {
    if (column == 1)
      return this.selectedDocType.fieldsList.filter(
        (f) => !f.column || f.column == 1
      );
    else
      return this.selectedDocType.fieldsList.filter(
        (f) => f.column && f.column == 2
      );
  }

  getSelectedDocTypeConfigFields() {
    return (
      this.configList.find((c) => c.key == this.selectedDocType.key)
        ?.fieldsList || []
    );
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

  getErrorMessage(field) {
    if (
      this.selectedDocType &&
      this.formGroup.get(this.selectedDocType.key).get(field.key).invalid
    ) {
      const fieldErrors = this.formGroup
        .get(this.selectedDocType.key)
        .get(field.key).errors;
      const msgKey = Object.keys(fieldErrors)[0];
      return Errors[msgKey];
    } else return null;
  }

  // 5. Generare PDF  ----------
  resetForm() {
    const form = this.formGroup.get(this.selectedDocType.key);
    form.reset();
    Object.keys(form['controls']).forEach((key) => {
      form.get(key).markAsPending();
    });
  }

  generarePdf(actiune = 'open') {
    const form = this.formGroup.get(this.selectedDocType.key);
    Object.keys(form['controls']).forEach((key) => {
      form.get(key).updateValueAndValidity();
    });

    if (!this.formGroup.get(this.selectedDocType.key).valid) return;

    let nrSerie;
    if (this.selectedDocType.key == 'asigAuto') {
      nrSerie =
        +this.configFormGroup.get(this.selectedDocType.key).get('numarSerie')
          .value || 100000001;
    }

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

    if (this.selectedDocType.key == 'asigAuto') {
      this.configFormGroup
        .get(this.selectedDocType.key)
        .get('numarSerie')
        .setValue(nrSerie + 1);
    }
  }
  getPdfDefinition() {
    return PDFTemplates[this.selectedDocType.key + 'Template']
      ? PDFTemplates[this.selectedDocType.key + 'Template'](
          this.formGroup.get(this.selectedDocType.key).value,
          this.configFormGroup.get(this.selectedDocType.key).value,
          this.getSignature()
        )
      : {};
  }

  getSignature() {
    return this.signatureBase64
      ? {
          image: this.signatureBase64,
          width: 100,
          alignment: 'center',
        }
      : null;
  }

  // 6. Signature
  drawComplete() {
    this.signatureBase64 = this.signaturePad.toDataURL();
    localStorage.setItem('signature', JSON.stringify(this.signatureBase64));
  }
  clearSign() {
    this.signatureBase64 = null;
    localStorage.setItem('signature', null);
    this.signaturePad.clear();
  }
}

//-----------------------------------
//  CNP validator
//-----------------------------------
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad';
import { ActivatedRoute } from '@angular/router';
import { config, initialConfig } from 'src/app/configs/config';

export function CNPValidator(): ValidatorFn {
  let isValidCNP = (text) => {
    var i = 0,
      year = 0,
      hashResult = 0,
      cnp = [],
      hashTable = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
    if (text.length !== 13) {
      return false;
    }
    for (i = 0; i < 13; i++) {
      cnp[i] = parseInt(text.charAt(i), 10);
      if (isNaN(cnp[i])) {
        return false;
      }
      if (i < 12) {
        hashResult = hashResult + cnp[i] * hashTable[i];
      }
    }
    hashResult = hashResult % 11;
    if (hashResult === 10) {
      hashResult = 1;
    }
    year = cnp[1] * 10 + cnp[2];
    switch (cnp[0]) {
      case 1:
      case 2:
        {
          year += 1900;
        }
        break;
      case 3:
      case 4:
        {
          year += 1800;
        }
        break;
      case 5:
      case 6:
        {
          year += 2000;
        }
        break;
      case 7:
      case 8:
      case 9:
        {
          year += 2000;
          if (year > new Date().getFullYear() - 14) {
            year -= 100;
          }
        }
        break;
      default: {
        return false;
      }
    }
    if (year < 1800 || year > 2099) {
      return false;
    }

    return cnp[12] === hashResult;
  };

  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let p_cnp = control.value;
    if (!p_cnp) return null;
    return !isValidCNP(p_cnp) ? { InvalidCNP: true } : null;
  };
}
