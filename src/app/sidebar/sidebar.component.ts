import { Component, OnInit } from '@angular/core';
import { QuestionCreationService } from '../question-creation/question-creation.service';
import { authService } from '../auth.service';
import { Router } from '@angular/router';
import { ListComponent } from '../question-creation/list/list.component';
import { Location } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  action = '';
  userRole :any;
  title:string='';
  showCreator = false;

  constructor(private location: Location,private auth:authService,private listComponent: ListComponent, private QuestionAction:QuestionCreationService,private authService:authService,private router:Router) { }

  ngOnInit(): void {
    this.QuestionAction.Question.subscribe((res)=>{
      this.action = res.Mode;
    });
    this.userRole = this.authService.getUserRole();
    console.log("this.userrole",this.userRole)
    const authToken = this.auth.getAuthToken();
    if(this.userRole == 'Admin'){
      this.title = "Details";
      this.showCreator = true;
    }
    else{
      this.title = "Question";
      this.showCreator = false;
    }
  }

  homeBut(){
    this.router.navigate(['/dashboard']).then(() => {
      window.location.reload();
    });
  }

  question(){
    this.router.navigateByUrl('question-creation');
  }

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  getRoute(){
    if(this.userRole==='Creator' || this.userRole==='Curator' || this.userRole==='Admin'){
      return 'question-creation'
    }
    if(this.userRole==='Cre.Tra'){
      return 'question-creation-translation'
    }
    if(this.userRole==='Translate'){
      return 'question-translation'
    }
    if (this.userRole==='Teacher'){
      return 'user'
    }
    return ''
  }
}
