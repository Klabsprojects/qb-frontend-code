import { Component, OnInit } from '@angular/core';
import { authService } from '../auth.service';
import { QuestionCreationService } from '../question-creation/question-creation.service';
import { DashboardData } from '../question-creation/question.model';
import { ChartConfiguration } from 'chart.js';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  list: any[] = [];
  list1:any[] = [];
  Jee_count: any;
  Neet_count: any;
  Foundation_count: any;
  Cuet_count: any;
  dashboardData = new DashboardData();
  showAdmin = false;
  hideCurator = true;
  userRole: String = '';
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
          console.log('this.dashboardData', this.dashboardData);
        }
      },
    });
    this.questionService.getDetails().subscribe({
      next: (response: any) => {
        this.list = response.data;

        this.Jee_count = this.countQuestionsBySubject(this.list, 'JEE');
        this.JEEChartLabels = Object.keys(this.Jee_count);
        this.JEEChartDatasets = [{ data: Object.values(this.Jee_count) }];

        this.Neet_count = this.countQuestionsBySubject(this.list, 'NEET');
        this.NEETChartLabels = Object.keys(this.Neet_count);
        this.NEETChartDatasets = [{ data: Object.values(this.Neet_count) }];

        this.Foundation_count = this.countQuestionsBySubject(this.list,'Foundation');
        this.FoundationChartLabels = Object.keys(this.Foundation_count);
        this.FoundationChartDatasets = [
          { data: Object.values(this.Foundation_count) },
        ];

        this.Cuet_count = this.countQuestionsBySubject(this.list, 'CUET');
        // this.CuetChartLabels =  Object.keys(this.Cuet_count);
        this.CuetChartLabels = ['Null'];
        this.CuetChartDatasets = [{ data: [0] }];
        // 2024-04-17
        this.filterByDateRangeAndGetChartData(this.list,'2024-02-01','2024-05-01')
        // this.CuetChartDatasets = [{data:Object.values(this.Cuet_count)}]

        // console.log('Jee_count',this.Jee_count,'Neet_count',this.Neet_count,'Foundation_count',this.Foundation_count,'Cuet_count',this.Cuet_count)
      },
    });
    if (this.auth.getUserRole() == 'Admin') {
      this.showAdmin = true;
    } else if (this.auth.getUserRole() == 'Curator') {
      this.hideCurator = false;
    }
  }
  ////////////////
  subjecttype: any = [
    { label: 'Select', value: '' },
    { label: 'Physics', value: 'Physics' },
    { label: 'Chemistry', value: 'Chemistry' },
    { label: 'Maths', value: 'Maths' },
    { label: 'Botony', value: 'Botony' },
    { label: 'Zology', value: 'Zology' },
    { label: 'Biology', value: 'Biology'}
  ];

  selectedsubject: any;
  public barChartLegend = true;
  public barChartPlugins = [];
  public startdate: any;
  public enddate: any;

  public datebarChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };

  public chapterChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };

  public classChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public JEEChartLabels = ['JEE', 'NEET', 'FOUNDATION', 'CUET'];
  public JEEChartDatasets = [
    {
      data: [300, 500, 100, 200],
    },
  ];

  public NEETChartLabels = ['JEE', 'NEET', 'FOUNDATION', 'CUET'];
  public NEETChartDatasets = [
    {
      data: [300, 500, 100, 200],
    },
  ];

  public FoundationChartLabels = ['JEE', 'NEET', 'FOUNDATION', 'CUET'];
  public FoundationChartDatasets = [
    {
      data: [300, 500, 100, 200],
    },
  ];

  public CuetChartLabels = ['JEE', 'NEET', 'FOUNDATION', 'CUET'];
  public CuetChartDatasets = [
    {
      data: [300, 500, 100, 200],
    },
  ];

  public pieChartLegend = true;
  public pieChartPlugins = [];
  // setTotal(value:any){
  //   this.pieChartDatasets = [{data:value}]
  // }
  selectsubjecttype(event: any) {
    this.selectedsubject = event;
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
  filterByDateRangeAndGetChartData(dataArray: any[], startDate?: string, endDate?: string) {
    // Initialize a variable to store the filtered array
    let filteredArray: any[] = [];
  
    if (startDate && endDate) {
      // Convert start and end dates to Date objects
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      // Initialize a Map to store counts by month and subject
      const monthSubjectMap = new Map<string, Map<string, number>>();
  
      // Filter the array by the submitted date and group by month and subject
      filteredArray = dataArray.filter((item: any) => {
        if (item.submitted) {
          const submittedDate = new Date(item.submitted);
          if (submittedDate >= start && submittedDate <= end) {
            const monthName = submittedDate.toLocaleString('default', { month: 'long' });
            const subject = item.subject;
  
            if (!monthSubjectMap.has(monthName)) {
              monthSubjectMap.set(monthName, new Map<string, number>());
            }
  
            const subjectMap = monthSubjectMap.get(monthName);
            if (subjectMap) {
              if (!subjectMap.has(subject)) {
                subjectMap.set(subject, 0);
              }
              subjectMap.set(subject, (subjectMap.get(subject) ?? 0) + 1);
            }
  
            return true; // Include this item in the filtered array
          }
        }
        return false; // Exclude this item from the filtered array
      });
  
      // Extract unique months and subjects
      const months = Array.from(monthSubjectMap.keys());
      const subjectsSet = new Set<string>();
      monthSubjectMap.forEach(subjectMap => {
        Array.from(subjectMap.keys()).forEach(subject => subjectsSet.add(subject));
      });
      const subjects = Array.from(subjectsSet);
  
      // Create datasets for the chart
      const datasets = subjects.map(subject => {
        return {
          label: subject,
          data: months.map(month => {
            const subjectMap = monthSubjectMap.get(month);
            return subjectMap?.get(subject) ?? 0;
          })
        };
      });
  
      // Update the chart data
      this.datebarChartData = {
        labels: months,
        datasets: datasets
      };
      console.log("datebarChartData",this.datebarChartData)
    }
    if(filteredArray){
      this.list1 = filteredArray
    }

    this.getQuestionsByChapterFormatted(this.list,'Physics')
  
    // Return the filtered array
    // return filteredArray;
  }
  getQuestionsByChapterFormatted(dataArray: any[], subject: string){
    // Initialize arrays to store labels and data
    const labels: { label: string; data: number[] }[] = [];
    const data: number[] = [];
    
    // Filter the array by the specified subject
    const filteredData = dataArray.filter(item => item.subject === subject);
  
    // Count the occurrences of each chapter
    const chapterMap = new Map<string, number>();
    filteredData.forEach(item => {
      const chapter = item.chapter;
      if (chapterMap.has(chapter)) {
        chapterMap.set(chapter, chapterMap.get(chapter)! + 1);
      } else {
        chapterMap.set(chapter, 1);
      }
    });
  
    // Convert chapterMap to labels and data arrays
    chapterMap.forEach((count, chapter) => {
      labels.push({ label: chapter, data: [count] });
      data.push(count);
    });

    var lab:any = labels.map(item => item.label);

    this.chapterChartData = {
      labels: lab,
      datasets: [{ label: lab, data: data }]
    };

    var filteredArray = dataArray.filter(item => item.subject === subject);

    if(filteredArray){
      this.list1 = filteredArray
    }

    console.log(this.chapterChartData,this.list1);
    this.getClassChartData(this.list,'9')
    // return { labels, datasets: ['ALL'] };
}

getClassChartData(dataArray: any[], classFilter: string) {
  // Initialize arrays to store labels and data
  const labels: { label: string; data: number[] }[] = [];
  const data: number[] = [];
  
  // Filter the array by the specified class
  const filteredData = dataArray.filter(item => item.class === classFilter);

  // Count the occurrences of each chapter
  const chapterMap = new Map<string, number>();
  filteredData.forEach(item => {
    const chapter = item.chapter;
    if (chapterMap.has(chapter)) {
      chapterMap.set(chapter, chapterMap.get(chapter)! + 1);
    } else {
      chapterMap.set(chapter, 1);
    }
  });

  // Convert chapterMap to labels and data arrays
  chapterMap.forEach((count, chapter) => {
    labels.push({ label: chapter, data: [count] });
    data.push(count);
  });

  var lab:any = labels.map(item => item.label);

  this.classChartData = {
    labels: lab,
    datasets: [{ label: lab, data: data }]
  };
  console.log("classChartData",this.classChartData)
}

  
}
