import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { QuestionCreationService } from '../question-creation-translator.service';
import { List, QuestionApprove } from '../question-translator.model';
import { authService } from 'src/app/auth.service';
import { NgForm } from '@angular/forms';
import * as CustomEditor from '../../../assets/ckeditor.js';

@Component({
  selector: 'app-view-translator',
  templateUrl: './view-translator.component.html',
  styleUrls: ['./view-translator.component.css']
})
export class ViewTranslatorComponent implements OnInit {
  currentIndex: number = -1;
  question: any;
  questions: any;
  questionAndAnswer = [];
  List = new List();
  choices: any;
  choiceTextArray: any;
  choiceTextArray_tn:any;
  answer: any;
  correct: any;
  correct_tn: any;
  correctimg: any;
  correctsolutionimg: any;
  correctsolutionimg_tn:any;
  correctimg_tn: any;
  correctimgselect: any[] = []
  correctimgselect_tn:any[] = []
  choice_note: any;
  correctChoice: any[] = [];
  correctChoice_tn: any[] = []
  showComments = false;
  commentTextModel: string = '';
  questionApprove = new QuestionApprove();
  showApprove = false;
  userRole = '';
  uniqueTypes: string[] = [];
  choice_note_tn: any;
  difficulty:string='';
  // quesimg:string=""
  ClassicEditor: any;
  public Editor: any = CustomEditor;
  showQuestionEditor: boolean = true;
  public config: any = {
    toolbar: ['heading', 'bold', 'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'undo',
      'redo', 'MathType', 'ChemType'],
    language: 'en'
  };
  hello:string = "Helloboss";


  constructor(private cdr: ChangeDetectorRef, private auth: authService, private questionService: QuestionCreationService, private questionAction: QuestionCreationService) { }

