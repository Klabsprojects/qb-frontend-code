import { Component, OnInit } from '@angular/core';
import { authService } from '../auth.service';
import { QuestionCreationService } from '../question-creation/question-creation.service';
import { DashboardData } from '../question-creation/question.model';
import { ChartConfiguration } from 'chart.js';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  dashboardData = new DashboardData();
  showAdmin = false;
  hideCurator = true;
  userRole:String='';
  constructor(private auth:authService,private questionService:QuestionCreationService) { }

  ngOnInit(): void {
    console.log('userRole',this.auth.getUserRole());
    this.userRole = this.auth.getUserRole()
    this.questionService.getDashboardDetails().subscribe(({
      next:(res:any)=>{
        const data: DashboardData[] = res.data;
        if (data && data.length > 0) {
          this.dashboardData = data[0];
          console.log("this.dashboardData",this.dashboardData)
        }
      }
    }));
    if(this.auth.getUserRole() == "Admin"){
      this.showAdmin = true;
    }
    else if(this.auth.getUserRole() == "Curator"){
      this.hideCurator = false;
    }
  }
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['February', 'March', 'April', 'May' ],
    datasets: [
      { data: [ 65, 59, 80, 81 ], label: 'Physics' },
      { data: [ 28, 48, 40, 19 ], label: 'Maths' },
      { data: [ 40, 28, 19, 59 ], label: 'Chemistry'},
      { data: [ 59, 80, 28, 19 ], label: 'Botony'},
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ 'JEE', 'NEET', 'FOUNDATION','CUET' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100,200 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  setTotal(value:any){
    this.pieChartDatasets = [{data:value}]
  }

}