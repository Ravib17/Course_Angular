import { Component, OnInit, Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    flyInOut(),
    expand()
  ],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  }
})
export class HomeComponent implements OnInit {

  dish:Dish;
  dishErrorMsg : string;
  promotion:Promotion;
  promotionErrorMesg : string;
  leader:Leader;
  leaderErrorMsg :string;

  constructor(private dishService:DishService , private promotionService:PromotionService,
    private leaderService:LeaderService , @Inject("BaseURL") private BaseURL) { }

  ngOnInit() {
    var component = this;
    this.dishService.getFeaturedDish().subscribe(function(dish){
     component.dish = dish;
    }, errMsg => this.dishErrorMsg = <any>errMsg);
   this.promotionService.getFeaturedPromotion().subscribe((promotion)=> this.promotion = promotion,
   errMsg => this.promotionErrorMesg = <any> errMsg );
   this.leaderService.getFeaturedLeader().subscribe((leader)=> this.leader = leader , 
   errMsg => this.leaderErrorMsg = <any> errMsg);
     
  }

}
