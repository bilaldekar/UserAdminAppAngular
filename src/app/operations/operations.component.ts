import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../shared/operation.service';
import { operationArticle } from './operation';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  operations: operationArticle[];
  cols: any[];

  constructor(private operationsService: OperationsService) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'name' },
      { field: 'date', header: 'date' },
      { field: 'type', header: 'type' },
      { field: 'port', header: 'port' }
    ];


    this.operationsService.getOperationsArticle()
      .subscribe((res: operationArticle[]) => {
        if (res) {
          this.operations = res;
          console.log('-----------> ' + this.operations.length);
        }
      }, (err) => {
        alert('Faild to load data');
      });
  }

}
