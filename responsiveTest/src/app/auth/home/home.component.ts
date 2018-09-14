import { Component, OnInit } from '@angular/core';
import { EqUsgsService } from 'src/app/eq-service/eq-usgs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //-----------datos para los temblores ocurridos entre ayer y hoy----------

  earthquakes:any[];
  found:boolean=false;
  url:string = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&';
  magnitude:number = 0;
  today:string ='';
  yesterday:string='';
  query:string='';

  //--------- arreglo para los temblores mayores a 5 grados en el último mes--------------
  eqsGreaterThan5:any[];
  begMonth:string='';     //inicio del mes, today - 30 dias



  constructor(private eqService:EqUsgsService) { 
    this.getData();

  }

  ngOnInit() {
  }

  getData(){
    this.found = false;
    this.earthquakes=[];
    this.eqService.getYesterdayEqs()
    .subscribe(
      (data:any[]) => {
        data = data['features'];
        if(data.length){
          this.found = true;
          this.earthquakes=data;
          //console.log(data);
        }            
      }
    )
    this.eqService.getLast30GreaterThan5()
    .subscribe(
      (data:any[]) =>{
        data = data['features'];
        this.eqsGreaterThan5=data;
      }
    )
  }

  getToday(){
    var date  = new Date();
    var yesterday = new Date(date);
    yesterday.setDate(date.getDate() - 1);
    this.today = this.formatDate(date);
    this.yesterday = this.formatDate(yesterday);
  }

  getMonth(){
    var date = new Date();
    var lastMonth = new Date(date);
    lastMonth.setDate(date.getDate()-30);
    this.begMonth = this.formatDate(lastMonth);
  }
  formatDate(date:Date){
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();
    var month = '';
    var day = '';
    month = mm.toString();
    day = dd.toString();

    if(dd<10) {
        day = '0' + day
    } 

    if(mm<10) {
        month = '0'+month
    } 
    var finalDate = yyyy + '-' + month + '-' + day;
    return finalDate;
  }
  

}
