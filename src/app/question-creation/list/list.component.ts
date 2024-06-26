import { Component, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { List, addDetails, questionList } from '../question.model';
import { QuestionCreationService } from '../question-creation.service';
import { authService } from 'src/app/auth.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [
    'sno',
    'type',
    'details',
    'translation',
    'status',
    'actions',
  ];
  public dataSource: any[] = [];
  currentSort: { column: string; direction: string } = {
    column: '',
    direction: '',
  };
  allCheckboxesSelected = false;
  questionList: any[] = [];
  user: any;
  loading: boolean = false;
  showButton: boolean = false;
  showAdd: boolean = false;
  userRole: any | undefined;
  subject: any;
  list: List[] = [];
  addDetails: addDetails = new addDetails();
  detailId: number = 0;
  showCreator = false;
  showAdmin = false;
  checked = false;
  dropdownDataclass: any[] = [];
  dropdownDatasubject: any[] = [];
  dropdownDatachapter: any[] = [];
  dropdownDatalevel: any[] = [];
  dropdonwDatatype: any[] = [];
  ////////
  public uniqueType: any[] = [];
  public uniqueClass: any[] = [];
  public uniqueMedium: any[] = [];
  public uniqueSubject: any[] = [];
  public uniqueChapter: any[] = [];
  public uniqueTopic: any[] = [];
  public uniqueLevel: any[] = [];
  public uniqueStatus: any[] = [];
  @ViewChild('dt') dt!: any;
  ///////
  selectedOptionclass: string = '';
  selectedOptionsubject: string = '';
  selectedOptionchapter: string = '';
  selectedOptionlevel: string = '';
  selectedOptiontype: string = '';
  recordsPerPage: number = 10;
  currentPage: number = 1;
  p: number = 1;
  constructor(
    private auth: authService,
    private questionService: QuestionCreationService,
    private authService: authService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subject = this.authService.getUserSubject();
    console.log('type of', this.subject);
    if (
      this.subject === 'undefined' ||
      !this.subject ||
      this.subject != 'Physics' ||
      this.subject != 'Chemistry' ||
      this.subject != 'Maths' ||
      this.subject != 'Zoology' ||
      this.subject != 'Biology'
    ) {
      this.questionService.getDetails().subscribe({
        next: (response: any) => {
          this.list = response.data;
          this.addstatus();
          this.create_dropdown_oninit();
          this.dropdownDataclass = this.getUniqueArray(this.list, 'class');
          this.dropdownDatasubject = this.getUniqueArray(this.list, 'subject');
          this.dropdownDatachapter = this.getUniqueArray(this.list, 'chapter');
          this.dropdonwDatatype = this.getUniqueArray(this.list, 'type');
          this.dropdownDatalevel = this.getUniqueArray(this.list, 'difficulty');
        },
      });
    } else {
      this.questionService.getDetails_filter(this.subject).subscribe({
        next: (response: any) => {
          this.list = response.data;
          this.addstatus();
          this.create_dropdown_oninit();
          this.dropdownDataclass = this.getUniqueArray(this.list, 'class');
          this.dropdownDatasubject = this.getUniqueArray(this.list, 'subject');
          this.dropdownDatachapter = this.getUniqueArray(this.list, 'chapter');
          this.dropdonwDatatype = this.getUniqueArray(this.list, 'type');
          this.dropdownDatalevel = this.getUniqueArray(this.list, 'difficulty');
        },
      });
    }
    this.userRole = this.auth.getUserRole();
    console.log(this.userRole);
    const authToken = this.auth.getAuthToken();
    console.log('this.userrole', this.userRole);
    if (this.userRole == 'Creator') {
      this.showAdd = true;
      this.showButton = false;
      this.showAdmin = false;
      this.showCreator = true;
    } else if (this.userRole == 'Curator') {
      this.showAdd = false;
      this.showButton = true;
      this.showAdmin = false;
      this.showCreator = true;
    } else if (this.userRole == 'Admin') {
      this.showAdmin = true;
      this.showCreator = false;
    }
  }
  addstatus() {
    if (this.userRole === 'Creator') {
      this.list.forEach((obj: any) => {
        obj['status'] = this.latestTimestamp(obj); // Add your new key-value pair here
      });
    } else if (this.showButton) {
      this.list.forEach((obj: any) => {
        obj['status'] = this.latestTimestampcurator(obj); // Add your new key-value pair here
      });
    }
  }
  create_dropdown_oninit() {
    var difficultiesSet = new Set<string>();
    this.list.forEach((item: any) => difficultiesSet.add(item.type));
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueType.push({ label: value, value: value });
    });
    var difficultiesSet = new Set<string>();
    this.list.forEach((item: any) => difficultiesSet.add(item.class));
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueClass.push({ label: value, value: value });
    });
    var difficultiesSet = new Set<string>();
    this.list.forEach((item: any) => difficultiesSet.add(item.medium));
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueMedium.push({ label: value, value: value });
    });
    var difficultiesSet = new Set<string>();
    this.list.forEach((item: any) => difficultiesSet.add(item.subject));
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueSubject.push({ label: value, value: value });
    });
    var difficultiesSet = new Set<string>();
    this.list.forEach((item: any) => difficultiesSet.add(item.chapter));
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueChapter.push({ label: value, value: value });
    });
    var difficultiesSet = new Set<string>();
    this.list.forEach((item: any) => difficultiesSet.add(item.topic));
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueTopic.push({ label: value, value: value });
    });
    var difficultiesSet = new Set<string>();
    this.list.forEach((item: any) => difficultiesSet.add(item.difficulty));
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueLevel.push({ label: value, value: value });
    });
    var difficultiesSet = new Set<string>();
    this.list.forEach((item: any) => difficultiesSet.add(item.status));
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueStatus.push({ label: value, value: value });
    });
  }
  create_dropdowns_select(dt?: any) {
    if (dt.filteredValue) {
      var difficultiesSet = new Set<string>();
      dt.filteredValue.forEach((item: any) =>
        difficultiesSet.add(item.type)
      );
      var uniqueValues = Array.from(difficultiesSet);
      uniqueValues.forEach((value) => {
        this.uniqueType.push({ label: value, value: value });
      });
      var difficultiesSet = new Set<string>();
      dt.filteredValue.forEach((item: any) =>
        difficultiesSet.add(item.class)
      );
      var uniqueValues = Array.from(difficultiesSet);
      uniqueValues.forEach((value) => {
        this.uniqueClass.push({ label: value, value: value });
      });
      var difficultiesSet = new Set<string>();
      dt.filteredValue.forEach((item: any) =>
        difficultiesSet.add(item.medium)
      );
      var uniqueValues = Array.from(difficultiesSet);
      uniqueValues.forEach((value) => {
        this.uniqueMedium.push({ label: value, value: value });
      });
      var difficultiesSet = new Set<string>();
      dt.filteredValue.forEach((item: any) =>
        difficultiesSet.add(item.subject)
      );
      var uniqueValues = Array.from(difficultiesSet);
      uniqueValues.forEach((value) => {
        this.uniqueSubject.push({ label: value, value: value });
      });
      var difficultiesSet = new Set<string>();
      dt.filteredValue.forEach((item: any) =>
        difficultiesSet.add(item.chapter)
      );
      var uniqueValues = Array.from(difficultiesSet);
      uniqueValues.forEach((value) => {
        this.uniqueChapter.push({ label: value, value: value });
      });
      var difficultiesSet = new Set<string>();
      dt.filteredValue.forEach((item: any) =>
        difficultiesSet.add(item.topic)
      );
      var uniqueValues = Array.from(difficultiesSet);
      uniqueValues.forEach((value) => {
        this.uniqueTopic.push({ label: value, value: value });
      });
      var difficultiesSet = new Set<string>();
      dt.filteredValue.forEach((item: any) =>
        difficultiesSet.add(item.difficulty)
      );
      var uniqueValues = Array.from(difficultiesSet);
      uniqueValues.forEach((value) => {
        this.uniqueLevel.push({ label: value, value: value });
      });
      var difficultiesSet = new Set<string>();
      dt.filteredValue.forEach((item: any) =>
        difficultiesSet.add(item.status)
      );
      var uniqueValues = Array.from(difficultiesSet);
      uniqueValues.forEach((value) => {
        this.uniqueStatus.push({ label: value, value: value });
      });
      this.dt = dt;
    }
    if(this.dt.filteredValue){
    }
  }
  selectAllCheckbox(event: any): void {
    this.checked = event.target.checked;
    this.list.forEach((data) => (data.selected = this.checked));
    console.log(this.checked);
  }

  view(index: any) {
    if (this.auth.getUserRole() == 'Admin') {
      this.questionService.getQuestionDetail(index.ids).subscribe({
        next: (response: any) => {
          if (Array.isArray(response.data)) {
            response.data.forEach((question: any, i: any) => {
              this.questionService.Question.next({
                Mode: 'VIEW',
                Index: index,
              });
              this.questionService.setIndex(index);
            });
          }
        },
      });
    } else {
      console.log(index.id);
      this.questionService.getQuestionDetails(index.id).subscribe({
        next: (response: any) => {
          this.questionService.Question.next({ Mode: 'VIEW', Index: index.id });
          this.questionService.setIndex(index);
        },
      });
    }
  }

  edit(data: any) {
    this.questionService.Question.next({ Mode: 'EDIT', Index: data.id });
  }

  addNew() {
    this.questionService.Question.next({ Mode: 'CREATE' });
  }

  wordDownload(): void {
    this.checked = true;
    if (this.checked) {
      const selectedQuestionIds = this.list
        .filter((data) => data.selected)
        .map((data) => data.id);

      console.log(selectedQuestionIds);
      this.questionService.getReport(selectedQuestionIds).subscribe({
        next: (res: any) => {
          const htmlContent = res.data
            .map(
              (question: any, index: any) => `
            <p><strong>Question ${index + 1}:</strong> ${question.text}</p>
            <strong>Choices : </strong> 
            <div> 
            ${question.choices
              .map(
                (choice: any) => `
              <div>${choice.choice_text}</div>
            `
              )
              .join('')}
          </div>
          <p><strong>Correct Answer:</strong>${this.getCorrectAnswerText(
            question.choices
          )}</p>
          <br>
          `
            )
            .join('');

          // Create a new Blob containing the HTML content
          const blob = new Blob(
            [`<!DOCTYPE html><html><body>${htmlContent}</body></html>`],
            {
              type: 'application/msword',
            }
          );

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
    const correctChoice = choices.find(
      (choice: { choice_correct_yn: any }) => choice.choice_correct_yn
    );

    if (correctChoice) {
      return correctChoice.choice_text;
    } else {
      return 'Correct answer not available';
    }
  }

  singlewordDownload(index: any) {
    this.questionService.getReport(index).subscribe({
      next: (res: any) => {
        const htmlContent = res.data
          .map(
            (question: any, index: any) => `
            <p><strong>Question ${index + 1}:</strong> ${question.text}</p>
            <strong>Choices : </strong> 
            <div> 
            ${question.choices
              .map(
                (choice: any) => `
              <div>${choice.choice_text}</div>
            `
              )
              .join('')}
          </div>
          <p><strong>Correct Answer:</strong> ${
            question.choices.find((choice: any) => choice.choice_correct_yn)
              ?.choice_text
          }</p>
            <br>
          `
          )
          .join('');

        // Create a new Blob containing the HTML content
        const blob = new Blob(
          [`<!DOCTYPE html><html><body>${htmlContent}</body></html>`],
          {
            type: 'application/msword',
          }
        );

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
    // const selectedQuestionIds = this.questionList
    //   .filter((data) => data.selected)
    //   .map((data) => data.ids);
    const selectedQuestionIds = this.list
      .filter((data) => data.selected)
      .map((data) => data.id);
    console.log(selectedQuestionIds.length);
    this.checked = true;
    if (this.checked && selectedQuestionIds.length > 0) {
      this.questionService.getPdfReportSingle(selectedQuestionIds).subscribe(
        (response) => {
          this.questionService.generatePdfsingle(response.data);
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
    this.questionService.getPdfReportSingle(index).subscribe(
      (response) => {
        console.log(response.data);
        this.questionService.generatePdfsingle(response.data);
      },
      (error) => {
        console.error('Error downloading PDF file', error);
      }
    );
  }

  latestTimestamp(data: any): string {
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

    if (
      (submittedTimestamp > rejectedTimestamp &&
        submittedTimestamp > vettedTimestamp) ||
      data.submitted == 'Just Now'
    ) {
      return 'Submitted';
    } else if (
      rejectedTimestamp > vettedTimestamp &&
      rejectedTimestamp > submittedTimestamp
    ) {
      return 'Rejected';
    } else if (
      vettedTimestamp > rejectedTimestamp &&
      vettedTimestamp > submittedTimestamp
    ) {
      return 'Approved';
    } else if (data.submit === 'yes') {
      return 'Submitted';
    } else {
      return '';
    }
  }

  latestTimestampcurator(data: any): string {
    // var submittedTimestamp = new Date(data.submitted)?.getTime() || 0;
    // var translatedTimestamp = new Date(data.translated)?.getTime() || 0;
    // var vettedTimestamp = new Date(data.vetted)?.getTime() || 0;
    // var latestTimestamp = Math.max(submittedTimestamp, translatedTimestamp, vettedTimestamp);

    // if (latestTimestamp === submittedTimestamp) {
    //     return "Submitted";
    // } else if (latestTimestamp === translatedTimestamp) {
    //     return "Translated";
    // } else if (latestTimestamp === vettedTimestamp) {
    //     return "Approved";
    // } else {
    //     return "none"; // This would be the case if all timestamps are 0 or invalid
    // }

    if (data.approved) {
      return 'Approved';
    } else if (data.remarks && !data.rejected_tn) {
      return 'Sent to Translation';
    } else if (data.translated) {
      return 'Translated';
    } else if (data.approve == 'yes') {
      return 'Submitted';
    } else if (data.approve == 'no' && data.vetted) {
      return 'Sent to Translation';
    }
    return '';
  }

  returndummy(data: any) {
    return data;
  }

  getUniqueArray(data: any[], value: any) {
    return Array.from(new Set(data.map((item) => item[value])));
  }

  // getCurrentPageRecords(){
  //   const startIndex = (this.currentPage - 1) * this.recordsPerPage;
  //   const endIndex = startIndex + this.recordsPerPage;
  //   return this.list.slice(startIndex, endIndex);
  // }
  // prevPage(){
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //   }
  // }
  // getPages(): number[] {
  //   const pageCount = Math.ceil(this.list.length / this.recordsPerPage);
  //   return Array.from({ length: pageCount }, (_, index) => index + 1);
  // }
  // changePage(page: number) {
  //   this.currentPage = page;
  // }
  // nextPage() {
  //   if (this.currentPage < this.getPages().length) {
  //     this.currentPage++;
  //   }
  // }
}
