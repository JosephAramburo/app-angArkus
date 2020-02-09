import { Component, OnInit } from '@angular/core';
import { TodoInterface } from '@interfaces/todo-interface';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  listData : TodoInterface[] = [];
  constructor() { }

  ngOnInit(): void {
    this.setData();
  }

  setData():void{
    let row : TodoInterface = {
      _id         : '1',
      description : 'Description 1',
      status      : true
    };
    this.listData.push(row);

    row = {
      _id         : "2",
      description : "DEscription 2",
      status      : false
    };
    this.listData.push(row);

    row = {
      _id         : "3",
      description : "DEscription 3",
      status      : false
    };
    this.listData.push(row);
  }

}
