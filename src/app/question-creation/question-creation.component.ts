import { Component, OnInit } from '@angular/core';
import { QuestionCreationService } from './question-creation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question-creation',
  templateUrl: './question-creation.component.html',
  styleUrls: ['./question-creation.component.css']
})
export class QuestionCreationComponent implements OnInit {
  action='';
  constructor(public QuestionAction:QuestionCreationService,private router: Router,private route: ActivatedRoute) {
   
   }

  ngOnInit(): void {
    this.QuestionAction.Question.subscribe((res)=>{
      this.action = res.Mode;
    })
  }

}
