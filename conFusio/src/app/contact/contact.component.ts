import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder,FormGroup,Validator, Validators} from '@angular/forms';
import {Feedback , ContactType} from '../shared/feedback';
import { flyInOut ,expand } from '../animations/app.animation';
import { throws } from 'assert';
import {FeedbackService} from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations:[
   flyInOut(),
   expand()
  ],
  host : {
    '[@flyInOut]':'true',
     'style':'display:block'
  }
})
export class ContactComponent implements OnInit {

  @ViewChild("fform") feedbackFormDirective;
  feedbackForm : FormGroup;
  feedback : Feedback;
  contactType = ContactType;
  errorMsg : string;
  showForm : Boolean =  true; 
  isWaitingForResponse : Boolean = false;
  showPreview : Boolean = false;
  previewfeedback : Feedback;
  
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  }

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb:FormBuilder , private feedbackService : FeedbackService) { 
    this.createForm();
  }

  ngOnInit() {
  }

 
  

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      lastname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum: [0,[Validators.required,Validators.pattern]],
      email: ['',[Validators.required,Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); //(re)set form validation messages
  }

  onValueChanged(data?: any){

    if(!this.feedbackForm){
      return;
    }

    const form = this.feedbackForm;

    for(const field in this.formErrors){
        if(this.formErrors.hasOwnProperty(field)){
          this.formErrors[field] = '';
          const control = form.get(field);
          if(control && control.dirty && !control.valid){
            const messages = this.validationMessages[field];
            for(const key in control.errors){
              if(control.errors.hasOwnProperty(key)){
                this.formErrors[field] +=messages[key]+ ' '
              }
            }
          }

        }

    }

  }

  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.showForm = false;
    this.isWaitingForResponse = true;
    this.feedbackService.submitFeedback(this.feedback).subscribe(feedback => {
      this.previewfeedback = feedback;
      this.showPreview = true;
      this.isWaitingForResponse = false;
      setTimeout(()=>{
          this.showPreview = false;
          this.showForm = true;
          
          this.feedbackForm.reset({
            firstname:  '',
            lastname:  '',
            telnum:  0,
            email:  '',
            agree: false,
            contacttype: 'None',
            message: ''
        });
      
      // this.feedbackFormDirective.resetForm(); //this not required as *ngIf is used for form
                                                  
      },5000)
    }, errMsg => this.errorMsg = <any> errMsg);

  }

}
