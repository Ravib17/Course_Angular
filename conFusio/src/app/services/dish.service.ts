import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import  { DISHES} from '../shared/dishes';
import { of, observable, Observable } from "rxjs";
import {delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DishService {
  
   data:boolean = false;

  constructor() { }

  getDishes() : Observable<Dish[]>{
    // if(this.data) {
    //   return Promise.resolve(DISHES);
    // }else {
    //   this.data = true;
    // return new Promise ((resolve) => {
    //   setTimeout(() => resolve(DISHES),2000);
    // });
  // }
    return of(DISHES).pipe(delay(2000));
  }
  
  getDish(id:string): Observable<Dish>{
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }


  getFeaturedDish(): Observable<Dish>{
    return of(DISHES.filter((dish) => (dish.featured))[0]).pipe(delay(2000));
  }

  getDishIds(): Observable<string[] | any> {
    console.log("here")
    return of(DISHES.map(dish => dish.id ));
  }

}
