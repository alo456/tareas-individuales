import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { EqUsgsService } from 'src/app/eq-service/eq-usgs.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  earthquakes:any[];
  found:boolean=false;
  query:string='';
  eqsGreaterThan5:any[];   
  chart = [];
  constructor(private eqService:EqUsgsService) { 
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    this.found = false;
    this.eqService.getLast30GreaterThan5()
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

        //console.log(allDates);
        //console.log(allEqMag);
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



}
