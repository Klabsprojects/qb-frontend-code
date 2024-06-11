import { Component, OnInit } from '@angular/core';
import { authService } from '../auth.service';
import { QuestionCreationService } from '../question-creation/question-creation.service';
import { DashboardData } from '../question-creation/question.model';
import { ChartOptions } from 'chart.js';
interface TypeCounts {
  JEE: number;
  NEET: number;
  Foundation: number;
  CUET: number;
  [key: string]: number;
}

interface StatusSplitUp {
  submitted: TypeCounts;
  approved: TypeCounts;
  rejected: TypeCounts;
  resubmitted: TypeCounts;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  list: any[] = [];
  date_list: any[] = [];
  exam_list: any[] = [];
  class_list: any[] = [];
  subject_list: any[] = [];
  Jee_count: any;
  Neet_count: any;
  Foundation_count: any;
  Cuet_count: any;
  dashboardData = new DashboardData();
  showAdmin = false;
  hideCurator = true;
  userRole: String = '';
  ////////////////
  admin: boolean = false;
  teacher: boolean = false;
  creator: boolean = false;
  curator: boolean = false;
  ////////////////
  examtype: any = [];
  subjecttype: any = [
    { label: 'Select', value: '' },
    { label: 'Physics', value: 'Physics' },
    { label: 'Chemistry', value: 'Chemistry' },
    { label: 'Maths', value: 'Maths' },
    { label: 'Botany', value: 'Botany' },
    { label: 'Zoology', value: 'Zoology' },
    { label: 'Biology', value: 'Biology' },
  ];
  classtype: any = [];
  public barChartLegend = true;
  public barChartPlugins = [];
  public startdate: any;
  public enddate: any;
  public Jeepie: any;
  public neetpie: any;
  public foundationpie: any;
  public cuetpie: any;
  public datebarChartData: any;
  public examChartData: any;
  public chapterChartData: any;
  public classChartData: any;
  public jeepieChartLabels: any;
  public jeepieChartDatasets: any;
  public neetpieChartLabels: any;
  public neetpieChartDatasets: any;
  public foundationpieChartLabels: any;
  public foundationpieChartDatasets: any;
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public carddata: any = [
    { submitted: 0, splitup: [0, 0, 0, 0], data: [] },
    { approved: 0, splitup: [0, 0, 0, 0], data: [] },
    { rejected: 0, splitup: [0, 0, 0, 0], data: [] },
    { resubmitted: 0, splitup: [0, 0, 0, 0], data: [] },
  ];
  public card: any = 'Total';
  constructor(
    private auth: authService,
    private questionService: QuestionCreationService
  ) {}

