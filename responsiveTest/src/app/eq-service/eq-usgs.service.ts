import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EqUsgsService {
  base:string = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&';
  query:string = '';
  today:string ='';
  begMonth:string='';
  yesterday:string='';
  tomorrow:string='';
  constructor(private httpClient:HttpClient) {
    this.getToday();
    this.getMonth();
      
   }
getLast30GreaterThan5(){
  this.query = this.base + 'starttime='+ this.begMonth + '&endtime=' + this.today + '&minmagnitude=5&orderby=time-asc';
  return this.httpClient.get(this.query);
}

getYesterdayEqs(){
  this.query = this.base+'starttime='+ this.yesterday + '&endtime=' + this.today + '&minmagnitude=' + '0';
  return this.httpClient.get(this.query);
}

getCustomSearch(begin:string, end:string, mag:number){
  this.query = this.base + 'starttime='+ begin + '&endtime=' + end + '&minmagnitude=' + mag;
  return this.httpClient.get(this.query);
}

getToday(){
  var date  = new Date();
  var yesterday = new Date(date);
  var tomorrow = new Date(date);
  yesterday.setDate(date.getDate() - 1);
  tomorrow.setDate(date.getDate() + 1);
  this.today = this.formatDate(date);
  this.yesterday = this.formatDate(yesterday);
  this.tomorrow = this.formatDate(tomorrow);
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