  ngOnInit(): void {
    this.userRole = this.auth.getUserRole();
    console.log("userrole", this.userRole)
    if (this.auth.getUserRole() == "Curator" || this.auth.getUserRole()== 'Bil.Cur') {
      this.showComments = true;
    }
    this.questionService.Question.subscribe((index) => {
      this.questionService.getQuestionDetails(index.Index).subscribe({
        next: (response: any) => {
          this.question = response.data;
          console.log("question", this.question)
          // if (this.question.img){
          //   this.quesimg = "data:image/jpg;base64,"+this.question.img
          // }
          if (this.question.remarks) {
            this.question.remarks = this.remark(this.question.remarks)
          }
          this.cdr.detectChanges();
          this.choiceTextArray = this.question.choices.map((choice: { choice_text: any; }) => choice.choice_text);
          this.choiceTextArray_tn = this.question.choices.map((choice: { choice_text_tn: any; }) => choice.choice_text_tn);
          const choices = this.question.choices;
          if (this.question.format == 1) {
            this.answer = choices
              .filter((choice: { choice_correct_yn: null; }) => choice.choice_correct_yn !== null)
              .map((choice: { choice_correct_yn: any; }) => choice.choice_correct_yn);
            if (this.answer.length > 0) {
              const correctChoiceIndex = this.answer[0];
              if (correctChoiceIndex === 0 && choices.length > 0) {
                this.correct = choices[0].choice_text;
                this.correct_tn = choices[0].choice_text_tn
                this.choice_note = choices[0].choice_notes;
                this.choice_note_tn = choices[0].choice_notes_tn;
                this.correctimg = choices[0].choice_img;
                this.correctsolutionimg = choices[0].choice_notes_img
                this.correctsolutionimg_tn = choices[0].choice_notes_img_tn
                this.correctimg_tn = choices[0].choice_img_tn;
              } else if (correctChoiceIndex === 1 && choices.length > 0) {
                this.correct = choices[1].choice_text;
                this.correct_tn = choices[1].choice_text_tn
                this.choice_note = choices[1].choice_notes;
                this.choice_note_tn = choices[1].choice_notes_tn;
                this.correctimg = choices[1].choice_img;
                this.correctsolutionimg = choices[1].choice_notes_img
                this.correctsolutionimg_tn = choices[1].choice_notes_img_tn
                this.correctimg_tn = choices[1].choice_img_tn;
              } else if (correctChoiceIndex === 2 && choices.length > 0) {
                this.correct = choices[2].choice_text;
                this.correct_tn = choices[2].choice_text_tn
                this.choice_note = choices[2].choice_notes;
                this.choice_note_tn = choices[2].choice_notes_tn;
                this.correctimg = choices[2].choice_img;
                this.correctsolutionimg = choices[2].choice_notes_img
                this.correctsolutionimg_tn = choices[2].choice_notes_img_tn
                this.correctimg_tn = choices[2].choice_img_tn;
              } else if (correctChoiceIndex === 3 && choices.length > 0) {
                this.correct = choices[3].choice_text;
                this.correct_tn = choices[3].choice_text_tn
                this.choice_note = choices[3].choice_notes;
                this.choice_note_tn = choices[3].choice_notes_tn;
                this.correctimg = choices[3].choice_img;
                this.correctsolutionimg = choices[3].choice_notes_img
                this.correctsolutionimg_tn = choices[3].choice_notes_img_tn
                this.correctimg_tn = choices[3].choice_img_tn;
              }
              else {
                console.log("Invalid answer index or choices array is not long enough");
              }
              console.log("crctimgleng", this.correctimgselect)
            } else {
              console.log("No correct choices found");
            }
          }
          else if (this.question.format == 2) {
            const correctChoices = choices
              .filter((choice: any) => choice.choice_correct_yn !== null)
              .map((choice: any) => choice.choice_text);

            const correctChoices_tn = choices
              .filter((choice: any) => choice.choice_correct_yn_tn !== null)
              .map((choice: any) => choice.choice_text_tn);
            
            const correctimgchoice = choices
            .filter((choice: any) => choice.choice_correct_yn !== null)
            .map((choice: any) => choice.choice_img);

            const correctimgchoice_tn = choices
            .filter((choice: any) => choice.choice_correct_yn_tn !== null)
            .map((choice: any) => choice.choice_img_tn);

            if (correctChoices_tn.length > 0) {
              this.correctChoice_tn = correctChoices_tn;
            }

            if (correctChoices.length > 0) {
              this.correctChoice = correctChoices;
            }

            if (correctimgchoice_tn.length > 0){
              this.correctimgselect_tn = correctimgchoice_tn
            }

            if (correctimgchoice.length > 0){
              this.correctimgselect = correctimgchoice
            }

          }
          else if (this.question.format == 3) {
            const allChoices = choices.map((choice: any) => choice.choice_text);
            this.correctChoice = allChoices;
          }

        }
      })
    });

    if (this.auth.getUserRole() == "Admin") {

      this.questionService.Question.subscribe((res: any) => {
        const viewIndex = res.Index;
        this.questionService.getReport(viewIndex.ids).subscribe({
          next: (response: any) => {
            this.question = response.data;
            console.log("admin question", this.question);
            if (this.questions) {
              // Populate the unique types list
              this.uniqueTypes = Array.from(new Set(this.questions.map((question: { type: any; }) => question.type)));
            }

            this.question.map((question: { choices: any[]; }) => {
              const choices = question.choices.map(choice => choice.choice_text);
              // console.log(choices);
            });



            // this.choiceTextArray = this.question.choices.map((choice: { choice_text: any; }) => choice.choice_text);
            const choices = this.question.choices;

            if (this.question.format == 1) {
              this.answer = choices
                .filter((choice: { choice_correct_yn: null; }) => choice.choice_correct_yn !== null)
                .map((choice: { choice_correct_yn: any; }) => choice.choice_correct_yn);

              if (this.answer.length > 0) {
                const correctChoiceIndex = this.answer[0];
                if (correctChoiceIndex === 0 && choices.length > 0) {
                  this.correct = choices[0].choice_text;
                  this.choice_note = choices[0].choice_notes;
                } else if (correctChoiceIndex === 1 && choices.length > 0) {
                  this.correct = choices[1].choice_text;
                  this.choice_note = choices[1].choice_notes;
                } else if (correctChoiceIndex === 2 && choices.length > 0) {
                  this.correct = choices[2].choice_text;
                  this.choice_note = choices[2].choice_notes;
                } else if (correctChoiceIndex === 3 && choices.length > 0) {
                  this.correct = choices[3].choice_text;
                  this.choice_note = choices[3].choice_notes;
                }
                console.log("this.choice_note", this.choice_note)
              }
            }
            else if (this.question.format == 2) {
              const correctChoices = choices
                .filter((choice: any) => choice.choice_correct_yn !== null)
                .map((choice: any) => choice.choice_text);

              if (correctChoices.length > 0) {
                this.correctChoice = correctChoices;
              }
            }
            else if (this.question.format == 3) {
              const allChoices = choices.map((choice: any) => choice.choice_text);
              this.correctChoice = allChoices;

              const allChoices_tn = choices.map((choice: any) => choice.choice_text_tn);
              this.correctChoice_tn = allChoices_tn;

            }

          }
        })
      });
    }

  }

