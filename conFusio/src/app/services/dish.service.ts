import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import  { DISHES} from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})

export class DishService {
  
   data:boolean = false;

  constructor() { }

  getDishes() : Promise<Dish[]>{
    console.log(this);
    if(this.data) {
      return Promise.resolve(DISHES);
    }else {
      this.data = true;
    return new Promise ((resolve) => {
      setTimeout(() => resolve(DISHES),2000);
    });
  }
  }
  
  getDish(id:string): Promise<Dish>{
    return new Promise ((resolve) => {
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]),2000);
    });
  }

  getFeaturedDish(): Promise<Dish>{
    return new Promise ((resolve) => {
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.featured))[0]),2000);
    });
  }

}
