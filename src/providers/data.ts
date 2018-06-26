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

  filterByCity(id, tours){
    if (id==''){
      return [];
    }
    return tours.filter((item) => {

      return item.city == id;

    });
  }

  filterByBuddy(id, tours){
    if (id==''){
      return [];
    }
    return tours.filter((item) => {

      return item.buddy == id;

    });
  }

  filterById(id, buddies){
    if (id==''){
      return [];
    }
    return buddies.filter((item) => {

      return item.profile.id == id;

    });
  }

  // filterByCityBuddy(id, tours){
  //   console.log(tours);
  //   if (id==''){
  //     return [];
  //   }
  //   return tours.filter((item) => {
  //     console.log(item.profile);
  //     return item.city == id;
  //
  //   });
  // }

}
