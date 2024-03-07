import { Component, OnInit } from '@angular/core';
import { authService } from '../auth.service';
import { QuestionCreationService } from '../question-creation/question-creation.service';
import { DashboardData } from '../question-creation/question.model';

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

}