  ngOnInit(): void {
    console.log('userRole', this.auth.getUserRole());
    this.userRole = this.auth.getUserRole();
    this.questionService.getDashboardDetails().subscribe({
      next: (res: any) => {
        const data: DashboardData[] = res.data;
        if (data && data.length > 0) {
          this.dashboardData = data[0];
        }
      },
    });
    this.questionService.getDetails().subscribe({
      next: (response: any) => {
        this.list = response.data;
        this.date_list = response.data;
        this.addstatus();
        this.update_pie_chart(this.list);
        // this.filterByDateRangeAndGetChartData(
        //   this.list,
        //   '2024-02-01',
        //   '2024-05-01'
        // );
        // this.filterBySubjectAndCountChapters(this.list, 'Physics');
        // this.filterByClassAndCountSubjects(this.list, '9');
      },
    });
    if (this.userRole === 'Admin') {
      this.admin = true;
    } else if (this.userRole === 'Teacher') {
      this.teacher = true;
    } else if (
      this.userRole === 'Creator' ||
      this.userRole === 'Translate' ||
      this.userRole === 'Cre.Tra' ||
      this.userRole === 'Bil.Cre' ||
      this.userRole === 'CUET.Cre' ||
      this.userRole === 'QApt.Cre' ||
      this.userRole === 'CAff.Cre' ||
      this.userRole === 'VAty.Cre' ||
      this.userRole === 'LVR.Cre' ||
      this.userRole === 'DApt.Cre' ||
      this.userRole === 'CLAT.Cre' ||
      this.userRole === 'SCEng.Cre'
    ) {
      this.creator = true;
    } else if (
      this.userRole === 'Curator' ||
      this.userRole === 'Bil.Cur' ||
      this.userRole === 'CUET.Cur' ||
      this.userRole === 'QApt.Cur' ||
      this.userRole === 'CAff.Cur' ||
      this.userRole === 'VAty.Cur' ||
      this.userRole === 'LVR.Cur' ||
      this.userRole === 'DApt.Cur' ||
      this.userRole === 'CLAT.Cur' ||
      this.userRole === 'SCEng.Cur'
    ) {
      this.curator = true;
    }
    if (this.auth.getUserRole() == 'Admin') {
      this.showAdmin = true;
    } else if (this.auth.getUserRole() == 'Curator') {
      this.hideCurator = false;
    }
  }
  update_pie_chart(list: any, card?: string) {
    if (!card) {
      this.card = 'Total';
    } else {
      this.card = card;
    }
    this.date_list = list;
    this.Jee_count = this.countQuestionsBySubject(list, 'JEE');
    this.Jeepie = {
      labels: Object.keys(this.Jee_count),
      datasets: [
        {
          label: 'Questions',
          data: Object.values(this.Jee_count),
        },
      ],
    };
    this.jeepieChartDatasets = [
      {
        data: this.Jeepie.datasets[0].data,
      },
    ];
    this.jeepieChartLabels = this.Jeepie.labels;

    this.Neet_count = this.countQuestionsBySubject(list, 'NEET');
    this.neetpie = {
      labels: Object.keys(this.Neet_count),
      datasets: [
        {
          label: 'Questions',
          data: Object.values(this.Neet_count),
        },
      ],
    };
    this.neetpieChartDatasets = [
      {
        data: this.neetpie.datasets[0].data,
      },
    ];
    this.neetpieChartLabels = this.neetpie.labels;

    this.Foundation_count = this.countQuestionsBySubject(list, 'Foundation');
    this.foundationpie = {
      labels: Object.keys(this.Foundation_count),
      datasets: [
        {
          label: 'Questions',
          data: Object.values(this.Foundation_count),
        },
      ],
    };
    this.foundationpieChartDatasets = [
      {
        data: this.foundationpie.datasets[0].data,
      },
    ];
    this.foundationpieChartLabels = this.foundationpie.labels;

    this.Cuet_count = this.countQuestionsBySubject(list, 'CUET');
    this.cuetpie = {
      labels: Object.keys(this.Cuet_count),
      datasets: [
        {
          label: 'Questions',
          data: Object.values(this.Cuet_count),
        },
      ],
    };
  }

  countQuestionsBySubject(
    dataArray: any[],
    type?: any
  ): { [key: string]: number } {
    var jeeExams;
    // First filter the array to include only JEE exam objects
    if (type) {
      jeeExams = dataArray.filter((item) => item.type === type);
    } else {
      jeeExams = dataArray;
    }

    // Initialize an empty object to store the count of questions per subject
    const subjectCount: { [key: string]: number } = {};

    // Iterate over the filtered JEE exams
    jeeExams.forEach((item) => {
      const subject = item.subject;
      if (subject) {
        // If the subject is already in the object, increment its count
        if (subjectCount[subject]) {
          subjectCount[subject]++;
        } else {
          // If the subject is not in the object, add it with a count of 1
          subjectCount[subject] = 1;
        }
      }
    });

    return subjectCount;
  }

