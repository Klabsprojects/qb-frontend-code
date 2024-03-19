import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { QuestionCreationService } from '../question-creation.service';
import { addChoices, addDetails, createQuestion, questionAdd } from '../question.model';
import * as CustomEditor from '../../../assets/ckeditor.js';
import { NgForm } from '@angular/forms';
import { authService } from 'src/app/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']

})
export class CreateComponent implements OnInit {
  @ViewChild('questionForm', { static: false }) questionForm!: NgForm
  ClassicEditor: any;
  public Editor: any = CustomEditor;
  // public htmlData: string = '<h1>Hello World</h1>';
  detailId: number = 0;
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

  public answerConfig: any = {
    toolbar: ['MathType', 'ChemType'],
    language: 'en'
  };



  public inputs: any[] = [];
  radiooptions = ['MCQ', 'MSQ', 'Fill In the Blanks'];
  radioSelected: number = 1;
  public checkoptions = ['Text', 'Image'];
  public checkSelected: { [key: string]: boolean } = {
    'Text': true,
    'Image': false
  };
  // radioSelected: any;
  showFormat: boolean = true;
  imageSrc!: string | ArrayBuffer | null;
  questionImageSrc!: string | null;
  clueImageSrc!: string | null;
  imageSrcTwo!: string | ArrayBuffer | null;
  imageSrcThree!: string | ArrayBuffer | null;
  imageSrcFour!: string | ArrayBuffer | null;
  firstSolutionImageSrc!: string | ArrayBuffer | null;
  secondSolutionImageSrc!: string | ArrayBuffer | null;
  thirdSolutionImageSrc!: string | ArrayBuffer | null;
  fourthSolutionImageSrc!: string | ArrayBuffer | null;
  dynamicImageSrc!: string | ArrayBuffer | null;
  leftFirstImageSrc!: string | ArrayBuffer | null;
  leftSecondImageSrc!: string | ArrayBuffer | null;
  leftThirdImageSrc!: string | ArrayBuffer | null;
  leftFourthImageSrc!: string | ArrayBuffer | null;
  rightFirstImageSrc!: string | ArrayBuffer | null;
  rightSecondImageSrc!: string | ArrayBuffer | null;
  rightThirdImageSrc!: string | ArrayBuffer | null;
  rightFourthImageSrc!: string | ArrayBuffer | null;
  public disableIcon = false;
  public disableIconTwo = false;
  public disableIconThree = false;
  public disableIconFour = false;
  public questionDisableIcon = false;
  public clueDisableIcon = false;
  public firstSolutiondisableIcon = false;
  public secondSolutiondisableIcon = false;
  public thirdSolutiondisableIcon = false;
  public fourthSolutiondisableIcon = false;
  public dynamicdisableIcon = false;
  public mode: any = ""
  items: any[] = [{ id: 1, input1: '', input2: '', imageSrc: '', disableIcon: false }];
  // items_solution : any[] = [{ id: 1, input1: '', input2: '', imageSrc: '', disableIcon: false }];
  // items: { id: number, imageSrc: string, disableIcon: boolean }[] = [];
  // classOptions: number[] = Array.from({ length: 4 }, (_, index) => index + 9);
  showChoices: any[] = [];
  public questionAdd = new questionAdd();
  addChoices: addChoices = new addChoices();
  createQuestion: createQuestion = new createQuestion();
  addDetails: addDetails = new addDetails();
  public showImage = false;
  public showClue: boolean = true;
  public showFirstInput: boolean = true;
  public showSecondInput: boolean = true;
  public showThirdInput: boolean = true;
  public showFourthInput: boolean = true;
  public showFirstSolutionInput: boolean = true;
  public showSecondSolutionInput: boolean = true;
  public showThirdSolutionInput: boolean = true;
  public showFourthSolutionInput: boolean = true;
  public showFirstImage: boolean = true;
  public showSecondImage: boolean = true;
  public showThirdImage: boolean = true;
  public showFourthImage: boolean = true;
  public showClueImage: boolean = true;
  public showDynamicImage: boolean = true;
  public showFirstSolutionImage: boolean = true;
  public showSecondSolutionImage: boolean = true;
  public showThirdSolutionImage: boolean = true;
  public showFourthSolutionImage: boolean = true;
  public showDynamicInput: boolean = true;
  public showDynamicInput_solution: boolean = true
  public showLeftFirstInput: boolean = true;
  public showLeftSecondInput: boolean = true;
  public showLeftThirdInput: boolean = true;
  public showLeftFourthInput: boolean = true;
  public showRightFirstInput: boolean = true;
  public showRightSecondInput: boolean = true;
  public showRightThirdInput: boolean = true;
  public showRightFourthInput: boolean = true;
  public showLeftFirstImage: boolean = true;
  public showLeftSecondImage: boolean = true;
  public showLeftThirdImage: boolean = true;
  public showLeftFourthImage: boolean = true;
  public showRightFirstImage: boolean = true;
  public showRightSecondImage: boolean = true;
  public showRightThirdImage: boolean = true;
  public showRightFourthImage: boolean = true;
  public leftFirstdisableIcon: boolean = false;
  public leftSeconddisableIcon: boolean = false;
  public leftThirddisableIcon: boolean = false;
  public leftFourthdisableIcon: boolean = false;
  public rightFirstdisableIcon: boolean = false;
  public rightSeconddisableIcon: boolean = false;
  public rightThirddisableIcon: boolean = false;
  public rightFourthdisableIcon: boolean = false;
  public showEditors: boolean[] = [];
  public showEditors_solution: boolean[] = [];
  public showChoiceInput: boolean[] = [];
  public showChoiceInput_solution: boolean[] = [];
  public editorContent: string = '';
  public decodedContent: string = '';
  @ViewChild('editor') editor: any;
  editorInstance: any;
  showQuestionEditor = true;
  showQuestionImage = false;
  isQFormatInvalid = false;
  isAtLeastOneCheckboxSelected = true;
  @ViewChildren('inputElement') inputElements!: QueryList<ElementRef>;
  //Answer Choices
  public Choices: any[] = [];
  public editquestion: any = {}
  showinput: boolean[] = [true, true, true, true];
  showimage: boolean[] = [true, true, true, true];
  imageSrcArray: string[] = [];
  disableIconArray: boolean[] = [];
  showSolutionInput: boolean[] = Array(this.showChoices.length).fill(false);
  showSolutionImage: boolean[] = [];
  solutionImageSrcArray: string[] = [];
  solutionDisableIconArray: boolean[] = [];
  formSubmitted = false;
  currentStep: number = 0;
  detailsForm!: NgForm;
  showConcept = false;
  showLo = false;
  showCompetency = false;
  showmmc = false;
  userRole: any;
  clueBase64: any;
  questionBase64: string | null = null;
  selectedType: any;
  selectedClass: any;
  selectSubjects: any;
  selectedSubject: any;
  selectedTerm: any;
  selectedChapter: any;
  selectedTopic: any;
  selectedSubTopic: any;
  selectedConcept: any;
  selectedLearning: any;
  showSubTopic: boolean = false;
  showInputsValue: boolean = false;
  showInput = false;
  setRead = true;
  classOptions: any[] = [];
  mediumOptions: any[] = [];
  subjectOptions: any[] = [];
  termOptions: string[] = [];
  chapterOptions: any[] = [];
  topicOptions: any[] = [];
  subtopicOptions: any[] = [];
  conceptOptions: any[] = [];
  learningOptions: any[] = [];
  Type: string = '';
  questionList: any[] = [];
  allCheckboxesSelected = false;
  formData: any = {};
  public current_editing_id = ""
  public class_options: { [key: string]: string[] } = {
    'JEE': ['11', '12'],
    'NEET': ['11', '12'],
    'Foundation':['9','10']
  };
  public selectsubject :{ [key: string]: string[] } = {
    '9': ['Maths', 'Chemistry','Physics','Biology'],
    '10': ['Maths', 'Chemistry','Physics','Biology'],
    '11':['Botany','Zoology','Physics','Chemistry','Maths'],
    '12':['Botany','Zoology','Physics','Chemistry','Maths']
  };

