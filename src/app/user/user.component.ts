import { Component, OnInit } from '@angular/core';
import { shared } from './shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private shared:shared) { }
  public Exam_types:string[]=['JEE','NEET','Foundation'];
  public Classes:string[]=[];
  public Subjects:string[]=[];
  public Levels:string[]=['Easy','Medium','Hard'];
  public Question_types:string[]=['MCQ','MSQ','Fill in the Blanks'];
  public Chapters:string[]=[];
  public Topics:string[]=[];

  ngOnInit(): void {
  }
  selectClass(event:any) {
    this.Classes = this.shared.class_options[event.target.value]
  }
  selectSubject(event:any){
    this.Subjects = this.shared.selectsubject[event.target.value]
  }
  selectChapter(event:any){
    // this.shared.getchapter()
  }

}
