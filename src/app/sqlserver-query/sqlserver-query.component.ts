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
  //parametersList: Parameter[];

  //public parametersList: { parmName: string, paramValue: string }[] = parameters;

  constructor(private queryService: QueryService) { }

  ngOnInit() {
    //this.param1 =  this.parametersList[0].paramValue;

    //console.log('----------> ' +  parameters("param1") );

    this.queryService.getParameters()
      .subscribe((res: any) => {

        parseObject(res);

        //this.parametersList = res;
        console.log(res);
        console.log(res['param1']);
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