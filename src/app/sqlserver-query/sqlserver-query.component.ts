import { Component, OnInit } from '@angular/core';
import { QueryService } from './sqlserver-query.service';

@Component({
  selector: 'app-sqlserver-query',
  templateUrl: './sqlserver-query.component.html',
  styleUrls: ['./sqlserver-query.component.css']
})
export class SqlserverQueryComponent implements OnInit {

  param1: string;
  param2: string;

  constructor(private queryService: QueryService) { }

  ngOnInit() {

    this.queryService.getParameters()
      .subscribe((res: any) => {
        this.param1 = res.param1;
        this.param2 = res.param2;

        console.log(res.param2);
        console.log(res.param1);
      }, (err) => {
        alert('Faild to load data');
      });
  }
}


function parseObject(obj) {
  for (var key in obj) {
    console.log("key: " + key + ", value: " + obj[key])
    if (obj[key] instanceof Object) {
      parseObject(obj[key]);
    }
  }
}