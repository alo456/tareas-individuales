import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  eqForm: FormGroup;
  post:any;
  mag:number;
  startDate:string='';
  endDate:string='';
  url:string = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&';
  eqs:any[];
  found:boolean = false;
  query:string='';

  constructor(private fb: FormBuilder,private httpClient:HttpClient) { 
    this.buildForm();
  }
  
  buildForm(){
    this.eqForm = this.fb.group({
      Magnitud: ['', Validators.required],
      Inicio: ['', Validators.required],
      Fin: ['', Validators.required]
    });
  }

  addPost(post){
    this.mag = post.mag;
    this.startDate = post.startDate;
    this.endDate = post.endDate;
  }

  ngOnInit() {
  }

  submit(){
    this.mag = this.eqForm.get('Magnitud').value;
    this.startDate = this.eqForm.get('Inicio').value;
    this.endDate = this.eqForm.get('Fin').value;
    //console.log(this.mag);
    //console.log(this.startDate);
    //console.log(this.endDate);
    this.getData();
  }

  getData(){
    this.found = false;
    this.eqs=[];
    this.query = 'starttime='+ this.startDate + '&endtime=' + this.endDate + '&minmagnitude=' + this.mag;
    //console.log(this.query);
    this.httpClient.get(this.url+this.query+'&orderby=magnitude')
    .subscribe(
      (data:any[]) => {
        data = data['features'];
        if(data.length){
          this.found = true;
          this.eqs=data;
          console.log(data);
        }            
      }
    )
  }

}