  filterByDateRangeAndGetChartData(
    dataArray: any,
    startDate?: string,
    endDate?: string
  ) {

    console.log("dataArray length", dataArray.length);
    const filteredArray: any = [];

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const monthTypeMap = new Map<string, Map<string, number>>();
      let i=0;
      dataArray.forEach((item: any) => {
        // if (item.submitted) {
          let submittedDate:any;
          if(this.card=='Submitted'){
            submittedDate = new Date(item.submitted);
          }
          else if(this.card=='Approved'){
            submittedDate = new Date(item.vetted);
          }
          else if(this.card=='Rejected'){
            submittedDate = new Date(item.rejected);
          }
          else if(this.card=='ReSubmitted'){
            submittedDate = new Date(item.submitted);
          }
          // if (submittedDate >= start && submittedDate <= end) {
          if (start <= submittedDate && submittedDate <= end) {

            i = i+1;
            const monthName = submittedDate.toLocaleString('default', {
              month: 'long',
            });
            const examType = item.type;

            if (!monthTypeMap.has(monthName)) {
              monthTypeMap.set(monthName, new Map<string, number>());
            }

            const typeMap = monthTypeMap.get(monthName);
            if (typeMap) {
              if (!typeMap.has(examType)) {
                typeMap.set(examType, 0);
              }
              typeMap.set(examType, (typeMap.get(examType) ?? 0) + 1);
            }

            filteredArray.push(item);
          }
          else{
            console.log('start',start.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'}),'submittedDate',submittedDate.getDate(),'end',end.getDate());
          }
        // }
      });
      console.log("i",i)
      const months = Array.from(monthTypeMap.keys());
      const examTypesSet = new Set<string>();
      monthTypeMap.forEach((typeMap) => {
        Array.from(typeMap.keys()).forEach((examType) =>
          examTypesSet.add(examType)
        );
      });
      const examTypes = Array.from(examTypesSet);

      const datasets = examTypes.map((examType) => {
        return {
          label: examType,
          data: months.map((month) => {
            const typeMap = monthTypeMap.get(month);
            return typeMap?.get(examType) ?? 0;
          }),
        };
      });

      this.datebarChartData = {
        labels: months,
        datasets: datasets,
      };
      this.examtype = [];
      this.examtype = datasets.map((item) => ({
        label: item.label,
        value: item.label,
      }));
      this.exam_list = filteredArray;

      console.log('datebarChartData', this.datebarChartData, this.examtype);
    }
  }
  ///////////////

