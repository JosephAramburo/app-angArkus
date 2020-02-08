import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);            
      }
    });
  }

  inputValidation(frm: FormGroup, name : string){
    return {
      'is-invalid': (frm.controls[name].dirty || frm.controls[name].touched)  && frm.controls[name].invalid, 
      'is-valid': frm.controls[name].valid
    }
  }

  showErrors(frm: FormGroup, name : string):boolean{
    return frm.controls[name].invalid && (frm.controls[name].dirty || frm.controls[name].touched);
  }
}
