import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionCreationService } from './question-translator.service';

@Component({
  selector: 'app-question-translator',
  templateUrl: './question-translator.component.html',
  styleUrls: ['./question-translator.component.css']
})
export class QuestionTranslatorComponent implements OnInit {
  action='';
  constructor(public QuestionAction:QuestionCreationService,private router: Router,private route: ActivatedRoute) {
   
   }

  ngOnInit(): void {
    this.QuestionAction.Question.subscribe((res)=>{
      this.action = res.Mode;
    })
  }

}
