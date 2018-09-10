import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  earthquakes:any[];
  found:boolean=false;
  url:string = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&';
  today:string ='';
  yesterday:string='';
  query:string='';
  eqsGreaterThan5:any[];
  begMonth:string='';    
  chart = [];
  constructor(private httpClient:HttpClient) { 
    this.getToday();
    this.getMonth();
    this.getData();
  }



  ngOnInit() {
  }

  getData(){
    this.found = false;
    this.query = 'starttime='+ this.begMonth + '&endtime=' + this.today + '&minmagnitude=5&orderby=time-asc';
    this.httpClient.get(this.url+this.query)
    .subscribe(
      (data:any[]) =>{
        data = data['features'];
        console.log(data);
        let allEqMag = [];
        let allDates = [];
        data.forEach((magn) =>{
          allEqMag.push(magn['properties'].mag);
        })

        data.forEach((res) =>{
          let dt = res['properties'].time;
          let pl = res['properties'].place;
          let jsdate = new Date(dt)
          allDates.push(pl + ". " + jsdate.toLocaleTimeString('sp',{year: 'numeric', month: 'short', day:'numeric'}));
        })

        console.log(allDates);
        console.log(allEqMag);
        this.chart = new Chart('canvas',{
          type:'line',
          data:{
            labels:allDates,
            datasets:[{
              data: allEqMag,
              borderColor: '#3cba9f',
              fill:false
            }]
          },
          options: {
            legend:{
              display:false,
              labels: {
                fontColor: 'rgb(255, 99, 132)'
                
            }
            },
            scales:{
              xAxes:[{
                display:false
              }],
              yAxes:[{
                display:true
              }]
            }
          }
        })

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
