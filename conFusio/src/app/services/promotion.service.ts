import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import {PROMOTIONS} from '../shared/promotions';

import { of, Observable } from "rxjs";
import { delay , map, catchError} from "rxjs/operators";

import { HttpClient} from '@angular/common/http';
import {baseURL} from "../shared/baseurl";
import {ProcessHTTPMsgService} from "./process-httpmsg.service";
        

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient , private processHTTPMesgService : ProcessHTTPMsgService ) { }

  getPromotions(): Observable<Promotion[]> {
    // return new Promise(resolve => {
    //   setTimeout(()=> resolve(PROMOTIONS),2000);
    // });
    //return of(PROMOTIONS).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseURL+'promotions')
    .pipe(catchError(this.processHTTPMesgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    // return new Promise(resolve => {
    //   setTimeout(()=> resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]),2000);
    // });

    //return of(PROMOTIONS.filter(promotion => (promotion.id === id))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL+'promotions/'+id)
    .pipe(catchError(this.processHTTPMesgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return  new Promise(resolve => {
    //   setTimeout(()=> resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),2000);
    // });
    //return of(PROMOTIONS.filter(promotion => (promotion.featured))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(baseURL+'promotions?featured=true')
    .pipe(map(promotions => promotions[0])).pipe(catchError(this.processHTTPMesgService.handleError));
  }
  
}
