import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.css']
})
export class QuestionModalComponent implements OnInit {
  @Input('question') question  : string = '';
  @Input('title') title     : string = '';

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
