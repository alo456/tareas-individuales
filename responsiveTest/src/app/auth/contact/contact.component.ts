import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  eqForm: FormGroup;
  post:any;
  mag:number;
  startDate:string='';
  endDate:string='';


  constructor(fb: FormBuilder) { 
    this.eqForm = fb.group({
      'mag':[null, Validators.required],
      'startDate':[null, Validators.required],
      'endDate':[null, Validators.required]
    });
  }

  addPost(post){
    this.mag = post.mag;
    this.startDate = post.startDate;
    this.endDate = post.endDate;
  }

  ngOnInit() {
  }

}
