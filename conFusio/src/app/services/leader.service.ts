import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import { of,observable, Observable} from 'rxjs';
import {delay, catchError , map} from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import {baseURL} from "../shared/baseurl";
import {ProcessHTTPMsgService} from "./process-httpmsg.service";
 
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient , private processsHttpMsgService:ProcessHTTPMsgService) { }

  getLeaders() : Observable<Leader[]>{
    // return new Promise ((resolve)=> {
    //   setTimeout(()=> resolve(LEADERS),2000);
    // });
   // return of(LEADERS).pipe(delay(2000));
   return this.http.get<Leader[]>(baseURL+'leadership')
   .pipe(catchError(this.processsHttpMsgService.handleError));
  }

  getLeader(id:string): Observable<Leader>{
    // return new Promise (function(resolve,rejecct){
    //   setTimeout(function(){
    //     resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
    //   },2000);
    // });
    //return of(LEADERS.filter((leader)=> leader.id === id)[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL+'leadership/'+id)
    .pipe(catchError(this.processsHttpMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader>{
    // return new Promise (function(resolve,rejecct){
    //   setTimeout(function(){
    //     resolve(LEADERS.filter((leader) => (leader.featured))[0]);
    //   },2000);
    // });
    //return  of(LEADERS.filter((leader)=> (leader.featured))[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL+'leadership?featured=true')
    .pipe(map(leaders => leaders[0])).pipe(catchError(this.processsHttpMsgService.handleError));
  }

}
