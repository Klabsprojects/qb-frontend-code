import { Component, OnInit, ViewChild } from '@angular/core';
import { List, addDetails, questionList } from '../question-translator.model';
import { QuestionCreationService } from '../question-creation-translator.service';
import { authService } from 'src/app/auth.service';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-list-translator',
  templateUrl: './list-translator.component.html',
  styleUrls: ['./list-translator.component.css'],
})
export class ListtranslatorComponent implements OnInit {
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
  showButton: boolean = false;
  showAdd: boolean = false;
  userRole: any;
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
  /////
  public uniqueType: any[] = [];
  public uniqueClass: any[] = [];
  public uniqueMedium: any[] = [];
  public uniqueSubject: any[] = [];
  public uniqueChapter: any[] = [];
  public uniqueTopic: any[] = [];
  public uniqueLevel: any[] = [];
  public uniqueStatus: any[] = [];
  @ViewChild('dt') dt!: Table;
  loading: boolean = false;
  /////
  selectedOptionclass: string = '';
  selectedOptionsubject: string = '';
  selectedOptionchapter: string = '';
  selectedOptionlevel: string = '';
  selectedOptiontype: string = '';
  p: number = 1;

  constructor(
    private auth: authService,
    private questionService: QuestionCreationService,
    private authService: authService
  ) {}

