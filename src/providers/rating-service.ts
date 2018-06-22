import {Injectable} from '@angular/core';
import {DbApiService} from "./db-api.service";

@Injectable()
export class RatingService {

  lock: any;

  constructor(private dbapi: DbApiService) {
  }


  onModelChange($event, item, selector: string){
    if(!item.votes){
      item.votes = 1;
      item.points = item.rate;
      item.rate = item.rate;
    }else{
      item.votes++;
      item.points += item.rate;
      item.rate = item.points/item.votes;

    }
    this.lock=true;
    //hay que subirlo a firebase
    if(selector == 'tour') {
      this.dbapi.pushTour(item);
    }

    if(selector == 'user') {
      let id = item.id;
      delete item.id;
      this.dbapi.pushUserRating(id, item);
    }
  }
}
