import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  magnitude:string = '';
  url:string = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2017-09-19&endtime=2017-09-20&minmagnitude=';
  earthquakes:any[];
  found:boolean=false;
  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
  }

  onNameKeyUp(event:any){
    this.magnitude = event.target.value;
  }
  getData(){
    this.found = false;
    this.earthquakes=[];
    this.httpClient.get(this.url+this.magnitude+'&orderby=magnitude')
    .subscribe(
      (data:any[]) => {
        data = data['features'];
        if(data.length){
          this.found = true;
          this.earthquakes=data;
          console.log(data);
        }            
      }
    )
  }

}
