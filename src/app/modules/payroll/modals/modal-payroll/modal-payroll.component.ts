import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Payroll } from '@interfaces/payroll';


interface SelectDatePayroll{
  id    : number;
  text  : string;
}

@Component({
  selector: 'app-modal-payroll',
  templateUrl: './modal-payroll.component.html',
  styleUrls: ['./modal-payroll.component.css']
})
export class ModalPayrollComponent implements OnInit {
  @Input('data')  data  : Payroll             = {} as Payroll;
  @Input('title') title : string              = '';
  nameMonth             : string              = '';
  dayInit               : string              = '';
  dayEnd                : string              = '';
  months                : SelectDatePayroll[] = [
    {id: 1,   text: 'ENERO'},
    {id: 2,   text: 'FEBRERO'},
    {id: 3,   text: 'MARZO'},
    {id: 4,   text: 'ABRIL'},
    {id: 5,   text: 'MAYO'},
    {id: 6,   text: 'JUNIO'},
    {id: 7,   text: 'JULIO'},
    {id: 8,   text: 'AGOSTO'},
    {id: 9,   text: 'SEPTIEMBRE'},
    {id: 10,  text: 'OCTUBRE'},
    {id: 11,  text: 'NOVIEMBRE'},
    {id: 12,  text: 'DICIEMBRE'}
  ];

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    let date    : Date = new Date(this.data.year, this.data.receiptPeriod, 1); 
    let dateEnd : Date = new Date(this.data.year, this.data.receiptPeriod, 0);


    this.dayEnd     = dateEnd.getDate().toString();
    this.dayInit    = date.getDate().toString();
    this.nameMonth  = this.months[this.data.receiptPeriod-1].text;
  }

}
