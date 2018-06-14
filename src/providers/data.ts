import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {DbApiService} from "./db-api.service";

@Injectable()
export class DataProvider {

  items: any;
  recipes: any;

  constructor(public http: Http,  private dbapi: DbApiService,) {

  }

  filterItems(searchTerm, recipes){
    if (searchTerm==''){
      return [];
    }
    return recipes.filter((item) => {

      console.log('data TS' + item);
      if (!item.name) {
        return false
      } else {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    }
    });



  }

}
