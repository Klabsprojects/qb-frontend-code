import { Component, OnInit } from '@angular/core';
import { QuestionCreationService } from './question-creation-translator.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question-creation-translator',
  templateUrl: './question-creation-translator.component.html',
  styleUrls: ['./question-creation-translator.component.css']
})
export class QuestionCreationTranslatorComponent implements OnInit {
  action='';
  constructor(public QuestionAction:QuestionCreationService,private router: Router,private route: ActivatedRoute) {
   
   }

  ngOnInit(): void {
    this.QuestionAction.Question.subscribe((res)=>{
      this.action = res.Mode;
    })
  }

}
