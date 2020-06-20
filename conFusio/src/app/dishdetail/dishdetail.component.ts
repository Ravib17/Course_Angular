import { Component, OnInit,Input , ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish'
import {DishService} from '../services/dish.service';
import {Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common'
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';
import {FormBuilder,FormGroup,Validator, Validators} from '@angular/forms';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
 
  @Input()
  dish:Dish ;
  dishIds : string[];
  prev : string;
  next : string;
  errorMsg : string;
  dishCopy : Dish ;

  @ViewChild("cform") commentFormDirective;

  commentForm : FormGroup;  //FormModel
  comment : Comment;        //DataModel
   

  formErrors={
    author:'',
    comment: ''
  }

  validationMessages={
    author: {
      'required':"Name is required",
      'minlength' : 'Name must be atleast 2 characters',
      'maxlength' : 'Name must be atmost 25 characters'
    },
    comment : {
      'required': 'Comment is required'
    }
  }

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location, private fb:FormBuilder ,
    @Inject("BaseURL") private baseURL ) {
      this.createForm();
     }

  createForm(){
    this.commentForm = this.fb.group({
      author:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      rating : [5,[Validators.required]],
      comment : ['',Validators.required]
    });

    this.commentForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any){
    if(!this.commentForm){
      return;
    }
    const form = this.commentForm;
    for( const field in this.formErrors){
       if(this.formErrors.hasOwnProperty(field)){
         this.formErrors[field]= '';
         const control = form.get(field);
         if(control && control.dirty && !control.valid){
           const messages = this.validationMessages[field];
           for(const key in control.errors){
             if(control.errors.hasOwnProperty(key)){
               this.formErrors[field] +=messages[key]+ ' '; 
             }
           }
         }

       }
    }

  }

  onSubmit(){
    //Mapping of form model to data model
    this.comment = new Comment();
    this.comment.author = this.commentForm.value.author;
    this.comment.rating = this.commentForm.value.rating;
    this.comment.comment = this.commentForm.value.comment;
    this.comment.date = (new Date()).toISOString();
    this.dishCopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishCopy)
    .subscribe(dish => { this.dish = dish ; this.dishCopy = dish},
      errMsg => {this.dish =null;  this.dishCopy = null; this.errorMsg = <any> errMsg});
    this.commentFormDirective.resetForm();
    
     this.commentForm.reset({
       author:'',
       rating:5,
       comment:''
     });
     //this.commentFormDirective.resetForm({rating:5});
    
  }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.dishCopy = dish; this.setPrevNext(dish.id); } , 
    errMsg=> this.errorMsg = <any>errMsg);
    //const id = this.route.snapshot.params['id'];
    // this.dishservice.getDish(id).subscribe((dish)=> this.dish =dish);


  }

  setPrevNext(dishId : string){
  
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length+index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds,length + index+1) % this.dishIds.length];

  }
  goBack(){
    this.location.back();
  }

}
