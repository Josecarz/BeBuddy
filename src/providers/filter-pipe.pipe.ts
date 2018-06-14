import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {HomePage} from "../pages/home/home";
// import {Customer} from '../services/Customer';

@Pipe({
  name: 'customerSearchFilter'
})
@Injectable()
export class CustomerSearchFilter implements PipeTransform {
  hola: string = '';
  transform(sites: HomePage[], args: string): any {
/*
    return recipes.filter(item =>{
       console.log(item);
       return this.hola == item.user;
    }
       //console.log(this.hola)
    ) ;
*/
console.log(args);
     return sites.filter(item => {
       if (!item.user){
         return false
       } else {
         return item.user.toLowerCase().indexOf(args.toLowerCase()) !== -1;

       }
     });
  };
}