  ngOnInit(): void {
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
        console.log('list', this.list);
      },
    });
    this.userRole = this.auth.getUserRole();
    console.log(this.userRole);
    const authToken = this.auth.getAuthToken();
    console.log('this.userrole', this.userRole);
    if (this.userRole == 'Creator') {
      this.showAdd = true;
      this.showButton = false;
      this.showAdmin = false;
      this.showCreator = true;
    } else if (this.userRole == 'Bil.Cre') {
      this.showAdd = true;
      this.showButton = false;
      this.showAdmin = false;
      this.showCreator = true;
    } else if (this.userRole == 'Curator' || this.userRole == 'Bil.Cur') {
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
    if (this.userRole === 'Bil.Cre') {
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
  create_dropdown_onclick(dropdowntype: any) {
    if (dropdowntype == 'type') {
      this.uniqueClass = [];
      var difficultiesSet = new Set<string>();
      this.dt.filteredValue.forEach((item: any) =>
        difficultiesSet.add(item.class)
      );
      var uniqueValues = Array.from(difficultiesSet);
      uniqueValues.forEach((value) => {
        this.uniqueClass.push({ label: value, value: value });
      });
      this.uniqueMedium = [];
      var difficultiesSet = new Set<string>();
      this.dt.filteredValue.forEach((item: any) =>
        difficultiesSet.add(item.medium)
      );
      var uniqueValues = Array.from(difficultiesSet);
      uniqueValues.forEach((value) => {
        this.uniqueMedium.push({ label: value, value: value });
      });
      this.uniqueSubject = [];
      var difficultiesSet = new Set<string>();
      this.dt.filteredValue.forEach((item: any) =>
        difficultiesSet.add(item.subject)
      );
      var uniqueValues = Array.from(difficultiesSet);
      uniqueValues.forEach((value) => {
        this.uniqueSubject.push({ label: value, value: value });
      });
      this.uniqueChapter = [];
      var difficultiesSet = new Set<string>();
      this.dt.filteredValue.forEach((item: any) =>
        difficultiesSet.add(item.chapter)
      );
      var uniqueValues = Array.from(difficultiesSet);
      uniqueValues.forEach((value) => {
        this.uniqueChapter.push({ label: value, value: value });
      });
      this.uniqueTopic = [];
      var difficultiesSet = new Set<string>();
      this.dt.filteredValue.forEach((item: any) =>
        difficultiesSet.add(item.topic)
      );
      var uniqueValues = Array.from(difficultiesSet);
      uniqueValues.forEach((value) => {
        this.uniqueTopic.push({ label: value, value: value });
      });
      this.uniqueLevel = [];
      var difficultiesSet = new Set<string>();
      this.dt.filteredValue.forEach((item: any) =>
        difficultiesSet.add(item.difficulty)
      );
      var uniqueValues = Array.from(difficultiesSet);
      uniqueValues.forEach((value) => {
        this.uniqueLevel.push({ label: value, value: value });
      });
      this.uniqueStatus = [];
      var difficultiesSet = new Set<string>();
      this.dt.filteredValue.forEach((item: any) =>
        difficultiesSet.add(item.status)
      );
      var uniqueValues = Array.from(difficultiesSet);
      uniqueValues.forEach((value) => {
        this.uniqueStatus.push({ label: value, value: value });
      });
    }
    if(dropdowntype=='class'){
      this.uniqueMedium = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.medium)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueMedium.push({ label: value, value: value });
    });
    this.uniqueSubject = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.subject)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueSubject.push({ label: value, value: value });
    });
    this.uniqueChapter = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.chapter)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueChapter.push({ label: value, value: value });
    });
    this.uniqueTopic = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.topic)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueTopic.push({ label: value, value: value });
    });
    this.uniqueLevel = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.difficulty)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueLevel.push({ label: value, value: value });
    });
    this.uniqueStatus = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.status)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueStatus.push({ label: value, value: value });
    });
    }
    if(dropdowntype=='medium'){
      this.uniqueSubject = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.subject)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueSubject.push({ label: value, value: value });
    });
    this.uniqueChapter = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.chapter)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueChapter.push({ label: value, value: value });
    });
    this.uniqueTopic = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.topic)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueTopic.push({ label: value, value: value });
    });
    this.uniqueLevel = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.difficulty)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueLevel.push({ label: value, value: value });
    });
    this.uniqueStatus = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.status)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueStatus.push({ label: value, value: value });
    });
    }
    if(dropdowntype=='subject'){
      this.uniqueChapter = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.chapter)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueChapter.push({ label: value, value: value });
    });
    this.uniqueTopic = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.topic)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueTopic.push({ label: value, value: value });
    });
    this.uniqueLevel = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.difficulty)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueLevel.push({ label: value, value: value });
    });
    this.uniqueStatus = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.status)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueStatus.push({ label: value, value: value });
    });
    }
    if(dropdowntype=='chapter'){
      this.uniqueTopic = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.topic)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueTopic.push({ label: value, value: value });
    });
    this.uniqueLevel = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.difficulty)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueLevel.push({ label: value, value: value });
    });
    this.uniqueStatus = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.status)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueStatus.push({ label: value, value: value });
    });
    }
    if(dropdowntype=='topic'){
      this.uniqueLevel = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.difficulty)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueLevel.push({ label: value, value: value });
    });
    this.uniqueStatus = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.status)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueStatus.push({ label: value, value: value });
    });
    }
    if(dropdowntype=='level'){
      this.uniqueStatus = [];
    var difficultiesSet = new Set<string>();
    this.dt.filteredValue.forEach((item: any) =>
      difficultiesSet.add(item.status)
    );
    var uniqueValues = Array.from(difficultiesSet);
    uniqueValues.forEach((value) => {
      this.uniqueStatus.push({ label: value, value: value });
    });
    }
  }

  // create_dropdown_onclick(dropdowntype:any){
  //   this.uniqueType = [];
  //   var difficultiesSet = new Set<string>();
  //   this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.type));
  //   var uniqueValues = Array.from(difficultiesSet);
  //   uniqueValues.forEach((value) => {
  //     this.uniqueType.push({ label: value, value: value });
  //   });
  //   this.uniqueClass = []
  //   var difficultiesSet = new Set<string>();
  //   this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.class));
  //   var uniqueValues = Array.from(difficultiesSet);
  //   uniqueValues.forEach((value) => {
  //     this.uniqueClass.push({ label: value, value: value });
  //   });
  //   this.uniqueMedium = []
  //   var difficultiesSet = new Set<string>();
  //   this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.medium));
  //   var uniqueValues = Array.from(difficultiesSet);
  //   uniqueValues.forEach((value) => {
  //     this.uniqueMedium.push({ label: value, value: value });
  //   });
  //   this.uniqueSubject = []
  //   var difficultiesSet = new Set<string>();
  //   this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.subject));
  //   var uniqueValues = Array.from(difficultiesSet);
  //   uniqueValues.forEach((value) => {
  //     this.uniqueSubject.push({ label: value, value: value });
  //   });
  //   this.uniqueChapter = []
  //   var difficultiesSet = new Set<string>();
  //   this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.chapter));
  //   var uniqueValues = Array.from(difficultiesSet);
  //   uniqueValues.forEach((value) => {
  //     this.uniqueChapter.push({ label: value, value: value });
  //   });
  //   this.uniqueTopic = []
  //   var difficultiesSet = new Set<string>();
  //   this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.topic));
  //   var uniqueValues = Array.from(difficultiesSet);
  //   uniqueValues.forEach((value) => {
  //     this.uniqueTopic.push({ label: value, value: value });
  //   });
  //   this.uniqueLevel = []
  //   var difficultiesSet = new Set<string>();
  //   this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.difficulty));
  //   var uniqueValues = Array.from(difficultiesSet);
  //   uniqueValues.forEach((value) => {
  //     this.uniqueLevel.push({ label: value, value: value });
  //   });
  //   this.uniqueStatus = []
  //   var difficultiesSet = new Set<string>();
  //   this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.status));
  //   var uniqueValues = Array.from(difficultiesSet);
  //   uniqueValues.forEach((value) => {
  //     this.uniqueStatus.push({ label: value, value: value });
  //   });
  // }
  // create_dropdown_onclick(dropdowntype:any){
  //   if(dropdowntype!='type'){
  //     this.uniqueType = [];
  //     var difficultiesSet = new Set<string>();
  //     this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.type));
  //     var uniqueValues = Array.from(difficultiesSet);
  //     uniqueValues.forEach((value) => {
  //       this.uniqueType.push({ label: value, value: value });
  //     });
  //   }
  //   if(dropdowntype!='class'){
  //     this.uniqueClass = []
  //     var difficultiesSet = new Set<string>();
  //     this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.class));
  //     var uniqueValues = Array.from(difficultiesSet);
  //     uniqueValues.forEach((value) => {
  //       this.uniqueClass.push({ label: value, value: value });
  //     });
  //   }
  //   if(dropdowntype!='medium'){
  //     this.uniqueMedium = []
  //     var difficultiesSet = new Set<string>();
  //     this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.medium));
  //     var uniqueValues = Array.from(difficultiesSet);
  //     uniqueValues.forEach((value) => {
  //       this.uniqueMedium.push({ label: value, value: value });
  //     });
  //   }
  //   if(dropdowntype!='subject'){
  //     this.uniqueSubject = []
  //     var difficultiesSet = new Set<string>();
  //     this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.subject));
  //     var uniqueValues = Array.from(difficultiesSet);
  //     uniqueValues.forEach((value) => {
  //       this.uniqueSubject.push({ label: value, value: value });
  //     });
  //   }
  //   if(dropdowntype!='chapter'){
  //     this.uniqueChapter = []
  //     var difficultiesSet = new Set<string>();
  //     this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.chapter));
  //     var uniqueValues = Array.from(difficultiesSet);
  //     uniqueValues.forEach((value) => {
  //       this.uniqueChapter.push({ label: value, value: value });
  //     });
  //   }
  //   if(dropdowntype!='topic'){
  //     this.uniqueTopic = []
  //     var difficultiesSet = new Set<string>();
  //     this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.topic));
  //     var uniqueValues = Array.from(difficultiesSet);
  //     uniqueValues.forEach((value) => {
  //       this.uniqueTopic.push({ label: value, value: value });
  //     });
  //   }
  //   if(dropdowntype!='level'){
  //     this.uniqueLevel = []
  //     var difficultiesSet = new Set<string>();
  //     this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.difficulty));
  //     var uniqueValues = Array.from(difficultiesSet);
  //     uniqueValues.forEach((value) => {
  //       this.uniqueLevel.push({ label: value, value: value });
  //     });
  //   }
  //   if(dropdowntype!='status'){
  //     this.uniqueStatus = []
  //     var difficultiesSet = new Set<string>();
  //     this.dt.filteredValue.forEach((item: any) => difficultiesSet.add(item.status));
  //     var uniqueValues = Array.from(difficultiesSet);
  //     uniqueValues.forEach((value) => {
  //       this.uniqueStatus.push({ label: value, value: value });
  //     });
  //   }
  // }

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
      console.log('index', index);
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
              (question: any, index: any) =>
                `
          <p><strong>Question ${index + 1}:</strong> ${question.text}</p>
    <strong>Choices : </strong> 
    <div>
      ${question.choices[0].choice_text}       ${
                  question.choices[1].choice_text
                } 
      <br><br>
      ${question.choices[2].choice_text}       ${
                  question.choices[3].choice_text
                }
    </div>
    <br>
    <p><strong>Answer:</strong> ${
      this.filterChoices(question.choices).choice_text
    }</p>
    <p><strong>Solution:</strong> ${
      this.filterChoices(question.choices).choice_notes
    }</p>
    <br><br>
    <p><strong>கேள்வி ${index + 1}:</strong> ${question.text_tn}</p>
      <strong>தேர்வுகள் : </strong> 
      <div>
      ${question.choices[0].choice_text_tn}         ${
                  question.choices[1].choice_text_tn
                } 
      <br><br>
      ${question.choices[2].choice_text_tn}         ${
                  question.choices[3].choice_text_tn
                }
      </div>
      <br>
      <p><strong>பதில்:</strong> ${
        this.filterChoices(question.choices).choice_text_tn
      }</p>
        <p><strong>தீர்வு:</strong> ${
          this.filterChoices(question.choices).choice_notes_tn
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
      ${question.choices[0].choice_text}       ${
              question.choices[1].choice_text
            } 
      <br><br>
      ${question.choices[2].choice_text}       ${
              question.choices[3].choice_text
            }
    </div>
    <br>
    <p><strong>Answer:</strong> ${
      this.filterChoices(question.choices).choice_text
    }</p>
    <p><strong>Solution:</strong> ${
      this.filterChoices(question.choices).choice_notes
    }</p>
    <br><br>
    <p><strong>கேள்வி ${index + 1}:</strong> ${question.text_tn}</p>
      <strong>தேர்வுகள் : </strong> 
      <div>
      ${question.choices[0].choice_text_tn}         ${
              question.choices[1].choice_text_tn
            } 
      <br><br>
      ${question.choices[2].choice_text_tn}         ${
              question.choices[3].choice_text_tn
            }
      </div>
      <br>
      <p><strong>பதில்:</strong> ${
        this.filterChoices(question.choices).choice_text_tn
      }</p>
        <p><strong>தீர்வு:</strong> ${
          this.filterChoices(question.choices).choice_notes_tn
        }</p>
    <br>`
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
  // singlewordDownload(index: any) {
  //   this.questionService.getReport(index).subscribe({
  //     next: (res: any) => {
  //       // Start building the HTML content for the Word document
  //       let htmlContent = `<html><head><meta charset="UTF-8"><style>
  //                          body { font-family: Arial, sans-serif; }
  //                          p { margin: 0; }
  //                          strong { font-weight: bold; }
  //                          ul { list-style-type: none; padding: 0; }
  //                          li { display: inline; }
  //                          </style></head><body>`;

  //       // Iterate through each question in the response data
  //       res.data.forEach((question: any, index: any) => {
  //         htmlContent += `<p><strong>Question ${index + 1}:</strong> ${question.text}</p>
  //                         <p><strong>Choices:</strong></p>
  //                         <ul>
  //                           <li>${question.choices[0].choice_text}</li>
  //                           <li>${question.choices[1].choice_text}</li>
  //                           <li>${question.choices[2].choice_text}</li>
  //                           <li>${question.choices[3].choice_text}</li>
  //                         </ul>
  //                         <p><strong>Answer:</strong> ${this.filterChoices(question.choices).choice_text}</p>
  //                         <p><strong>Solution:</strong> ${this.filterChoices(question.choices).choice_notes}</p>
  //                         <p><strong>கேள்வி ${index + 1}:</strong> ${question.text_tn}</p>
  //                         <ul>
  //                           <li>${question.choices[0].choice_text_tn}</li>
  //                           <li>${question.choices[1].choice_text_tn}</li>
  //                           <li>${question.choices[2].choice_text_tn}</li>
  //                           <li>${question.choices[3].choice_text_tn}</li>
  //                         </ul>
  //                         <p><strong>பதில்:</strong> ${this.filterChoices(question.choices).choice_text_tn}</p>
  //                         <p><strong>தீர்வு:</strong> ${this.filterChoices(question.choices).choice_notes_tn}</p><br>`;
  //       });

  //       // Close the HTML content
  //       htmlContent += `</body></html>`;

  //       // Create a new Blob containing the HTML content
  //       const blob = new Blob([htmlContent], {
  //         type: 'application/msword',
  //       });

  //       // Create a link element to trigger the download
  //       const link = document.createElement('a');
  //       link.href = URL.createObjectURL(blob);
  //       link.download = 'questions.doc';

  //       // Append the link to the document and trigger the download
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     },
  //   });
  // }

  filterChoices(choices: any[]) {
    return choices.filter((choice) => choice.choice_correct_yn !== null)[0];
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
    const selectedQuestionId = index;
    console.log('selectedQuestionId', selectedQuestionId);
    // .filter((data) => data.selected)
    // .map((data) => data.ids);
    this.questionService.getReport(selectedQuestionId).subscribe(
      (response) => {
        this.questionService.generatePdf(response.data);
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
    if (data.vetted) {
      return 'Approved';
    }
    if (data.submitted) {
      return 'Submitted';
    }
    return '';
  }

  returndummy(data: any) {
    return data;
  }
  getUniqueArray(data: any[], value: any) {
    return Array.from(new Set(data.map((item) => item[value])));
  }

  // dropdownDataclass = ['9', '10', '11', '12'];
  // dropdownDatasubject = ["Maths","Physics","Chemistry","Botony & Zology"]

  // // Selected option
  // selectedOptionclass: string = '';
  // selectedOptionsubject: string = '';
}