  constructor(private auth: authService, private questionService: QuestionCreationService, private cdr: ChangeDetectorRef, private zone: NgZone, private renderer: Renderer2, private ElementRef: ElementRef) {
    for (let i = 0; i < 4; i++) {
      this.showChoices.push({
        choice_id: i + 1,
        choice_text: null,
        choice_img: null,
        choice_correct_yn: 0,
        choice_notes: null,
        choice_link: null,
        choice_weight: null,
        medinstr_id: 0,
      });
    }
  }

  ngOnInit(): void {
    this.questionService.Question.subscribe(({
      next: (res: any) => {
        if(res.Mode != "EDIT"){
          this.questionAdd.format = 1
        }
        if (res.Mode == "EDIT") {
          this.mode = "EDIT"
          this.questionService.Question.subscribe((index) => {
            this.questionService.getQuestionDetails(index.Index).subscribe({
              next: (res: any) => {
                console.log("data", res.data);
                var event: any = {}
                event.target = {}
                // this.radioChange(res.data.format)
                // this.questionAdd.format = res.data.format
                this.questionAdd.type = res.data.type;
                event.target.value = res.data.type
                this.selectType(event)
                this.questionAdd.class = res.data.class;
                event.target.value = res.data.class
                this.selectChange(event)
                this.questionAdd.medium = res.data.medium;
                event.target.value = res.data.medium
                this.selectMedium(event)
                this.questionAdd.subject = res.data.subject;
                event.target.value = res.data.subject
                this.selectSubject(event)
                this.questionAdd.chapter = res.data.chapter;
                event.target.value = res.data.chapter
                this.selectChapter(event)
                this.questionAdd.topic = res.data.topic;
                event.target.value = res.data.topic
                this.selectTopic(event)
                this.editquestion = res.data
                // this.questionAdd.sub_topic = res.data.sub_topic
                this.radioChange(+res.data.format)
                this.questionAdd.text = res.data.text
                this.questionAdd.img = res.data.img
                this.questionImageSrc = res.data.img
                this.questionAdd.clue_text = res.data.clue_text
                this.questionAdd.clue_img = res.data.clue_img
                this.clueImageSrc = res.data.clue_img
                this.questionAdd.difficulty = res.data.difficulty
                this.current_editing_id = res.data.id
                if (res.data.text) {
                  event.target.value = 'Text'
                  event.target.checked = true
                  this.checkSelected['Text'] = true
                  this.checkboxChange(event)
                }
                if(!res.data.text){
                  event.target.value = 'Text'
                  event.target.checked = false
                  this.checkSelected['Text'] = false
                  this.checkboxChange(event)
                }
                if (res.data.img) {
                  event.target.value = 'Image'
                  event.target.checked = true
                  this.showQuestionImage = true
                  this.checkSelected['Image'] = true
                  this.checkboxChange(event)
                }
                if(!res.data.img){
                  event.target.value = 'Image'
                  event.target.checked = false
                  this.showQuestionImage = false
                  this.checkSelected['Image'] = false
                  this.checkboxChange(event)
                }
                for (let i = 0; i < res.data.choices.length; i++) {
                  if (res.data.format != 3) {
                    this.imageSrcArray.push(res.data.choices[i].choice_img)
                    this.solutionImageSrcArray.push(res.data.choices[i].choice_notes_img)
                  }
                  else if(res.data.format == 3){
                    this.items[i].dynamicImageSrc =res.data.choices[i].choice_img
                    this.items[i].dynamicsolutionImageSrc=res.data.choices[i].choice_notes_img
                  }
                }
              }
            })
          })
        }
      }
    }))
    this.currentStep = 1;
    this.addChoices.choice_text = ["", "", "", ""];
    this.showEditors = Array(this.showChoices.length).fill(false);
    this.showEditors_solution = Array(this.showChoices.length).fill(false);
    this.showChoiceInput = Array(this.showChoices.length).fill(true);
    this.showChoiceInput_solution = Array(this.showChoices.length).fill(true);
    this.userRole = this.auth.getUserRole();
    this.questionService.Question.subscribe((res: any) => {
      this.detailId = res.detailId;
    })
  }