  back() {
    this.questionAction.Question.next({ Mode: 'LIST' });
  }

  remark(json: any) {
    try {
      const parsedData = JSON.parse(json);
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        const notesValue = parsedData[0].notes;
        return notesValue ? notesValue : ''; // Return the value or an empty string if "notes" is undefined
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
    return '';
  }

  approve(questionId: any,difficulty:any) {
    const confirmation = confirm('Are you sure you want to approve?');

    if (confirmation) {
      const approvalData = { vetted: "yes", difficulty: difficulty};

      this.questionAction.getApprove(questionId, approvalData).subscribe({
        next: (res: any) => {
          alert("Approved Successfully");
          this.questionAction.Question.next({ Mode: 'LIST' });
        },
        error: (error: any) => {
          console.error('Error approving question:', error);
        }
      });
    } else {
      // User canceled the confirmation
      console.log('Approval canceled');
    }
  }

  reject(questionId: any, comment: string) {
    const confirmation = confirm('Are you sure you want to reject?');

    if (confirmation) {
      const approvalData = { "vetting-reject": "yes", "vetting-comment": comment };

      this.questionAction.getApprove(questionId, approvalData).subscribe({
        next: (res: any) => {
          console.log("Rejected response", res)
          alert("Rejected Successfully");
          this.questionAction.Question.next({ Mode: 'LIST' });
        },
        error: (error: any) => {
          console.error('Error rejecting question:', error);
        }
      });
    } else {
      // User canceled the confirmation
      console.log('Approval canceled');
    }
  }






  comment(data: NgForm) {
    console.log(data);
  }

  latestTimestamp(data: any): string {
    console.log("data", data)
    var submittedTimestamp = 0;
    var rejectedTimestamp = 0;
    var vettedTimestamp = 0;

    if (data) {
      if (data.submitted) {
        submittedTimestamp = new Date(data.submitted)?.getTime() || 0;
      }

      if (data.rejected) {
        rejectedTimestamp = new Date(data.rejected)?.getTime() || 0;
      }

      if (data.vetted) {
        vettedTimestamp = new Date(data.vetted)?.getTime() || 0;
      }
    }

    if (submittedTimestamp > rejectedTimestamp && submittedTimestamp > vettedTimestamp || data.submitted == 'Just Now') {
      return "submitted";
    } else if (rejectedTimestamp > vettedTimestamp && rejectedTimestamp > submittedTimestamp) {
      return "rejected";
    } else if (vettedTimestamp > rejectedTimestamp && vettedTimestamp > submittedTimestamp) {
      return "Approved"
    }
    else {
      return ""
    }
  }

  choicenotejoin(data: any): string {
    return data.choices
      .map((choice: { choice_notes: string | null }) => choice.choice_notes)
      .filter((choiceNote: string | null) => choiceNote !== null)
      .join(', ');
  }

  choicenotejoin_tn(data: any):string{
    return data.choices
    .map((choice: { choice_notes_tn: string | null }) => choice.choice_notes_tn)
    .filter((choiceNote_tn: string | null) => choiceNote_tn !== null)
    .join(', ');
  }

}
