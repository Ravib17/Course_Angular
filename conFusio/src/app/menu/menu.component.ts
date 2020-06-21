import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import {DishService} from '../services/dish.service'
import { flyInOut, expand } from '../animations/app.animation'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations:[
    flyInOut(),
    expand()
  ],
  host : {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  }
})


export class MenuComponent implements OnInit {

  dishes: Dish[];
 // selectedDish: Dish;
  errorMsg : string;
  
  constructor(private dishService:DishService , @Inject('BaseURL') private BaseURL) { 

  }

  ngOnInit() {
     this.dishService.getDishes().subscribe((dishes)=> this.dishes = dishes, 
     errMsg => this.errorMsg = <any> errMsg);
  }

  // onSelectDish(dish: Dish){
  //   this.selectedDish = dish;
  // }

}
