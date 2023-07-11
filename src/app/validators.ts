import { ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

//-----------------------------------
//  CNP validator
//-----------------------------------
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

// --------------------------
//  Date validator
// ------------------------
export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const yearValid =
      moment(control.value, 'YYY').format('L') !== 'Invalid date';
    const monthValid =
      moment(control.value, 'MMM').format('L') !== 'Invalid date' ||
      moment(control.value, 'MM').format('L') !== 'Invalid date';

    const forbidden = !control.value ? false : !(yearValid && monthValid);
    return forbidden ? { InvalidDate: true } : null;
  };
}