  radiochoose(i: any) {
    const choiceCorrectYnValues = Array(4).fill(null);  // Assuming you have 4 choices

    // Set the value at index i to i, and others to null
    choiceCorrectYnValues[i] = i;

    // Create a new object with updated choice_correct_yn values
    const updatedValues = choiceCorrectYnValues.reduce((acc, value, index) => {
      acc[`choice_correct_yn${index}`] = value;
      return acc;
    }, {});

    // Patch the form with the new values
    this.questionForm.form.patchValue(updatedValues);
  }


  firstEditor(index: number) {
    this.showEditors[index] = !this.showEditors[index];
    this.showChoiceInput[index] = !this.showEditors[index];
  }
  firstEditorsolution(index: number) {
    this.showEditors_solution[index] = !this.showEditors_solution[index]
    this.showChoiceInput_solution[index] = !this.showEditors_solution[index]
  }

  checkboxChange(data: any) {
    const checkboxValue = data.target.value;
    const isChecked = data.target.checked;
    console.log("datacheckbox",checkboxValue,isChecked)
    if (checkboxValue === "Text") {
      this.showQuestionEditor = isChecked;
      this.checkSelected['Text'] = isChecked
    } else if (checkboxValue === "Image") {
      this.showQuestionImage = isChecked;
      this.checkSelected['Image'] = isChecked
    }
    this.isAtLeastOneCheckboxSelected = Object.values(this.checkSelected).some(value => value===true);
    console.log("this.isAtLeastOneCheckboxSelected",this.isAtLeastOneCheckboxSelected,this.checkSelected)

    if (this.showQuestionEditor && this.showQuestionImage) {
      this.showQuestionEditor = true;
      this.showQuestionImage = true;
    }
  }

  choiceImageURL(event: any, index: number): void {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);

