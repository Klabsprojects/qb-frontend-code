import { Component, OnInit } from '@angular/core';
import { List, addDetails, questionList } from '../question-translator.model';
import { authService } from 'src/app/auth.service';
import { NgForm } from '@angular/forms';
import { QuestionCreationService } from '../question-translator.service';


@Component({
  selector: 'app-list-translator',
  templateUrl: './list-translator.component.html',
  styleUrls: ['./list-translator.component.css']
})
export class ListtranslatorComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'type', 'details', 'translation', 'status', 'actions'];
  public dataSource: any[] = [];
  currentSort: { column: string, direction: string } = { column: '', direction: '' };
  allCheckboxesSelected = false;
  questionList: any[] = [];
  user: any;
  showButton: boolean = false;
  showAdd: boolean = false;
  userRole: any;
  list: List[] = [];
  addDetails: addDetails = new addDetails();
  detailId: number = 0;
  showCreator = false;
  showAdmin = false;
  checked = false;
  dropdownDataclass:any[] = [];
  dropdownDatasubject:any[] = [];
  dropdownDatachapter:any[] = [];
  dropdownDatalevel:any[]=[];
  dropdonwDatatype:any[]=[];
  selectedOptionclass: string = '';
  selectedOptionsubject: string = '';
  selectedOptionchapter: string = '';
  selectedOptionlevel:string = '';
  selectedOptiontype:string = '';
  p: number = 1;

  constructor(
    private auth: authService, 
    private questionService: QuestionCreationService, 
    private authService: authService
    ) { }

  ngOnInit(): void {
    this.questionService.getDetails().subscribe({
      next: (response: any) => {
        this.list = response.data;
        this.dropdownDataclass = this.getUniqueArray(this.list,'class');
        this.dropdownDatasubject = this.getUniqueArray(this.list,'subject');
        this.dropdownDatachapter = this.getUniqueArray(this.list,'chapter');
        this.dropdonwDatatype = this.getUniqueArray(this.list,'type');
        this.dropdownDatalevel = this.getUniqueArray(this.list,'difficulty');
        console.log("this.list",this.list)
      }
    });
    this.userRole = this.auth.getUserRole();
    console.log("userRole",this.userRole)
    const authToken = this.auth.getAuthToken();
    if (this.userRole == 'Translate') {
      this.showAdd = true;
      this.showButton = false;
      this.showAdmin = false;
      this.showCreator = true;
    }
    else if (this.userRole == 'TranslateCurator') {
      this.showAdd = false;
      this.showButton = true;
      this.showAdmin = false;
      this.showCreator = true;
    }
    else if (this.userRole == 'Admin') {
      this.showAdmin = true;
      this.showCreator = false;
    }
  }

  selectAllCheckbox(event: any): void {
    this.checked = event.target.checked;
    this.list.forEach(data => data.selected = this.checked);
   
  }


  view(index: any) {
    if (this.auth.getUserRole() == "Admin") {
      this.questionService.getQuestionDetail(index.ids).subscribe({
        next: (response: any) => {
          if (Array.isArray(response.data)) {
            response.data.forEach((question: any, i: any) => {
              this.questionService.Question.next({ Mode: 'VIEW', Index: index });
              this.questionService.setIndex(index);
            });
          }
        }
      });
    }
    else {
      console.log('index',index);
      this.questionService.getQuestionDetails(index.id).subscribe({
        next: (response: any) => {
          this.questionService.Question.next({ Mode: 'VIEW', Index: index.id });
          this.questionService.setIndex(index);
        }
      });
    }
  }


  edit(data: any) {
    this.questionService.srvStore = data;
    this.questionService.Question.next({ Mode: 'EDIT', Index: data.id });
  }



  wordDownload(): void {
    if (this.checked) {
      const selectedQuestionIds = this.list.filter((data) => data.selected).map((data) => data.id);

      console.log(selectedQuestionIds);
      this.questionService.getReport(selectedQuestionIds).subscribe({
        next: (res: any) => {
          const htmlContent = res.data.map((question: any, index: any) => `
            <p><strong>Question ${index + 1}:</strong> ${question.text}</p>
            <strong>Choices : </strong> 
            <div> 
            ${question.choices.map((choice: any) => `
              <div>${choice.choice_text}</div>
            `).join('')}
          </div>
          <p><strong>Correct Answer:</strong>${this.getCorrectAnswerText(question.choices)}</p>
          <br>
          `).join('');

          // Create a new Blob containing the HTML content
          const blob = new Blob([`<!DOCTYPE html><html><body>${htmlContent}</body></html>`], {
            type: 'application/msword',
          });

          // Create a link element to trigger the download
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'questions.doc';

          // Append the link to the document and trigger the download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
      });
    } else {
      console.log('Please select all checkboxes before downloading.');
    }
  }

  getCorrectAnswerText(choices: any) {
    const correctChoice = choices.find((choice: { choice_correct_yn: any; }) => choice.choice_correct_yn);

    if (correctChoice) {
      return correctChoice.choice_text;
    } else {
      return 'Correct answer not available';
    }
  }



  singlewordDownload(index: any) {
    this.questionService.getReport(index).subscribe({
      next: (res: any) => {
        const htmlContent = res.data.map((question: any, index: any) => `
            <p><strong>Question ${index + 1}:</strong> ${question.text}</p>
            <strong>Choices : </strong> 
            <div> 
            ${question.choices.map((choice: any) => `
              <div>${choice.choice_text}</div>
            `).join('')}
          </div>
          <p><strong>Correct Answer:</strong> ${question.choices.find((choice: any) => choice.choice_correct_yn)?.choice_text}</p>
            <br>
          `).join('');

        // Create a new Blob containing the HTML content
        const blob = new Blob([`<!DOCTYPE html><html><body>${htmlContent}</body></html>`], {
          type: 'application/msword',
        });

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'questions.doc';

        // Append the link to the document and trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    });

  }

  // wordDownload(): void {
  //   if (this.allCheckboxesSelected) {
  //     const selectedQuestionIds = this.questionList.filter((data) => data.selected).map((data) => data.q_id);
  //     this.questionService.getReport(selectedQuestionIds).subscribe(({
  //       next:(res:any)=>{
  //         console.log(res.data);
  //         const htmlContent = res.data.map((question:any, index:any) => `
  //         <p><strong>Question ${index + 1}:</strong> ${question.text}</p>
  //         <p><strong>Choices : </strong> ${question.q_id}</p>
  //         <div style="column-count: 2;">
  //           <ul>
  //             ${question.choices.map((choice:any, choiceIndex:any) => `<li style="list-style-type: none; padding: 0; margin: 0;">${choiceIndex + 1}. ${choice.choice_text}</li>`).join('')}
  //           </ul>
  //         </div>
  //         <p><strong>Correct Answer:</strong> ${question.choices.find((choice:any) => choice.choice_correct_yn)?.choice_text}</p>
  //         <br>
  //       `).join('');

  //       const blob = new Blob([`<!DOCTYPE html><html><body>${htmlContent}</body></html>`], {
  //         type: 'application/msword',
  //       });
  //       const link = document.createElement('a');
  //       link.href = URL.createObjectURL(blob);
  //       link.download = 'questions.doc';
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       }
  //     }))
  //   } else {
  //     console.log('Please select all checkboxes before downloading.');
  //   }
  // }





  pdfDownload() {
    const selectedQuestionIds = this.questionList
      .filter((data) => data.selected)
      .map((data) => data.ids);
    console.log(selectedQuestionIds.length);
    if (this.checked && selectedQuestionIds.length > 0) {
      this.questionService.getPdfReport(selectedQuestionIds).subscribe(
        (response) => {
          this.questionService.generatePdf(response.data);
        },
        (error) => {
          console.error('Error downloading PDF file', error);
        }
      );
    } else {
      alert('Please select at least one checkbox before downloading.');
    }
  }


  singlepdfDownload(index: any) {
    const selectedQuestionId = this.questionList
      .filter((data) => data.selected)
      .map((data) => data.ids);
    this.questionService.getPdfReport(selectedQuestionId).subscribe(
      (response) => {
        console.log(response.data);
        this.questionService.generatePdf(response.data);
      },
      (error) => {
        console.error('Error downloading PDF file', error);
      }
    );

  }

  latestTimestamp(data: any){
    // var submittedTimestamp = 0;
    // var rejectedTimestamp = 0;
    // var vettedTimestamp = 0;
  
    // if (data) {
    //   if (data.submitted) {
    //     submittedTimestamp = new Date(data.submitted)?.getTime() || 0;
    //   }
  
    //   if (data.rejected) {
    //     rejectedTimestamp = new Date(data.rejected)?.getTime() || 0;
    //   }
  
    //   if (data.vetted) {
    //     vettedTimestamp = new Date(data.vetted)?.getTime() || 0;
    //   }
    // }
  
    // if (submittedTimestamp > rejectedTimestamp && submittedTimestamp > vettedTimestamp || data.submitted=='Just Now') {
    //   return "Submitted";
    // } else if (rejectedTimestamp > vettedTimestamp && rejectedTimestamp >submittedTimestamp) {
    //   return "Rejected";
    // } else if (vettedTimestamp > rejectedTimestamp && vettedTimestamp > submittedTimestamp){
    //   return "Approved"
    // }
    // else if (data.submit==='yes'){
    //   return "Submitted"
    // }
    // else{
    //   return ""
    // }
    var result=""
    if(data.approved){
      result = "Approved"
    }
    else if (data.vetted&&!data.translated){
      result = "Waiting for Translation"
    }
    else if (data.vetted&&data.translated){
      result ="Submitted"
    }
    return result
  }

  latestTimestampcurator(data: any):string{
    if(data.vetted){
      return "Approved"
    }
    if(data.submitted){
      return "Submitted"
    }
    return ""
  }
  

  returndummy(data: any) {
    return data
  }

  getUniqueArray(data: any[],value:any){
    return Array.from(new Set(data.map(item => item[value])));
  }
}

