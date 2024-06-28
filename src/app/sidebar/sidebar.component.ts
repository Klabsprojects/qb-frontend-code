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
    if(this.userRole==='Admin'){
      // return 'question-creation'
      return 'question-creation-translation'
    }
    if(this.userRole==='Bil.Cre' || this.userRole==='Bil.Cur' || this.userRole==='Curator' || this.userRole === 'CUET.Cre' || this.userRole ==='CUET.Cur' || this.userRole ==='QApt.Cre' || this.userRole ==='QApt.Cur' || this.userRole ==='CAff.Cre' || this.userRole ==='CAff.Cur' || this.userRole ==='VAty.Cre' || this.userRole ==='VAty.Cur' || this.userRole ==='LVR.Cre' || this.userRole ==='LVR.Cur' || this.userRole ==='DApt.Cre' || this.userRole ==='DApt.Cur' || this.userRole ==='CLAT.Cre' || this.userRole ==='CLAT.Cur' || this.userRole ==='SCEng.Cre' || this.userRole ==='SCEng.Cur' || this.userRole==='Creator' || this.userRole === 'SCERT'){
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
  get_user_role(){
    let role = ""
    if(this.userRole==='Creator'){
      role = "Creator"
    }
    if(this.userRole === 'Bil.Cre' || this.userRole === 'CUET.Cre' || this.userRole ==='QApt.Cre' || this.userRole ==='CAff.Cre' || this.userRole ==='VAty.Cre' || this.userRole ==='LVR.Cre' || this.userRole ==='DApt.Cre' || this.userRole ==='CLAT.Cre' || this.userRole ==='SCEng.Cre'){
      role = "Bilingual Creator"
    }
    if(this.userRole === 'SCERT'){
      role = "SCERT Creator"
    }
    if(this.userRole === 'Translate'){
      role =  "Translator";
    }
    if(this.userRole === 'Teacher'){
      role =  "Teacher";
    }
    if(this.userRole==='Admin'){
      role = "Admin";
    }
    if(this.userRole==='Curator'){
      role = "Vettor";
    }
    if(this.userRole==='Bil.Cur' || this.userRole ==='CUET.Cur' || this.userRole ==='QApt.Cur' || this.userRole ==='CAff.Cur' || this.userRole ==='VAty.Cur' || this.userRole ==='LVR.Cur' || this.userRole ==='DApt.Cur' || this.userRole ==='CLAT.Cur' || this.userRole ==='SCEng.Cur'){
      role = "Bilingual Vettor";
    }
    return role;
  }
}