    this.questionService.uploadimage(formData).subscribe(({
      next: (res: any) => {
        this.imageSrcArray[index] = res.link
        if (Array.isArray(this.addChoices.choice_text)) {
          this.addChoices.choice_text[index] = ""
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
  }

  solutionImageURL(event: any, i: number) {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);

    this.questionService.uploadimage(formData).subscribe(({
      next: (res: any) => {
        const currentChoice = this.Choices[i];
        this.solutionImageSrcArray[i] = res.link;
        currentChoice.solutiondisableIcon = false;
        currentChoice.showSolutionInput = false;
        if (Array.isArray(this.addChoices.choice_notes)) {
          this.addChoices.choice_notes[i] = ""
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
  }

  removeSolutionImage(i: number) {
    this.solutionImageSrcArray[i] = ''
    this.showChoiceInput_solution[i] = true
    this.showChoices[i].solutionDisableIconArray = true
  }



  removeImages(i: number) {
    this.showChoices[i].disableIconArray = true;
    this.showChoiceInput[i] = true;
    this.imageSrcArray[i] = '';
  }

  showeditor(i: number) {
    this.showChoices[i].showEditor = true;
    this.showChoices[i].showImage = false;
    this.showChoices[i].showInput = false;
  }

  getChoiceInputValue(event: any, index: number): void {
    const currentChoice = this.showChoices[index];
    if (event.target.value !== '') {
      currentChoice.showImage = false;
      currentChoice.showInput = true;
    } else {
      currentChoice.showImage = true;
      currentChoice.showInput = false;
    }
  }

  getSolutionValue(event: any, index: number): void {
    const currentChoice = this.Choices[index];
    if (event.target.value !== '') {
      currentChoice.showSolutionImage = false;
      currentChoice.showSolutionInput = true;
    } else {
      currentChoice.showSolutionImage = true;
      currentChoice.showSolutionInput = false;
    }
  }





  radioChange(option: any) {
    console.log("option",option)
    this.radioSelected = option;
    this.questionAdd.format = option;
    this.isQFormatInvalid = false;
  }

  questionImageURL(event: any): void {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);

    this.questionService.uploadimage(formData).subscribe(({
      next: (res: any) => {
        this.questionImageSrc = res.link
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
  }


  questionRemove() {
    this.questionImageSrc = '';
    this.questionDisableIcon = true;
    this.cdr.detectChanges();
    this.questionAdd.img = null;
  }

  clueImageURL(event: any): void {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);

    this.questionService.uploadimage(formData).subscribe(({
      next: (res: any) => {
        this.clueImageSrc = res.link
        this.questionAdd.clue_text = ""
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
  }

  clueRemove() {
    this.clueImageSrc = ''
    this.clueDisableIcon = true;
    this.showClue = true;
  }

  firstImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
        this.disableIcon = false;
        this.showFirstInput = false;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.imageSrc = '/assets/images/photo.png';
    this.disableIcon = true;
    this.showFirstInput = true;
  }

  secondImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrcTwo = e.target.result;
        this.disableIconTwo = false;
        this.showSecondInput = false;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImageTwo() {
    this.imageSrcTwo = '/assets/images/photo.png';
    this.disableIconTwo = true;
    this.showSecondInput = true;
  }

  thirdImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrcThree = e.target.result;
        this.disableIconThree = false;
        this.showThirdInput = false;
      };
      reader.readAsDataURL(file);

    }
  }

  removeImageThree() {
    this.imageSrcThree = '/assets/images/photo.png';
    this.disableIconThree = true;
    this.showThirdInput = true;
  }

  fourthImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrcFour = e.target.result;
      };
      this.disableIconFour = false;
      this.showFourthInput = false;
      reader.readAsDataURL(file);
    }
  }
  removeImageFour() {
    this.imageSrcFour = '/assets/images/photo.png';
    this.disableIconFour = true;
    this.showFourthInput = true;
  }

  dynamicImage(event: any, index: number): void {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);

    this.questionService.uploadimage(formData).subscribe(({
      next: (res: any) => {
        this.items[index].dynamicImageSrc = res.link
        this.items[index].dynamicdisableIcon = false;
        this.items[index].showDynamicInput = false;
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
  }
  dynamicImageSolution(event: any, index: number) {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);

    this.questionService.uploadimage(formData).subscribe(({
      next: (res: any) => {
        this.items[index].dynamicsolutionImageSrc = res.link;
        this.items[index].dynamicsolutiondisableIcon = false;
        this.items[index].showDynamicInput = false;
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
  }


  dynamicremoveImage(index: number) {
    this.zone.run(() => {
      this.items[index].dynamicImageSrc = '';
      this.items[index].dynamicdisableIcon = true;
      this.items[index].showDynamicInput = true;
    });

  }
  dynamicremoveSolution(index: number) {
    this.zone.run(() => {
      this.items[index].dynamicsolutionImageSrc = '';
      this.items[index].dynamicdisableIcon = true;
      this.items[index].showDynamicInput = true;
    });
  }

  firstSolutionImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.firstSolutionImageSrc = e.target.result;
      };
      this.firstSolutiondisableIcon = false;
      this.showFirstSolutionInput = false;
      reader.readAsDataURL(file);
    }
  }

  removeFirstSolutionImage() {
    this.firstSolutionImageSrc = '/assets/images/photo.png';
    this.firstSolutiondisableIcon = true;
    this.showFirstSolutionInput = true;
  }

  secondSolutionImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.secondSolutionImageSrc = e.target.result;
      };
      this.secondSolutiondisableIcon = false;
      this.showSecondSolutionInput = false;
      reader.readAsDataURL(file);
    }
  }

  removeSecondSolutionImage() {
    this.secondSolutionImageSrc = '/assets/images/photo.png';
    this.secondSolutiondisableIcon = true;
    this.showSecondSolutionInput = true;
  }

  thirdSolutionImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.thirdSolutionImageSrc = e.target.result;
      };
      this.thirdSolutiondisableIcon = false;
      this.showThirdSolutionInput = false;
      reader.readAsDataURL(file);
    }
  }

  removeThirdSolutionImage() {
    this.thirdSolutionImageSrc = '/assets/images/photo.png';
    this.thirdSolutiondisableIcon = true;
    this.showThirdSolutionInput = true;
  }

  fourthSolutionImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fourthSolutionImageSrc = e.target.result;
      };
      this.disableIcon = false;
      this.showFourthSolutionInput = false;
      reader.readAsDataURL(file);
    }
  }
  removeFourthSolutionImage() {
    this.fourthSolutionImageSrc = '/assets/images/photo.png';
    this.fourthSolutiondisableIcon = true;
    this.showFourthSolutionInput = true;
  }

  leftFirstImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.leftFirstImageSrc = e.target.result;
      };
      this.leftFirstdisableIcon = false;
      this.showLeftFirstInput = false;
      reader.readAsDataURL(file);
    }
  }

  leftFirstremoveImage() {
    this.leftFirstImageSrc = '/assets/images/photo.png';
    this.leftFirstdisableIcon = true;
    this.showLeftFirstInput = true;
  }

  rightFirstImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.rightFirstImageSrc = e.target.result;
      };
      this.rightFirstdisableIcon = false;
      this.showRightFirstInput = false;
      reader.readAsDataURL(file);
    }
  }

  rightFirstremoveImage() {
    this.rightFirstImageSrc = '/assets/images/photo.png';
    this.rightFirstdisableIcon = true;
    this.showRightFirstInput = true;
  }

  leftSecondImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.leftSecondImageSrc = e.target.result;
      };
      this.leftSeconddisableIcon = false;
      this.showLeftSecondInput = false;
      reader.readAsDataURL(file);
    }
  }

  leftSecondremoveImage() {
    this.leftSecondImageSrc = '/assets/images/photo.png';
    this.leftSeconddisableIcon = true;
    this.showLeftSecondInput = true;
  }


  rightSecondImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.rightSecondImageSrc = e.target.result;
      };
      this.rightSeconddisableIcon = false;
      this.showRightSecondInput = false;
      reader.readAsDataURL(file);
    }
  }

  rightSecondremoveImage() {
    this.rightSecondImageSrc = '/assets/images/photo.png';
    this.rightSeconddisableIcon = true;
    this.showRightSecondInput = true;
  }

  leftThirdImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.leftThirdImageSrc = e.target.result;
      };
      this.leftThirddisableIcon = false;
      this.showLeftThirdInput = false;
      reader.readAsDataURL(file);
    }
  }

  leftThirdremoveImage() {
    this.leftThirdImageSrc = '/assets/images/photo.png';
    this.leftThirddisableIcon = true;
    this.showLeftThirdInput = true;
  }


  rightThirdImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.rightThirdImageSrc = e.target.result;
      };
      this.rightThirddisableIcon = false;
      this.showRightThirdInput = false;
      reader.readAsDataURL(file);
    }
  }

  rightThirdremoveImage() {
    this.rightThirdImageSrc = '/assets/images/photo.png';
    this.rightThirddisableIcon = true;
    this.showRightThirdInput = true;
  }


  leftFourthImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.leftFourthImageSrc = e.target.result;
      };
      this.leftFourthdisableIcon = false;
      this.showLeftFourthInput = false;
      reader.readAsDataURL(file);
    }
  }

  leftFourthremoveImage() {
    this.leftFourthImageSrc = '/assets/images/photo.png';
    this.leftFourthdisableIcon = true;
    this.showLeftFourthInput = true;
  }


  rightFourthImageURL(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.rightFourthImageSrc = e.target.result;
      };
      this.rightFourthdisableIcon = false;
      this.showRightFourthInput = false;
      reader.readAsDataURL(file);
    }
  }

  rightFourthremoveImage() {
    this.rightFourthImageSrc = '/assets/images/photo.png';
    this.rightFourthdisableIcon = true;
    this.showRightFourthInput = true;
  }

  addRow() {
    const newItem = { id: this.items.length + 1, input1: '', input2: '', imageSrc: '', disableIcon: false };
    this.items.push(newItem);
  }
  deleteRow(index: number) {
    this.items.splice(index, 1);
  }


  getFirstInputValue(event: any): void {
    if (event.target.value != '') {
      this.showFirstImage = false;
    }
    else {
      this.showFirstImage = true;
    }
  }
  getSecondInputValue(event: any): void {
    if (event.target.value != '') {
      this.showSecondImage = false;
    }
    else {
      this.showSecondImage = true;
    }
  }

  getThirdInputValue(event: any): void {
    if (event.target.value != '') {
      this.showThirdImage = false;
    }
    else {
      this.showThirdImage = true;
    }
  }

  getFourthInputValue(event: any): void {
    if (event.target.value != '') {
      this.showFourthImage = false;
    }
    else {
      this.showFourthImage = true;
    }
  }
  getClueInputValue(event: any): void {
    if (event.target.value != '') {
      this.showClueImage = false;
    }
    else {
      this.showClueImage = true;
    }
  }

  getFirstSolutionValue(event: any): void {
    if (event.target.value != '') {
      this.showFirstSolutionImage = false;
    }
    else {
      this.showFirstSolutionImage = true;
    }
  }

  getSecondSolutionValue(event: any): void {
    if (event.target.value != '') {
      this.showSecondSolutionImage = false;
    }
    else {
      this.showSecondSolutionImage = true;
    }
  }

  getThirdSolutionValue(event: any): void {
    if (event.target.value != '') {
      this.showThirdSolutionImage = false;
    }
    else {
      this.showThirdSolutionImage = true;
    }
  }

  getFourthSolutionValue(event: any): void {
    if (event.target.value != '') {
      this.showFourthSolutionImage = false;
    }
    else {
      this.showFourthSolutionImage = true;
    }
  }

  getDynamicInputValue(event: any, index: number) {
    if (event.target.value != '') {
      this.inputs[index].showDynamicInput = false;
    }
    else {
      this.inputs[index].showDynamicInput = true;
    }
  }

  getLeftFirstValue(event: any): void {
    if (event.target.value != '') {
      this.showLeftFirstImage = false;
    }
    else {
      this.showLeftFirstImage = true;
    }
  }
  getRightFirstValue(event: any): void {
    if (event.target.value != '') {
      this.showRightFirstImage = false;
    }
    else {
      this.showRightFirstImage = true;
    }
  }

  getLeftSecondValue(event: any): void {
    if (event.target.value != '') {
      this.showLeftSecondImage = false;
    }
    else {
      this.showLeftSecondImage = true;
    }
  }
  getRightSecondValue(event: any): void {
    if (event.target.value != '') {
      this.showRightSecondImage = false;
    }
    else {
      this.showRightSecondImage = true;
    }
  }
  getLeftThirdValue(event: any): void {
    if (event.target.value != '') {
      this.showLeftThirdImage = false;
    }
    else {
      this.showLeftThirdImage = true;
    }
  }
  getRightThirdValue(event: any): void {
    if (event.target.value != '') {
      this.showRightThirdImage = false;
    }
    else {
      this.showRightThirdImage = true;
    }
  }
  getLeftFourthValue(event: any): void {
    if (event.target.value != '') {
      this.showLeftFourthImage = false;
    }
    else {
      this.showLeftFourthImage = true;
    }
  }
  getRightFourthValue(event: any): void {
    if (event.target.value != '') {
      this.showRightFourthImage = false;
    }
    else {
      this.showRightFourthImage = true;
    }
  }

  back() {
    this.questionService.Question.next({ Mode: 'LIST' });
  }

  selectType(event: any) {
    this.Type = event.target.value
    this.classOptions = this.class_options[this.Type]
  }
  selectChange(event: any): void {
    this.selectedClass = event.target.value;
    this.mediumOptions[0] = "English";
  }
  selectMedium(event: any): void {
    this.selectedSubject = event.target.value;
    this.subjectOptions = this.selectsubject[this.selectedClass]
  }


  selectSubject(event: any): void {
    this.selectSubjects = event.target.value;
    this.questionService.getChapterOptions(this.selectedClass, this.selectSubjects).subscribe(
      (response: any) => {
        this.chapterOptions = response.data.map((item: any) => item.chapter);
      });
  }

  selectChapter(event: any): void {
    this.selectedChapter = event.target.value;
    this.questionService.getTopicOptions(this.selectedClass,this.selectSubjects,this.selectedChapter).subscribe(
      (response: any) => {
        this.topicOptions = response.data.map((item: any) => item.topic);
      })
  }


  selectTopic(event: any): void {
    this.selectedTopic = event.target.value;
    const selectedType = this.Type;
    const selectedClassValue = this.selectedClass;
    const selectMediumValue = this.selectedSubject;
    const selectedSubject = this.selectSubjects;
    const selectChapterValue = this.selectedChapter;
    const selectTopicValue = this.selectedTopic;
    const selectSubTopicValue = this.selectedSubTopic;
    this.questionService.getSubTopicOptions(selectedType, selectedClassValue, selectMediumValue, selectedSubject, selectChapterValue, selectTopicValue).subscribe(
      (response: any) => {
        const data = response.data;
        if (!data.sub_topic || data.sub_topic.trim() === '') {
          this.showInput = true;
          this.setRead = false;
        }
        const subTopic = data.map((item: any) => item.sub_topic);
        if (subTopic != null) { this.addDetails.q_sub_topic = subTopic; }
      });
  }


  selectSubTopic(event: any): void {
    this.selectedConcept = event.target.value;
    const selectConceptValue = this.selectedConcept;
    const selectSubTopicValue = this.selectedSubTopic;
    const selectTopicValue = this.selectedTopic;
    const selectChapterValue = this.selectedChapter;
    const selectTermValue = this.selectedTerm;
    const selectMediumValue = this.selectedSubject;
    const selectedClassValue = this.selectedClass;
    this.questionService.getConceptOptions(selectedClassValue, selectMediumValue, selectTermValue, selectChapterValue, selectTopicValue, selectSubTopicValue, selectConceptValue).subscribe(
      (response: any) => {
        const data = response.data;
        this.conceptOptions = data;
      })
  }

  selectConcept(event: any): void {
    this.selectedLearning = event.target.value;
    const selectLearningValue = this.selectedLearning;
    const selectConceptValue = this.selectedConcept;
    const selectSubTopicValue = this.selectedSubTopic;
    const selectTopicValue = this.selectedTopic;
    const selectChapterValue = this.selectedChapter;
    const selectTermValue = this.selectedTerm;
    const selectMediumValue = this.selectedSubject;
    const selectedClassValue = this.selectedClass;
    this.questionService.getLearningOptions(selectedClassValue, selectMediumValue, selectTermValue, selectChapterValue, selectTopicValue, selectSubTopicValue, selectConceptValue, selectLearningValue).subscribe(
      (response: any) => {
        const data = response.data;
        this.learningOptions = data;
      })
  }

  nextStep(form: NgForm) {
    this.detailsForm = form;
    if (form.valid) {
      this.formData = form.value;
      this.currentStep = 2;
      if (this.mode === 'EDIT') {
        this.questionAdd.clue_text = this.editquestion.clue_text
        this.showChoices = this.editquestion.choices
        this.addChoices.choice_text = this.editquestion.choices.map((choice: any) => choice.choice_text);
        this.addChoices.choice_notes = this.editquestion.choices.map((choice: any) => choice.choice_notes);
        this.addChoices.choice_correct_yn = this.editquestion.choices.map((choice: any) => choice.choice_correct_yn);
      }
      else{
        setTimeout(()=>{
          this.radiochoose(0)
        },100)
      }
    }
  }

  questionCreation(form: NgForm): void {
    console.log("form value",form.value)
    const firstStepData = this.formData;
    const secondStepData = form.value;
    const combinedFormData = { ...firstStepData, ...secondStepData };
    if (!this.checkSelected['Text']){
      combinedFormData.text = null
    }
    if(!this.checkSelected['Image']){
      this.questionImageSrc = ""
    }
    if (this.mode === 'EDIT') {
      var choice_id = this.editquestion.choices.map((choice: any) => choice.choice_id);
      var choice_img = this.editquestion.choices.map((choice: any) => choice.choice_img)
      var choice_link = this.editquestion.choices.map((choice: any) => choice.choice_link)
      var choice_weight = this.editquestion.choices.map((choice: any) => choice.choice_weight)
      var encoded_img_name = this.editquestion.choices.map((choice: any) => choice.encoded_img_name)
      var choice_format = this.editquestion.choices.map((choice: any) => choice.choice_format)
    }
    if (this.radioSelected == 3) {
      this.imageSrcArray = this.items.map(item => item.dynamicImageSrc);
      this.solutionImageSrcArray = this.items.map(item => item.dynamicsolutionImageSrc);
    }
    // console.log("this.edits",this.items)
    if (this.questionAdd.format === null || this.questionAdd.format === undefined || this.questionAdd.format === 0) {
      this.isQFormatInvalid = true;
    }
    if (form.valid && this.isAtLeastOneCheckboxSelected) {
      let questiondata = {}
      if (this.mode === 'EDIT') {
        const questionData: questionAdd = {
          type: combinedFormData.type,
          class: combinedFormData.class,
          medium: combinedFormData.medium,
          subject: combinedFormData.subject,
          chapter: combinedFormData.chapter,
          topic: combinedFormData.topic,
          sub_topic: combinedFormData.sub_topic || null,
          difficulty: combinedFormData.difficulty,
          format: combinedFormData.format,
          text: combinedFormData.text,
          img: this.questionImageSrc,
          clue_text: this.questionAdd.clue_text,
          clue_img: this.clueImageSrc || null,
          notes: combinedFormData.notes || null,
          notes_img: combinedFormData.notes_img || null,
          link: combinedFormData.link || null,
          qset: combinedFormData.qset || null,
          seq_no: combinedFormData.seq_no || null,
          choices: Array.from({ length: 4 }, (_, index) => {
            const choice: any = {
              // choice_id: index,
              choice_id: choice_id[index] || index,
              choice_text: combinedFormData[`choice_text${index}`],
              choice_img: this.imageSrcArray[index] || null,
              choice_correct_yn: combinedFormData[`choice_correct_yn${index}`],
              choice_notes: combinedFormData[`choice_notes${index}`],
              choice_notes_img: this.solutionImageSrcArray[index],
              choice_link: choice_link[index] || null,
              choice_weight: choice_weight[index] || null,
              encoded_img_name: encoded_img_name[index] || null,
              choice_format: choice_format[index] || null
            };
            return choice;
          }).filter(choice => choice.choice_text !== undefined || choice.choice_img !== undefined),
        };
        questiondata = questionData
        console.log("questiondata", questiondata)
      }
      if (this.mode != 'EDIT') {
        const questionData: questionAdd = {
          type: combinedFormData.type,
          class: combinedFormData.class,
          medium: combinedFormData.medium,
          subject: combinedFormData.subject,
          chapter: combinedFormData.chapter,
          topic: combinedFormData.topic,
          sub_topic: combinedFormData.sub_topic,
          difficulty: combinedFormData.difficulty,
          format: combinedFormData.format,
          text: combinedFormData.text,
          img: this.questionImageSrc,
          clue_text: this.questionAdd.clue_text,
          clue_img: this.clueImageSrc,
          notes: combinedFormData.notes,
          notes_img: combinedFormData.notes_img,
          link: combinedFormData.link,
          qset: combinedFormData.qset,
          seq_no: combinedFormData.seq_no,
          choices: Array.from({ length: 4 }, (_, index) => {
            const choice: any = {
              choice_id: index,
              choice_text: combinedFormData[`choice_text${index}`],
              choice_img: this.imageSrcArray[index],
              choice_correct_yn: combinedFormData[`choice_correct_yn${index}`],
              choice_notes: combinedFormData[`choice_notes${index}`],
              choice_notes_img: this.solutionImageSrcArray[index]
            };
            return choice;
          }).filter(choice => choice.choice_text !== undefined || choice.choice_img !== undefined),
        };
        questiondata = questionData
      }

      console.log("questionData", questiondata)

      if (this.mode != 'EDIT') {
        this.questionService.createQuestionAnswer(questiondata).subscribe({
          next: (response: any) => {
            console.log(response);
            this.questionService.submitQuestionAnswer(response.q_id).subscribe({
              next: (response: any) => {
                alert("Added Successfully");
                this.questionService.Question.next({ Mode: 'LIST' });
              }
            })
          },
          error: (error) => {
            console.error('API error:', error);
          }
        });
      }
      // if (this.mode === 'EDIT') {
      //   this.questionService.updateQuestionAnswer(questiondata, this.current_editing_id).subscribe({
      //     next: (response) => {
      //       console.log("update request", response);
      //       this.questionService.submitQuestionAnswer(this.current_editing_id).subscribe({
      //         next: (response: any) => {
      //           alert("Updated Successfully");
      //           this.questionService.Question.next({ Mode: 'LIST' });
      //         }
      //       })
      //     },
      //     error: (error) => {
      //       console.error('API error:', error);
      //     }
      //   });
      // }
    } else {
      // Log invalid fields
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        if (control.invalid) {
          console.log(`${field} is invalid. Reason: ${JSON.stringify(control.errors)}`);
          console.log("value", control.value)
        }
      });
    }
  }


  previousStep() {
    this.currentStep = Math.max(1, this.currentStep - 1);
  }

  reason(json: any) {
    var parsedData = JSON.parse(json);

    // Step 2: Access the "notes" property
    var notes = parsedData[0].notes;
    return notes;
  }
}