  getSubjectCountByType(data: any, examType: string) {
    // Filter the array based on the exam type
    const filteredExams = data.filter((exam: any) => exam.type === examType);

    // Create a map to count the subjects for each class
    const classSubjectCount: { [key: string]: { [subject: string]: number } } =
      {};

    filteredExams.forEach((exam: any) => {
      if (!classSubjectCount[exam.class]) {
        classSubjectCount[exam.class] = {};
      }
      if (!classSubjectCount[exam.class][exam.subject]) {
        classSubjectCount[exam.class][exam.subject] = 0;
      }
      classSubjectCount[exam.class][exam.subject]++;
    });

    // Prepare the JSON output
    this.examChartData = {
      labels: Object.keys(classSubjectCount),
      datasets: [],
    };

    // Get the subjects
    const subjects = new Set<string>();
    Object.values(classSubjectCount).forEach((subjectsCount) => {
      Object.keys(subjectsCount).forEach((subject) => subjects.add(subject));
    });

    // Populate the datasets
    subjects.forEach((subject) => {
      const dataset: any = {
        label: subject,
        data: [],
      };
      Object.keys(classSubjectCount).forEach((className) => {
        dataset.data.push(classSubjectCount[className][subject] || 0);
      });
      this.examChartData.datasets.push(dataset);
    });
    this.classtype = [];
    for (let i = 0; i < this.examChartData.labels.length; i++) {
      this.classtype.push({
        label: this.examChartData.labels[i],
        value: this.examChartData.labels[i],
      });
    }
    this.class_list = filteredExams;
    console.log('this.examChartData', this.examChartData);
  }
  ////////////
  filterByClassAndCountSubjects(questions: any, className: string) {
    // Filter questions by the specified class
    const filteredQuestions = questions.filter(
      (question: any) => question.class === className
    );

    // Count the occurrences of each subject
    const subjectCounts: { [key: string]: number } = {};
    filteredQuestions.forEach((question: any) => {
      if (subjectCounts[question.subject]) {
        subjectCounts[question.subject]++;
      } else {
        subjectCounts[question.subject] = 1;
      }
    });

    // Format the result as required
    const labels = [className + 'th Standard'];
    const datasets = Object.keys(subjectCounts).map((subject) => ({
      label: subject,
      data: [subjectCounts[subject]],
    }));

    this.classChartData = {
      labels: labels,
      datasets: datasets,
    };
    this.subjecttype = [];
    this.subjecttype = datasets.map((item) => ({
      label: item.label,
      value: item.label,
    }));
    this.subject_list = filteredQuestions;
    console.log('classChartData', this.classChartData);
  }
  ///////////
  filterBySubjectAndCountChapters(questions: any, subject: string) {
    // Filter questions by the specified subject
    const filteredQuestions = questions.filter(
      (question: any) => question.subject === subject
    );

    // Count the occurrences of each chapter
    const chapterCounts: { [key: string]: number } = {};
    filteredQuestions.forEach((question: any) => {
      if (chapterCounts[question.chapter]) {
        chapterCounts[question.chapter]++;
      } else {
        chapterCounts[question.chapter] = 1;
      }
    });

    // Format the result as required
    const labels = [subject];
    const datasets = Object.keys(chapterCounts).map((chapter) => ({
      label: chapter,
      data: [chapterCounts[chapter]],
    }));

    this.chapterChartData = {
      labels: labels,
      datasets: datasets,
    };
    console.log();
    // this.list1 = filteredQuestions;
  }
  addstatus() {
    this.list.forEach((obj: any) => {
      obj['status'] = this.latestTimestamp(obj); // Add your new key-value pair here
    });
    console.log('this.list', this.list);
    this.get_card_data(this.list);
  }
  latestTimestamp(data: any): string {
    if (
      data.submitted !== null &&
      data.rejected !== null &&
      data.vetted === null
    ) {
      return 'Resubmitted';
    } else if (
      data.submitted !== null &&
      data.rejected === null &&
      data.vetted === null
    ) {
      return 'Submitted';
    } else if (
      data.rejected !== null &&
      data.submitted === null &&
      data.vetted === null
    ) {
      return 'Rejected';
    } else if (data.vetted !== null) {
      return 'Approved';
    } else {
      return 'Draft'; // Or handle any other cases
    }
  }
  get_card_data(data: any) {
    this.carddata[0].submitted = data.filter(
      (item: any) => item.status === 'Submitted'
    ).length;
    this.carddata[0].data = data.filter(
      (item: any) => item.status === 'Submitted'
    );
    this.carddata[0].splitup[0] = this.carddata[0].data.filter(
      (item: any) => item.type === 'JEE'
    ).length;
    this.carddata[0].splitup[1] = this.carddata[0].data.filter(
      (item: any) => item.type === 'NEET'
    ).length;
    this.carddata[0].splitup[2] = this.carddata[0].data.filter(
      (item: any) => item.type === 'Foundation'
    ).length;
    this.carddata[0].splitup[3] = this.carddata[0].data.filter(
      (item: any) => item.type === 'CUET'
    ).length;
    /////////////////
    this.carddata[1].approved = data.filter(
      (item: any) => item.status === 'Approved'
    ).length;
    this.carddata[1].data = data.filter(
      (item: any) => item.status === 'Approved'
    );
    this.carddata[1].splitup[0] = this.carddata[1].data.filter(
      (item: any) => item.type === 'JEE'
    ).length;
    this.carddata[1].splitup[1] = this.carddata[1].data.filter(
      (item: any) => item.type === 'NEET'
    ).length;
    this.carddata[1].splitup[2] = this.carddata[1].data.filter(
      (item: any) => item.type === 'Foundation'
    ).length;
    this.carddata[1].splitup[3] = this.carddata[1].data.filter(
      (item: any) => item.type === 'CUET'
    ).length;
    /////////////////
    this.carddata[2].rejected = data.filter(
      (item: any) => item.status === 'Rejected'
    ).length;
    this.carddata[2].data = data.filter(
      (item: any) => item.status === 'Rejected'
    );
    this.carddata[2].splitup[0] = this.carddata[2].data.filter(
      (item: any) => item.type === 'JEE'
    ).length;
    this.carddata[2].splitup[1] = this.carddata[2].data.filter(
      (item: any) => item.type === 'NEET'
    ).length;
    this.carddata[2].splitup[2] = this.carddata[2].data.filter(
      (item: any) => item.type === 'Foundation'
    ).length;
    this.carddata[2].splitup[3] = this.carddata[2].data.filter(
      (item: any) => item.type === 'CUET'
    ).length;
    ////////////////
    this.carddata[3].resubmitted = data.filter(
      (item: any) => item.status === 'Resubmitted'
    ).length;
    this.carddata[3].data = data.filter(
      (item: any) => item.status === 'Resubmitted'
    );
    this.carddata[3].splitup[0] = this.carddata[3].data.filter(
      (item: any) => item.type === 'JEE'
    ).length;
    this.carddata[3].splitup[1] = this.carddata[3].data.filter(
      (item: any) => item.type === 'NEET'
    ).length;
    this.carddata[3].splitup[2] = this.carddata[3].data.filter(
      (item: any) => item.type === 'Foundation'
    ).length;
    this.carddata[3].splitup[3] = this.carddata[3].data.filter(
      (item: any) => item.type === 'CUET'
    ).length;
    console.log('carddata', this.carddata);
  }
}
