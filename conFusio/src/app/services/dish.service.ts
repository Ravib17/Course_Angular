import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { of, observable, Observable } from "rxjs";
import { map , catchError } from 'rxjs/operators';

import { HttpClient} from '@angular/common/http';
import {baseURL} from "../shared/baseurl";
import {ProcessHTTPMsgService} from "./process-httpmsg.service";

@Injectable({
  providedIn: 'root'
})

export class DishService {
  
   data:boolean = false;

  constructor(private http:HttpClient , private processHttpMsgService : ProcessHTTPMsgService ){ }

  getDishes() : Observable<Dish[]>{
    // if(this.data) {
    //   return Promise.resolve(DISHES);
    // }else {
    //   this.data = true;
    // return new Promise ((resolve) => {
    //   setTimeout(() => resolve(DISHES),2000);
    // });
  // }
    //return of(DISHES).pipe(delay(2000));
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }
  
  getDish(id:string): Observable<Dish>{
    
    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
    return this.http.get<Dish>(baseURL+'dishes/'+id).pipe(catchError(this.processHttpMsgService.handleError));
  }


  getFeaturedDish(): Observable<Dish>{
    //return of(DISHES.filter((dish) => (dish.featured))[0]).pipe(delay(2000));
    return this.http.get<Dish>(baseURL + 'dishes?featured=true')
    .pipe(map(dishes=>dishes[0])).pipe(catchError(this.processHttpMsgService.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    //return of(DISHES.map(dish => dish.id ));
    return this.getDishes().pipe(map(dishes=>dishes.map(dish=>dish.id)))
    .pipe(catchError(error => error));
  }

}
