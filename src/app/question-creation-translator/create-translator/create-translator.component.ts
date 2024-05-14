import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { QuestionCreationService } from '../question-creation-translator.service';
import { addChoices, addDetails, createQuestion, questionAdd } from '../question-translator.model';
import * as CustomEditor from '../../../assets/ckeditor.js';
import { NgForm } from '@angular/forms';
import { authService } from 'src/app/auth.service';

@Component({
  selector: 'app-create-translator',
  templateUrl: './create-translator.component.html',
  styleUrls: ['./create-translator.component.css']
})

export class CreateTranslatorComponent implements OnInit {
  @ViewChild('questionForm', { static: false }) questionForm!: NgForm
  @ViewChild('fileinputquestionimgtn') fileinputquestionimgtn!: ElementRef;
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
  questionImageSrc_tn!: string | null;
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
  public questionDisableIcon_tn = false;
  public clueDisableIcon = false;
  public clueDisableIcon_tn = false
  public firstSolutiondisableIcon = false;
  public secondSolutiondisableIcon = false;
  public thirdSolutiondisableIcon = false;
  public fourthSolutiondisableIcon = false;
  public dynamicdisableIcon = false;
  public mode: any = ""
  items: any[] = [{ id: 1, input1: '', input2: '', imageSrc: '', disableIcon: false }];
  // items: { id: number, imageSrc: string, disableIcon: boolean }[] = [];
  // classOptions: number[] = Array.from({ length: 4 }, (_, index) => index + 9);
  showChoices: any[] = [];
  showChoices_tn: any[] = [];
  public questionAdd = new questionAdd();
  public text_tn: any;
  public img_tn: any;
  public clueImageSrc_tn: any;
  public clue_text_tn: any;
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
  public showClueImage_tn: boolean = true;
  public showDynamicImage: boolean = true;
  public showFirstSolutionImage: boolean = true;
  public showSecondSolutionImage: boolean = true;
  public showThirdSolutionImage: boolean = true;
  public showFourthSolutionImage: boolean = true;
  public showDynamicInput: boolean = true;
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
  public showEditors_solution: boolean[] = [true,true,true,true];
  public showEditors_tn: boolean[] = [];
  public showEditors_tn_solution: boolean[] = [true,true,true,true];
  public showChoiceInput: boolean[] = [];
  public showChoiceInput_solution: boolean[]=[];
  public showChoiceInput_tn: boolean[] = [];
  public showChoiceInput_tn_solution: boolean[]=[];
  public editorContent: string = '';
  public decodedContent: string = '';
  @ViewChild('editor') editor: any;
  editorInstance: any;
  showQuestionEditor = true;
  showQuestionImage = false;
  showQuestionImage_tn = false;
  isQFormatInvalid = false;
  isAtLeastOneCheckboxSelected = false;
  @ViewChildren('inputElement') inputElements!: QueryList<ElementRef>;
  //Answer Choices
  public Choices: any[] = [];
  public editquestion: any = {}
  showinput: boolean[] = [true, true, true, true];
  showimage: boolean[] = [true, true, true, true];
  imageSrcArray: string[] = [];
  imageSrcArray_tn: string[] = [];
  disableIconArray: boolean[] = [];
  disableIconArray_tn: boolean[] = [];
  showSolutionInput: boolean[] = Array(this.showChoices.length).fill(false);
  showSolutionInput_tn: boolean[] = Array(this.showChoices_tn.length).fill(false);
  showSolutionImage: boolean[] = [];
  showSolutionImage_tn: boolean[] = [];
  solutionImageSrcArray: string[] = [];
  solutionImageSrcArraytn: string[] = [];
  solutionDisableIconArray: boolean[] = [];
  solutionDisableIconArraytn: boolean[] = [];
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
  typeOptions: any[] = [];
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
      this.showChoices_tn.push({
        choice_id: i + 1,
        // choice_text: null,
        choice_text_tn: null,
        // choice_img: null,
        choice_img_tn: null,
        choice_correct_yn: 0,
        // choice_notes: null,
        choice_notes_tn: null,
        choice_link: null,
        choice_weight: null,
        medinstr_id: 0,
      })
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
                // console.log("editquestion", this.editquestion)
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
                this.text_tn = res.data.text_tn
                this.questionImageSrc_tn = res.data.img_tn
                this.clueImageSrc_tn = res.data.clue_img
                this.clue_text_tn = res.data.clue_text_tn
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
                    this.imageSrcArray_tn.push(res.data.choices[i].choice_img_tn)
                    this.solutionImageSrcArray.push(res.data.choices[i].choice_notes_img)
                    this.solutionImageSrcArraytn.push(res.data.choices[i].choice_notes_img_tn)
                  }
                  else if (res.data.format == 3) {
                    this.items[i].dynamicImageSrc = res.data.choices[i].choice_img
                    this.items[i].dynamicImageSrctn = res.data.choices[i].choice_img_tn
                    this.items[i].dynamicsolutionImageSrc = res.data.choices[i].choice_notes_img
                    this.items[i].dynamicsolutionImageSrctn = res.data.choices[i].choice_notes_img_tn
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
    this.addChoices.choice_text_tn = ["", "", "", ""];
    this.showEditors = Array(this.showChoices.length).fill(false);
    this.showEditors_tn = Array(this.showChoices_tn.length).fill(false);
    this.showChoiceInput = Array(this.showChoices.length).fill(true);
    this.showChoiceInput_tn = Array(this.showChoices_tn.length).fill(true);
    this.userRole = this.auth.getUserRole();
    this.questionService.Question.subscribe((res: any) => {
      this.detailId = res.detailId;
    })
    if(this.userRole === 'Bil.Cre'){
      this.typeOptions = ['JEE','NEET','Foundation'];
    }
    if(this.userRole === 'CUET.Cre'){
      this.typeOptions = ['CUET'];
    }
    else if(this.userRole ==='QApt.Cre'){
      this.typeOptions = ['Quantitative Aptitude 9-10','Quantitative Aptitude 11-12'];
    }
    else if(this.userRole ==='CAff.Cre'){
      this.typeOptions = ['Current Affairs'];
    }
    else if(this.userRole ==='VAty.Cre'){
      this.typeOptions = ['Verbal Ability'];
    }
    else if(this.userRole ==='LVR.Cre'){
      this.typeOptions = ['Logical/Verbal Reasoning'];
    }
    else if(this.userRole ==='DApt.Cre'){
      this.typeOptions = ['Design Aptitude'];
    }
    else if(this.userRole ==='CLAT.Cre'){
      this.typeOptions = ['Legal reasoning/CLAT'];
    }
    else if(this.userRole ==='SCEng.Cre'){
      this.typeOptions = ['Spoken English / Communicative English'];
    }
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

    this.questionForm.form.patchValue(updatedValues);

    const updatedValuestn = choiceCorrectYnValues.reduce((acc, value, index) => {
      acc[`choice_correct_yn_tn${index}`] = value;
      return acc;
    }, {});

    this.questionForm.form.patchValue(updatedValuestn);
  }

  radiochoosetn(i: any) {
    const choiceCorrectYnValues = Array(4).fill(null);  // Assuming you have 4 choices

    // Set the value at index i to i, and others to null
    choiceCorrectYnValues[i] = i;

    // Create a new object with updated choice_correct_yn values
    const updatedValues = choiceCorrectYnValues.reduce((acc, value, index) => {
      acc[`choice_correct_yn${index}`] = value;
      return acc;
    }, {});

    this.questionForm.form.patchValue(updatedValues);

    const updatedValuestn = choiceCorrectYnValues.reduce((acc, value, index) => {
      acc[`choice_correct_yn_tn${index}`] = value;
      return acc;
    }, {});

    this.questionForm.form.patchValue(updatedValuestn);
  }


  firstEditor(index: number) {
    this.showEditors[index] = !this.showEditors[index];
    this.showChoiceInput[index] = !this.showEditors[index];
  }
  firstEditorsolution(index: number) {
    this.showEditors_solution[index] = !this.showEditors_solution[index]
    this.showChoiceInput_solution[index] = !this.showEditors_solution[index]
  }
  firstEditortn(index: number) {
    this.showEditors_tn[index] = !this.showEditors_tn[index];
    this.showChoiceInput_tn[index] = !this.showEditors_tn[index];
  }
  firstEditortnsolution(index: number){
    this.showEditors_tn_solution[index] = !this.showEditors_tn_solution[index]
    this.showChoiceInput_tn_solution[index] = !this.showChoiceInput_tn_solution[index]
  }

  checkboxChange(data: any) {
    const checkboxValue = data.target.value;
    const isChecked = data.target.checked;
    // this.isAtLeastOneCheckboxSelected = Object.values(this.checkSelected).some(value => value);
    if (checkboxValue === "Text") {
      this.showQuestionEditor = isChecked;
      this.checkSelected['Text'] = isChecked
    } else if (checkboxValue === "Image") {
      this.showQuestionImage = isChecked;
      this.showQuestionImage_tn = isChecked
      this.checkSelected['Image'] = isChecked
    }
    this.isAtLeastOneCheckboxSelected = Object.values(this.checkSelected).some(value => value===true);
    console.log("this.isAtLeastOneCheckboxSelected",this.isAtLeastOneCheckboxSelected,this.checkSelected)

    if (this.showQuestionEditor && this.showQuestionImage) {
      this.showQuestionEditor = true;
      this.showQuestionImage = true;
      this.showQuestionImage_tn = true;
    }
    console.log("showQuestionEditor",this.showQuestionEditor)
  }

  choiceImageURL(event: any, index: number): void {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);
    console.log("started")
    this.questionService.uploadimage(formData).subscribe(({
      next: (res: any) => {
        this.imageSrcArray[index] = res.link
        console.log("ended")
        if (Array.isArray(this.addChoices.choice_text)) {
          this.addChoices.choice_text[index] = ""
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
  }
  choiceImageURL_tn(event: any, index: number): void {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);

    this.questionService.uploadimage(formData).subscribe(({
      next: (res: any) => {
        this.imageSrcArray_tn[index] = res.link
        if (Array.isArray(this.addChoices.choice_text_tn)) {
          this.addChoices.choice_text_tn[index] = ""
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
        this.solutionImageSrcArray[i] = res.link
        // if (Array.isArray(this.addChoices.choice_notes)) {
          // this.addChoices.choice_notes[i] = ""
        // }
        // const currentChoice = this.Choices[i];

        // currentChoice.solutionImageSrc_tn = res.link;
        // currentChoice.solutiondisableIcon_tn = false;
        // currentChoice.showSolutionInput_tn = false;
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
  }

  solutionImageURLtn(event: any, i: number) {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);
    this.questionService.uploadimage(formData).subscribe(({
      next: (res: any) => {
        this.solutionImageSrcArraytn[i] = res.link
        // if (Array.isArray(this.addChoices.choice_notes_tn)) {
        //   this.addChoices.choice_notes_tn[i] = ""
        // }

        // const currentChoice = this.Choices[i];
        // currentChoice.solutionImageSrc = res.link;
        // currentChoice.solutiondisableIcon = false;
        // currentChoice.showSolutionInput = false;
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
  }

  removeSolutionImage(i: number) {
    // this.showChoices[i].solutionImageSrc = '/assets/images/photo.png';
    this.solutionImageSrcArray[i] = '';
    this.showChoices[i].solutionImageSrc = '';
    this.showChoices[i].solutiondisableIcon = true;
    this.showChoices[i].showSolutionInput = true;
  }

  removeSolutionImagetn(i: number) {
    this.solutionImageSrcArraytn[i] = '';
    this.showChoices[i].solutionImageSrc_tn = ""
    this.showChoices[i].solutiondisableIcon_tn = true;
    this.showChoices[i].showSolutionInput_tn = true;
  }



  removeImages(i: number) {
    this.showChoices[i].disableIconArray = true;
    this.showChoiceInput[i] = true;
    this.imageSrcArray[i] = '';
  }
  removeImages_tn(i: number) {
    this.showChoices[i].disableIconArray_tn = true;
    this.showChoiceInput_tn[i] = true;
    this.imageSrcArray_tn[i] = '';
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

  getSolutionValue_tn(event: any, index: number): void {
    const currentChoice = this.Choices[index];
    if (event.target.value !== '') {
      currentChoice.showSolutionImage_tn = false;
      currentChoice.showSolutionInput_tn = true;
    } else {
      currentChoice.showSolutionImage_tn = true;
      currentChoice.showSolutionInput_tn = false;
    }
  }





  radioChange(option: any) {
    this.radioSelected = option;
    this.questionAdd.format = option;
    this.isQFormatInvalid = false;
    // if(this.radioSelected == 1 || this.radioSelected == 2){
    //   this.showFormat = true;

    // }
    // else {
    //   this.showFormat = false;

    // }
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

    // const target = event.target as HTMLInputElement;
    // const file = target.files && target.files[0];


    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = (e: any) => {
    //     this.questionImageSrc = e.target.result;
    //     this.questionBase64 = e.target.result.split(',')[1];
    //     // console.log(this.questionImageSrc);
    //     this.questionDisableIcon = false;
    //   };
    //   reader.readAsDataURL(file);
    // }
  }

  questionImageURLtn(event: any) {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);

    this.questionService.uploadimage(formData).subscribe(({
      next: (res: any) => {
        this.questionImageSrc_tn = res.link

        const newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.accept = '.jpg, .jpeg, .png';
        newInput.className = "invisible"
        newInput.addEventListener('change', (newEvent) => this.questionImageURLtn(newEvent));

        const parent = this.fileinputquestionimgtn.nativeElement.parentNode;
        parent.replaceChild(newInput, this.fileinputquestionimgtn.nativeElement);

        // Update the reference to the new input
        this.fileinputquestionimgtn.nativeElement = newInput;
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
  }


  questionRemove() {
    // this.questionImageSrc = '/assets/images/photo.png';
    this.questionImageSrc = '';
    this.questionDisableIcon = true;
    this.cdr.detectChanges();
    this.questionAdd.img = null;
  }
  questionRemovetn() {
    this.questionImageSrc_tn = '';
    this.questionDisableIcon_tn = true;
    this.cdr.detectChanges();
    this.img_tn = null;
  }

  clueImageURL(event: any): void {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);

    this.questionService.uploadimage(formData).subscribe(({
      next: (res: any) => {
        this.clueImageSrc = res.link
        this.clueImageSrc_tn = res.link
        this.questionAdd.clue_text = ""
        this.clue_text_tn = ""
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
    // const target = event.target as HTMLInputElement;
    // const file: File = (target.files as FileList)[0];
    // if (file) {
    //   const reader = new FileReader();
    //   // console.log(reader);
    //   reader.onload = (e: any) => {
    //     this.clueImageSrc = e.target.result;
    //     this.clueBase64 = e.target.result.split(',')[1];
    //     this.clueDisableIcon = false;
    //   };
    //   this.showClue = false;
    //   reader.readAsDataURL(file);
    // }
  }
  clueImageURL_tn(event: any) {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);

    this.questionService.uploadimage(formData).subscribe(({
      next: (res: any) => {
        this.clueImageSrc_tn = res.link
        // this.questionAdd.clue_text = ""
        this.clue_text_tn = ""
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
  }

  clueRemove() {
    // this.clueImageSrc = '/assets/images/photo.png';
    this.clueImageSrc = ''
    this.clueDisableIcon = true;
    this.showClue = true;
  }
  clueRemove_tn() {
    this.clueImageSrc_tn = ''
    this.clueDisableIcon_tn = true;
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
        this.items[index].dynamicImageSrc = res.link;
        this.items[index].dynamicdisableIcon = false;
        this.items[index].showDynamicInput = false;
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
  }
  dynamicImagetn(event: any, index: number): void {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);

    this.questionService.uploadimage(formData).subscribe(({
      next: (res: any) => {
        this.items[index].dynamicImageSrctn = res.link;
        this.items[index].dynamicdisableIcon = false;
        this.items[index].showDynamicInput = false;
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
  }

  dynamicImageSolutiontn(event: any, index: number): void {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image', file);

    this.questionService.uploadimage(formData).subscribe(({
      next: (res: any) => {
        this.items[index].dynamicsolutionImageSrctn = res.link;
        this.items[index].dynamicsolutiondisableIcon = false;
        this.items[index].showDynamicInput = false;
      },
      error: (err: any) => {
        console.log(err);
      }
    }))
  }

  dynamicImageSolution(event: any, index: number): void {
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
    // this.zone.run(() => {
    // console.log(index);
    // console.log(this.items[index].showDynamicInput);
    // this.items[index].dynamicImageSrc = '/assets/images/photo.png';
    // this.items[index].dynamicImageSrc = '';
    // this.items[index].dynamicdisableIcon = true;
    // this.items[index].showDynamicInput = true;
    // console.log(this.items[index].showDynamicInput);
    // });
    this.items[index].dynamicImageSrc = '';
    this.items[index].dynamicdisableIcon = true;
    this.items[index].showDynamicInput = true;

  }
  dynamicremoveImagetn(index: number) {
    this.items[index].dynamicImageSrctn = '';
    this.items[index].dynamicdisableIcon = true;
    this.items[index].showDynamicInput = true;
  }

  dynamicremoveSolution(index: number) {
    this.items[index].dynamicsolutionImageSrc = '';
    this.items[index].dynamicdisableIcon = true;
    this.items[index].showDynamicInput = true;
  }

  dynamicremoveSolutiontn(index: number) {
    this.items[index].dynamicsolutionImageSrctn = '';
    this.items[index].dynamicdisableIcon = true;
    this.items[index].showDynamicInput = true;
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
  getClueInputValue_tn(event: any) {
    if (event.target.value != '') {
      this.showClueImage_tn = false;
    }
    else {
      this.showClueImage_tn = true;
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
    // if (event.target.value != '') {
    //   this.inputs[index].showDynamicInput = false;
    // }
    // else {
    //   this.inputs[index].showDynamicInput = true;
    // }
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

  public class_options: { [key: string]: string[] } = {
    'JEE': ['11', '12'],
    'NEET': ['11', '12'],
    'Foundation': ['9', '10'],
    'CUET':['12'],
    'Quantitative Aptitude 9-10': ['9','10','11','12'],
    'Quantitative Aptitude 11-12' : ['9','10','11','12'],
    'Current Affairs':['11','12'],
    'Verbal Ability': ['9','10','11','12'],
    'Logical/Verbal Reasoning': ['9','10','11','12'],
    'Design Aptitude': ['9','10','11','12'],
    'Legal reasoning/CLAT': ['9','10','11','12'],
    'Spoken English / Communicative English':['9','10','11','12']
  };
  selectType(event: any) {
    this.Type = event.target.value
    this.classOptions = this.class_options[this.Type]
    // this.Type = event.target.value;
    // this.questionService.getType(this.Type).subscribe(({
    //   next: (res: any) => {
    //     this.classOptions = res.data.map((item: any) => item.class);
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   }
    // }))
  }

  selectChange(event: any): void {
    this.selectedClass = event.target.value;
    console.log("class",this.selectedClass)
    this.mediumOptions[0] = "Bilingual";
    var event: any = {}
    event.target = {}
    event.target.value = "Bilingual"
    this.selectMedium(event)
    // this.selectedClass = event.target.value;
    // const selectedType = this.Type;
    // const selectedValue = this.selectedClass;
    // this.questionService.getMediumOptions(selectedType, selectedValue).subscribe(
    //   (response: any) => {
    //     this.mediumOptions = response.data.map((item: any) => item.medium);
    //     var event: any = {}
    //     event.target = {}
    //     event.target.value = "Bilingual"
    //     this.selectMedium(event)
    //   },
    //   (error: any) => {
    //     console.error('Error:', error);
    //   }
    // );
  }

  public selectsubject: { [key: string]: string[] } = {
    '9': ['Maths', 'Chemistry', 'Physics', 'Biology'],
    '10': ['Maths', 'Chemistry', 'Physics', 'Biology'],
    '11': ['Botany', 'Zoology', 'Physics', 'Chemistry', 'Maths'],
    '12': ['Botany', 'Zoology', 'Physics', 'Chemistry', 'Maths']
  };

  public neet_subject:{ [key: string]: string[] } = {
    '11':['Botany','Zoology','Physics','Chemistry'],
    '12':['Botany','Zoology','Physics','Chemistry']
  };

  public jee_subject:{[key: string]: string[]} = {
    '11':['Physics','Chemistry','Maths'],
    '12':['Physics','Chemistry','Maths']
  };
  public cuet_subject:{[key: string]: string[]} = {
    '12':['Accountancy','Economics','Commerce','Business Maths']
  }

  public current_affairs:{[key: string]: string[]} = {
    '11':['Current Affairs'],
    '12':['Current Affairs']
  }

  selectMedium(event: any): void {
    this.selectedSubject = event.target.value;
    this.subjectOptions = this.selectsubject[this.selectedClass]
    if(this.Type =='NEET'){
      this.subjectOptions = this.neet_subject[this.selectedClass]
    }
    else if(this.Type == 'JEE'){
      this.subjectOptions = this.jee_subject[this.selectedClass]
    }
    else if(this.Type == 'Foundation'){
      this.subjectOptions = this.selectsubject[this.selectedClass]
    }
    else if(this.Type == 'CUET'){
      this.subjectOptions = this.cuet_subject[this.selectedClass]
    }
    else if(this.Type == 'Current Affairs'){
      this.subjectOptions = this.current_affairs[this.selectedClass]
    }
    else{
      this.subjectOptions = this.selectsubject[this.selectedClass]
    }
  }


  selectSubject(event: any): void {
    this.selectSubjects = event.target.value;
    const selectedType = this.Type;
    const selectedClassValue = this.selectedClass;
    const selectMediumValue = this.selectedSubject;
    const selectedSubject = this.selectSubjects;
    this.questionService.getChapterOptions(selectedType, selectedClassValue, selectMediumValue, selectedSubject).subscribe(
      (response: any) => {
        const data = response.data;
        // console.log(response);
        this.chapterOptions = data.map((item: any) => item.chapter);
      });
  }

  selectChapter(event: any): void {
    this.selectedChapter = event.target.value;
    const selectedType = this.Type;
    const selectChapterValue = this.selectedChapter;
    const selectedSubjects = this.selectSubjects
    const selectMediumValue = this.selectedSubject;
    const selectedClassValue = this.selectedClass;
    this.questionService.getTopicOptions(selectedType, selectedClassValue, selectMediumValue, selectedSubjects, selectChapterValue).subscribe(
      (response: any) => {
        const data = response.data;
        this.topicOptions = data.map((item: any) => item.topic);
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
        // const taxonomyId = data.map((item:any)=>item.taxonomy_id);

        //   if (data.length > 1) {
        //     this.questionService.getSubTopicOptions(selectedClassValue, selectMediumValue, selectTermValue, selectChapterValue, selectTopicValue, selectSubTopicValue).subscribe(
        //       (subTopicResponse: any) => {
        //         const subTopicData = subTopicResponse.data;
        //         this.subtopicOptions = subTopicData;
        //         this.showSubTopic = true;
        //         this.showInput = true;
        //       });
        //   }
        //  else if (data.length == 1) {
        //     this.questionService.getAllData(taxonomyId).subscribe(
        //       (allDataResponse: any) => {
        //         const allData = allDataResponse.data;
        //         this.showSubTopic = false;
        //         this.showInput = true;
        //         this.subTopicName = allData.sub_topic_name;
        //         this.conceptName = allData.concept_name;
        //         this.learningOutcome = allData.learn_outcome;
        //         this.Competency = allData.comptny;
        //         this.micComptny1 = allData.mic_comptny1;
        //       });
        //     } 
        // this.questionService.getAllData(taxonomyId).subscribe(
        //         (allDataResponse: any) => {
        //           const allData = allDataResponse.data;
        //           this.showSubTopic = false;
        //           this.showInput = true;
        //          if(allData.sub_topic_name !=null) { this.addDetails.q_sub_topic = allData.sub_topic_name;}
        //          if(allData.concept_name !=null) { this.addDetails.q_concept = allData.concept_name; this.showConcept = true;}
        //          if(allData.learn_outcome !=null) { this.addDetails.q_lo = allData.learn_outcome; this.showLo = true; }
        //          if(allData.comptny !=null) { this.addDetails.q_competence = allData.comptny; this.showCompetency = true; }
        //          if(allData.mic_comptny1!=null) { this.addDetails.q_mmcompetence = allData.mic_comptny1; this.showmmc = true; }
        //         });
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
        this.addChoices.choice_text_tn = this.editquestion.choices.map((choice: any) => choice.choice_text_tn);
        this.addChoices.choice_notes = this.editquestion.choices.map((choice: any) => choice.choice_notes);
        this.addChoices.choice_notes_tn = this.editquestion.choices.map((choice: any) => choice.choice_notes_tn);
        this.addChoices.choice_correct_yn = this.editquestion.choices.map((choice: any) => choice.choice_correct_yn);
        this.addChoices.choice_correct_yn_tn = this.editquestion.choices.map((choice: any) => choice.choice_correct_yn);
      }
    }
  }

  questionCreation(form: NgForm): void {
    const firstStepData = this.formData;
    const secondStepData = form.value;
    const combinedFormData = { ...firstStepData, ...secondStepData };
    console.log("firstStepData", firstStepData, "secondStepData", secondStepData)
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
      this.imageSrcArray_tn = this.items.map(item => item.dynamicImageSrctn);
      this.solutionImageSrcArraytn = this.items.map(item => item.dynamicsolutionImageSrctn);
    }

    if (this.questionAdd.format === null || this.questionAdd.format === undefined || this.questionAdd.format === 0) {
      this.isQFormatInvalid = true;
    }
    if (form.valid) {
      let questiondata = {}
      if (this.mode === 'EDIT') {
        const questionData: questionAdd = {
          type: combinedFormData.type,
          class: combinedFormData.class,
          medium: "Bilingual",
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
              choice_text_tn: combinedFormData[`choice_text_tn${index}`],
              choice_img: this.imageSrcArray[index] || null,
              choice_img_tn: this.imageSrcArray_tn[index] || null,
              choice_notes_img: this.solutionImageSrcArray[index],
              choice_notes_img_tn: this.solutionImageSrcArraytn[index],
              choice_correct_yn: combinedFormData[`choice_correct_yn${index}`],
              choice_notes: combinedFormData[`choice_notes${index}`],
              choice_notes_tn: combinedFormData[`choice_notes_tn${index}`],
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
          // medium: combinedFormData.medium,
          medium: "Bilingual",
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
              choice_text_tn: combinedFormData[`choice_text_tn${index}`],
              choice_img: this.imageSrcArray[index],
              choice_img_tn: this.imageSrcArray_tn[index],
              choice_notes_img: this.solutionImageSrcArray[index],
              choice_notes_img_tn: this.solutionImageSrcArraytn[index],
              choice_correct_yn: combinedFormData[`choice_correct_yn${index}`],
              choice_notes: combinedFormData[`choice_notes${index}`],
              choice_notes_tn: combinedFormData[`choice_notes_tn${index}`],
            };
            return choice;
          }).filter(choice => choice.choice_text !== undefined || choice.choice_img !== undefined),
        };
        questiondata = questionData
      }

      let submitquest: any = questiondata
      submitquest['text_tn'] = this.text_tn
      submitquest['img_tn'] = this.questionImageSrc_tn
      // submitquest['clue_img_tn'] = this.clueImageSrc_tn
      submitquest['clue_text_tn'] = this.clue_text_tn
      submitquest['notes_tn'] = ""
      console.log("submitquest", typeof submitquest, submitquest)
      // console.log("submitquest", typeof submitquest, submitquest)

      if (this.mode != 'EDIT') {
        this.questionService.createQuestionAnswer(submitquest).subscribe({
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
      if (this.mode === 'EDIT') {
        this.questionService.updateQuestionAnswer(submitquest, this.current_editing_id).subscribe({
          next: (response) => {
            console.log("update request", response);
            this.questionService.submitQuestionAnswer(this.current_editing_id).subscribe({
              next: (response: any) => {
                alert("Updated Successfully");
                this.questionService.Question.next({ Mode: 'LIST' });
              }
            })
          },
          error: (error) => {
            console.error('API error:', error);
          }
        });
      }
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