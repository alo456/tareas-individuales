import { Component, OnInit } from '@angular/core';
import { EqUsgsService } from 'src/app/eq-service/eq-usgs.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
;
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
  eqs:any[];
  found:boolean = false;
  query:string='';
  message:string='';

  
  latitude:number = 17.0654200;
  longitude:number = -96.7236500;

  today:string =this.eqService.today;
  tomorrow:string=this.eqService.tomorrow;

  constructor(private fb: FormBuilder,private eqService:EqUsgsService) { 
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
    this.message = '';
    //console.log(this.query);
    this.eqService.getCustomSearch(this.startDate, this.endDate, this.mag)
    .subscribe(
      (data:any[]) => {
        data = data['features'];
        if(data.length){
          this.found = true;
          this.eqs=data;
          console.log(data);
        }
        else this.message = "No se encontraron resultados :(";            
      }
    )
  }


}
