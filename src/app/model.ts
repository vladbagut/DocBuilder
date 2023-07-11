export type UpFile = {
  file: File;
  fileName: string;
  fileBase64: string;
  croppedFile?: File;
  croppedFileBase64?: string;
  expanded: boolean;
  textExtracting?: boolean;
};

export const DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    customDateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const Errors = {
  required: 'Câmpul este obligatoriu',
  InvalidCNP: 'CNP invalid',
  pattern: 'Valoarea introdusa este gresita',
  matDatepickerParse: 'Introduceti o data in formatul: "dd.mm.yyyy"',
  InvalidDate: 'Introduceti o data in formatul: "dd.mm.yyyy"',
};
