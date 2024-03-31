import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { shared } from './shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private shared: shared) { }
  public Exam_types: string[] = ['JEE', 'NEET', 'Foundation'];
  public Classes: string[] = [];
  public Subjects: string[] = [];
  public Levels: string[] = ['Easy', 'Medium', 'Hard'];
  public Question_types: any[] = [{ 'value': 1, 'title': 'MCQ' }, { 'value': 2, 'title': 'MSQ' }, { 'value': 3, 'title': 'Fill in the Blanks' }];
  public Chapters: any[] = [];
  public Topics: any[] = [];
  public type: string = '';
  public class: any;
  public subject: string = '';
  public chapter: string = '';
  public totalquestionsnumber: number = 0;
  public selectedquestionnumber: number = 0;
  public usedquestionsnumber: number = 0;
  public totalquestions: any[] = [];
  public selectedquestions: any[] = [];
  public usedquestions: any[] = [];
  public selectedQuestion: any = { text: '', choices: ['', '', '', ''], solution: '' }
  public tamilselected: boolean = true;
  public englishselected: boolean = true;
  public selectedQuestionIds: any[] = [];
  public choosenquestions: any[] = [];
  public draftquestionpaper: any = { "name": '', "details": '', ids: [] };
  public drafteditquestion: any = { "name": '', "details": '', ids: [] };
  public draftquestionpaperlist: any = [];
  public editable_question: any = { name: "", detail: "", questions: [] }
  p:number=1;
  @ViewChild('exampleModal') modal!: ElementRef;
  ngOnInit(): void {
    this.get_questionpaper()
  }
  selectClass(event: any) {
    this.type = event.target.value
    this.Classes = this.shared.class_options[event.target.value]
  }
  selectSubject(event: any) {
    this.class = event.target.value
    this.Subjects = this.shared.selectsubject[event.target.value]
  }
  selectChapter(event: any) {
    this.subject = event.target.value
    this.shared.getchapter(this.class, this.subject).subscribe((res: any) => {
      this.Chapters = res.data
    })
  }
  selectTopic(event: any) {
    this.chapter = event.target.value
    this.shared.gettopic(this.class, this.subject, this.chapter).subscribe((res: any) => {
      this.Topics = res.data
    })
  }
  onSubmit(form: any) {
    if (form.value.English) {
      this.englishselected = true
    }
    else {
      this.englishselected = false
    }
    if (form.value.Tamil) {
      this.tamilselected = true
    }
    else {
      this.tamilselected = false
    }
    this.selectedQuestion = { text: '', choices: ['', '', '', ''], solution: '' }
    this.shared.search_questions(form.value).subscribe((res: any) => {
      this.totalquestionsnumber = res.data.length
      this.totalquestions = res.data
      alert('Questions Retrived')
    }, error => {
      alert(error.error.message)
    })
  }
  Addtopaper() {
    this.selectedQuestionIds = this.totalquestions.filter((data) => data.selected).map((data) => data.id);
    this.choosenquestions = this.totalquestions.filter(item => this.selectedQuestionIds.includes(item.id));
  }
  savePaper() {
    if (this.englishselected && !this.tamilselected) {
      const htmlContent = this.totalquestions.map((question: any, index: any) =>
        `<p><strong>Question ${index + 1}:</strong> ${question.text}</p>
            <strong>Choices : </strong> 
            <div> 
            ${question.choices.map((choice: any) => `
              <div>${choice.choice_text}</div>
            `).join('')}
          </div>
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
    }
    if (!this.englishselected && this.tamilselected) {
      const htmlContent = this.totalquestions.map((question: any, index: any) =>
        `<p><strong>கேள்வி ${index + 1}:</strong> ${question.text_tn}</p>
            <strong>தேர்வுகள் : </strong> 
            <div>
            ${question.choices.map((choice: any) => `
              <div>${choice.choice_text_tn}</div>
            `).join('')}
          </div>
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
    }
    if (this.englishselected && this.tamilselected) {

      const htmlContent = this.totalquestions.map((question: any, index: any) =>
        `<p><strong>Question ${index + 1}:</strong> ${question.text}</p>
            <strong>Choices : </strong> 
            <div>
            ${question.choices.map((choice: any) => `
              <div>${choice.choice_text}</div>
            `).join('')}
          </div>
          <br>
          <p><strong>கேள்வி ${index + 1}:</strong> ${question.text_tn}</p>
            <strong>தேர்வுகள் : </strong> 
            <div> 
            ${question.choices.map((choice: any) => `
              <div>${choice.choice_text_tn}</div>
            `).join('')}
          </div>
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
    }
  }
  changeselquesnum() {
    this.selectedQuestionIds = this.totalquestions.filter((data) => data.selected).map((data) => data.id);
    this.selectedquestionnumber = this.selectedQuestionIds.length
  }
  generatequestion(data: any[]) {
    var htmlContent: any;
    if (this.englishselected && !this.tamilselected) {
      htmlContent = data.map((question: any, index: number) =>
        `<p><strong>Question ${index + 1}:</strong> ${question.text}</p>
    <strong>Choices : </strong> 
    <div>
      ${question.choices[0].choice_text}       ${question.choices[1].choice_text} 
      <br><br>
      ${question.choices[2].choice_text}       ${question.choices[3].choice_text}
    </div>
    <br>`
      ).join('');
    }
    if (this.englishselected && this.tamilselected) {
      htmlContent = data.map((question: any, index: number) =>
        `<p><strong>Question ${index + 1}:</strong> ${question.text}</p>
    <strong>Choices : </strong> 
    <div>
      ${question.choices[0].choice_text}       ${question.choices[1].choice_text} 
      <br><br>
      ${question.choices[2].choice_text}       ${question.choices[3].choice_text}
    </div>
    <br>
    <p><strong>கேள்வி ${index + 1}:</strong> ${question.text_tn}</p>
    <strong>தேர்வுகள் : </strong> 
    <div>
    ${question.choices[0].choice_text_tn}         ${question.choices[1].choice_text_tn} 
      <br><br>
    ${question.choices[2].choice_text_tn}         ${question.choices[3].choice_text_tn}
    </div>
    <br>`
      ).join('');
    }
    if (!this.englishselected && this.tamilselected) {
      htmlContent = data.map((question: any, index: number) =>
        `<p><strong>கேள்வி ${index + 1}:</strong> ${question.text_tn}</p>
      <strong>தேர்வுகள் : </strong> 
      <div>
      ${question.choices[0].choice_text_tn}         ${question.choices[1].choice_text_tn} 
      <br><br>
      ${question.choices[2].choice_text_tn}         ${question.choices[3].choice_text_tn}
      </div>
      <br>`
      ).join('');
    }
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
  }
  generatesolution(data: any[]) {
    var htmlContent: any
    if (this.englishselected && !this.tamilselected) {
      htmlContent = data.map((question: any, index: number) =>
        `<p><strong>${index + 1} . Answer:</strong> ${this.filterChoices(question.choices).choice_text}</p>
        <p><strong>${index + 1} . Solution:</strong> ${this.filterChoices(question.choices).choice_notes}</p>
    <br>`
      ).join('');
    }
    if (!this.englishselected && this.tamilselected) {
      htmlContent = data.map((question: any, index: number) =>
        `<p><strong>${index + 1} . பதில்:</strong> ${this.filterChoices(question.choices).choice_text_tn}</p>
        <p><strong>${index + 1} . தீர்வு:</strong> ${this.filterChoices(question.choices).choice_notes_tn}</p>
    <br>`
      ).join('');
    }

    if (this.englishselected && this.tamilselected) {
      htmlContent = data.map((question: any, index: number) =>
        `<p><strong>${index + 1} . Answer:</strong> ${this.filterChoices(question.choices).choice_text}</p>
        <p><strong>${index + 1} . Solution:</strong> ${this.filterChoices(question.choices).choice_notes}</p>
        <br>
        <p><strong>${index + 1} . பதில்:</strong> ${this.filterChoices(question.choices).choice_text_tn}</p>
        <p><strong>${index + 1} . தீர்வு:</strong> ${this.filterChoices(question.choices).choice_notes_tn}</p>
    <br>`
      ).join('');
    }
    // Create a new Blob containing the HTML content
    const blob = new Blob([`<!DOCTYPE html><html><body>${htmlContent}</body></html>`], {
      type: 'application/msword',
    });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'solution.doc';

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  generatequestion_solution(data: any[]) {
    var htmlContent: any;
    if (this.englishselected && !this.tamilselected) {
      htmlContent = data.map((question: any, index: number) =>
        `<p><strong>Question ${index + 1}:</strong> ${question.text}</p>
    <strong>Choices : </strong> 
    <div>
      ${question.choices[0].choice_text}       ${question.choices[1].choice_text} 
      <br><br>
      ${question.choices[2].choice_text}       ${question.choices[3].choice_text}
    </div>
    <br>
    <p><strong>${index + 1} . Answer:</strong> ${this.filterChoices(question.choices).choice_text}</p>
    <p><strong>${index + 1} . Solution:</strong> ${this.filterChoices(question.choices).choice_notes}</p>
    <br>`).join('');
    }

    if (!this.englishselected && this.tamilselected) {
      htmlContent = data.map((question: any, index: number) =>
        `<p><strong>கேள்வி ${index + 1}:</strong> ${question.text_tn}</p>
      <strong>தேர்வுகள் : </strong> 
      <div>
      ${question.choices[0].choice_text_tn}         ${question.choices[1].choice_text_tn} 
      <br><br>
      ${question.choices[2].choice_text_tn}         ${question.choices[3].choice_text_tn}
      </div>
      <br>
      <p><strong>${index + 1} . பதில்:</strong> ${this.filterChoices(question.choices).choice_text_tn}</p>
        <p><strong>${index + 1} . தீர்வு:</strong> ${this.filterChoices(question.choices).choice_notes_tn}</p>
    <br>`
      ).join('');
    }

    if (this.englishselected && this.tamilselected) {
      htmlContent = data.map((question: any, index: number) =>
        `<p><strong>Question ${index + 1}:</strong> ${question.text}</p>
    <strong>Choices : </strong> 
    <div>
      ${question.choices[0].choice_text}       ${question.choices[1].choice_text} 
      <br><br>
      ${question.choices[2].choice_text}       ${question.choices[3].choice_text}
    </div>
    <br>
    <p><strong>${index + 1} . Answer:</strong> ${this.filterChoices(question.choices).choice_text}</p>
    <p><strong>${index + 1} . Solution:</strong> ${this.filterChoices(question.choices).choice_notes}</p>
    <br><br>
    <p><strong>கேள்வி ${index + 1}:</strong> ${question.text_tn}</p>
      <strong>தேர்வுகள் : </strong> 
      <div>
      ${question.choices[0].choice_text_tn}         ${question.choices[1].choice_text_tn} 
      <br><br>
      ${question.choices[2].choice_text_tn}         ${question.choices[3].choice_text_tn}
      </div>
      <br>
      <p><strong>${index + 1} . பதில்:</strong> ${this.filterChoices(question.choices).choice_text_tn}</p>
        <p><strong>${index + 1} . தீர்வு:</strong> ${this.filterChoices(question.choices).choice_notes_tn}</p>
    <br>
    `).join('');
    }

    // Create a new Blob containing the HTML content
    const blob = new Blob([`<!DOCTYPE html><html><body>${htmlContent}</body></html>`], {
      type: 'application/msword',
    });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'question_solution.doc';

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  filterChoices(choices: any[]) {
    return choices.filter(choice => choice.choice_correct_yn !== null)[0];
  }
  addquestion(qid: any) {
    this.draftquestionpaper.ids.push(qid)
  }
  savequestionpaper(name: any) {
    const uniqueIds = [...new Set(this.drafteditquestion['ids'])];
    let question_paper = { 'name': name.value, "detail": "", "questions": uniqueIds.join(',') }
    this.shared.save_question_paper(question_paper).subscribe((res: any) => {
      if (res.message = 'Question Paper Created Successfully') {
        alert("Question Saved Successfully");
      }
    })
  }
  updatequestionpaper(name: any) {
    const uniqueIds = [...new Set(this.drafteditquestion['ids'])];
    let question_paper = { 'name': name.value, "detail": "", "questions": uniqueIds.join(',') }
    this.shared.update_question_paper(question_paper, this.editable_question['id']).subscribe((res: any) => {
      alert("Question Paper Updated Success")
    })
  }
  get_questionpaper() {
    this.shared.get_questionpaper_list().subscribe((res: any) => {
      this.draftquestionpaperlist = res.data;
    })
  }
  retrivequestions(question: any) {
    let array = question.questions.split(",").map(Number);
    this.shared.get_questions(array).subscribe((res: any) => {
      this.shared.question_download_count(question.id).subscribe((res: any) => {
        this.get_questionpaper();
      })
      this.generatequestion(res.data);
      this.generatesolution(res.data);
      this.generatequestion_solution(res.data);
    })
  }
  updatequestion(question: any) {
    this.editable_question['id'] = question.id
    this.editable_question['name'] = question.name
    let array = question.questions.split(",").map(Number)
    this.shared.get_questions(array).subscribe((res: any) => {
      res.data.forEach((obj: any) => {
        obj.editselected = true;
      });
      if (this.totalquestions.length > 0) {
        this.editable_question['questions'] = this.totalquestions.map(obj => {
          let selectedObj = res.data.find((item: any) => item.id === obj.id);
          if (selectedObj) {
            return { ...obj, editselected: true };
          } else {
            return obj;
          }
        });
        for (let i = 0; i < this.editable_question['questions'].length; i++) {
          if (this.editable_question['questions'][i].editselected) {
            this.drafteditquestion['ids'].push(this.editable_question['questions'][i].id)
          }
        }
      }
      else {
        this.editable_question['questions'] = res.data;
      }
    })
  }
  editquestion(id: any) {
    this.drafteditquestion['ids'].push(id)
  }
  check(){
    console.log("hello")
  }
}
