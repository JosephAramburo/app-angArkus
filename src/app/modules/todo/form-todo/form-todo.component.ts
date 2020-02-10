import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationService } from '@services/form-validation.service';
import { TodoService } from '@services/todo.service';
import { TodoInterface } from '@interfaces/todo-interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
  selector: 'app-form-todo',
  templateUrl: './form-todo.component.html',
  styleUrls: ['./form-todo.component.css']
})
export class FormTodoComponent implements OnInit {
  frmTodo         : FormGroup = null;
  statusM         : boolean = true;
  title           : string  = 'Agregar TODO';
  type            : string  = 'save';
  textInputImage  : string  = 'Selecciona un archivo...';
  _id             : string  = '';
  image           : string | ArrayBuffer;  

  constructor(
    private _formValidationService  : FormValidationService,
    private _todoService            : TodoService,
    private _router                  : Router,
    private _toastService           : ToastrService,
    private _route                  : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getParams();
  }

  createForm():void{
    this.frmTodo = new FormGroup({
      description : new FormControl('', Validators.required),
      status      : new FormControl(true, Validators.required),
      image       : new FormControl('', Validators.required)
    });
  }

  getParams():void{
    this._route.params.subscribe(params => {
      this._id = typeof(params.id) !== 'undefined' ? params.id : '';
      
      if(this._id !== ''){
        this.getTodoById();
        this.type   = 'update';
        this.title  = 'EDITAR TODO';
      }
    });
  }

  getTodoById():void{
    this._todoService.getbyId(this._id).subscribe(res => {
      this.frmTodo.get('description').setValue(res.description);
      this.frmTodo.get('status').setValue(res.status);
      this.image          = res.file;
      this.textInputImage = res.typeFile;    

      if(this.image !== ''){
        this.frmTodo.get('image').setErrors(null);
      }
    },(err : HttpErrorResponse) => {
      this._toastService.error(this._formValidationService.messageError(err));
    });
  }

  fileChange(event : any):void{
    const file          = $('#customFile')[0].files;
    this.textInputImage = file[0].name;

    if(file.length > 0){
      const fileReader = new FileReader();

      fileReader.addEventListener('load',(e) => {
        this.image = e.target.result;
        this.frmTodo.controls['image'].clearValidators();
      });

      fileReader.readAsDataURL(file[0]);
    }
  }

  base64ImageToBlob(str) : Blob {
    // extract content type and base64 payload from original string
    var pos = str.indexOf(';base64,');
    var type = str.substring(5, pos);
    var b64 = str.substr(pos + 8);
  
    // decode base64
    var imageContent = atob(b64);
  
    // create an ArrayBuffer and a view (as unsigned 8-bit)
    var buffer = new ArrayBuffer(imageContent.length);
    var view = new Uint8Array(buffer);
  
    // fill the view, using the decoded base64
    for(var n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }
  
    // convert ArrayBuffer to Blob
    var blob = new Blob([buffer], { type: type });
  
    return blob;
  }

  getExtension(fileName:string) : string {
    return fileName.substr( (fileName.lastIndexOf('.') +1) );
  }

  save():void{
    if(!this.frmTodo.valid){
      this._formValidationService.validateAllFormFields(this.frmTodo);
      return;
    }

    const params : TodoInterface = {
      _id         : this._id,
      description : this.frmTodo.get('description').value,
      status      : this.frmTodo.get('status').value,
      file        : this.image,
      typeFile    : this.getExtension(this.textInputImage)
    };

    this._todoService[this.type](params).subscribe(res => {
      this._toastService.success('Registro guardado correctamente');
      this._router.navigate(['/todo']);
    },(err : HttpErrorResponse) => {
      this._toastService.error(this._formValidationService.messageError(err));
    });

  }

  inputValid(name){
    return this._formValidationService.inputValidation(this.frmTodo, name);
  }

  showErrors(name):boolean{
    return this._formValidationService.showErrors(this.frmTodo, name);
  }

}
