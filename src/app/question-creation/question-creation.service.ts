import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { questionModel } from './question.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import * as jsPDF from 'jspdf';
import { environment } from 'src/environments/environment';
import { authService } from '../auth.service';
// import * as html2pdf from 'html2pdf.js';
// import Docxtemplater from 'docxtemplater';
// import PizZip from 'pizzip';
// import PizZipUtils from 'pizzip/utils/index.js';
// import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class QuestionCreationService {
  // 18.139.1.194:3000
  // https://13.234.169.84:3000;
  // private baseUrl = 'http://127.0.0.1:3000';
  // public baseUrl = 'http://13.234.169.84:3000';


  private taxonomyUrl = environment.baseUrl + `/api/taxonomy`;
  private questionCreationUrl = environment.baseUrl + `/api/question`;
  private questionUpdateUrl = environment.baseUrl + `/api/question/choice`;
  //private questionListUrl = environment.baseUrl+`/api/question`;
  private questionListUrl = environment.baseUrl + `/api/detail`;
  private getReportUrl = environment.baseUrl + `/api/question/selected/data`;
  private viewDetailsUrl = environment.baseUrl + `/api/question/`;
  // private DetailsUrl = environment.baseUrl+`/api/detail`;
  private DetailsUrl = environment.baseUrl + `/api/question`;
  private addDetails = environment.baseUrl + `/api/detail`;
  private typeUrl = environment.baseUrl + `/api/master/`;
  dashboardDataUrl = environment.baseUrl + `/api/user/homedata`;
  approveQuestionUrl = environment.baseUrl + `/api/question`;
  uploadimageurl = environment.baseUrl + `/api/upload`


  constructor(public http: HttpClient, private authService: authService) { }

  public Question = new BehaviorSubject<questionModel>({ Mode: 'LIST' });
  private indexSource = new BehaviorSubject<number>(-1); // Initialize with a default value
  currentIndex$ = this.indexSource.asObservable();

  setIndex(index: number): void {
    this.indexSource.next(index);
  }

  private currentStepSubject = new BehaviorSubject<number>(2);
  currentStep$ = this.currentStepSubject.asObservable();

  setCurrentStep(step: number) {
    this.currentStepSubject.next(step);
  }

  getTaxonomyData(): Observable<any[]> {
    return this.http.get<any[]>(this.taxonomyUrl);
  }

  private getHeaders(): HttpHeaders {
    const authToken = this.authService.getAuthToken();
    return new HttpHeaders({ 'Authorization': authToken ?? '' });
  }

  getType(selectedType: string): Observable<any[]> {
    const TypeUrl = `${this.typeUrl}/${selectedType}`;
    return this.http.get<any[]>(TypeUrl, { headers: this.getHeaders() });
  }

  getMediumOptions(selectedType: any, selectedClass: number): Observable<any[]> {
    const mediumUrl = `${this.typeUrl}/${selectedType}/${selectedClass}`;
    return this.http.get<any[]>(mediumUrl, { headers: this.getHeaders() });
  }

  getSubjectOptions(selectedType: any, selectedClass: string, selectedMedium: any, type?: any): Observable<any[]> {
    const subjectUrl = `${this.typeUrl}/${selectedType}/${selectedClass}/${selectedMedium}`;
    return this.http.get<any[]>(subjectUrl, { headers: this.getHeaders() });
  }

  getTermOptions(selectedClass: number, selectedMedium: number, selectedTerm: number): Observable<any[]> {
    const termUrl = `${this.taxonomyUrl}/${selectedClass}/${selectedMedium}/${selectedTerm}`;
    return this.http.get<any[]>(termUrl, { headers: this.getHeaders() });
  }

  getChapterOptions(selectedType: any, selectedClass: number, selectedMedium: number, selectedSubject: number): Observable<any[]> {
    const chapterUrl = `${this.typeUrl}/${selectedType}/${selectedClass}/${selectedMedium}/${selectedSubject}`;
    const newchapterUrl = 'https://api-qgen.a2zweb.in/api/master/detail/' + selectedClass + '/' + selectedSubject
    return this.http.get<any[]>(newchapterUrl, { headers: this.getHeaders() });
  }

  getTopicOptions(selectedType: any, selectedClass: number, selectedMedium: number, selectedSubject: number, selectedChapter: number): Observable<any[]> {
    const topicUrl = `${this.typeUrl}/${selectedType}/${selectedClass}/${selectedMedium}/${selectedSubject}/${selectedChapter}`;
    const newtopicUrl = 'https://api-qgen.a2zweb.in/api/master/detail/' + selectedClass + '/' + selectedSubject + '/' + selectedChapter
    return this.http.get<any[]>(newtopicUrl, { headers: this.getHeaders() });
  }

  getSubTopicOptions(selectedType: any, selectedClass: number, selectedMedium: number, selectedSubject: number, selectedChapter: number, selectedTopic: number): Observable<any[]> {
    const subTopicUrl = `${this.typeUrl}/${selectedType}/${selectedClass}/${selectedMedium}/${selectedSubject}/${selectedChapter}/${selectedTopic}`;
    return this.http.get<any[]>(subTopicUrl, { headers: this.getHeaders() });
  }

  getConceptOptions(selectedClass: number, selectedMedium: number, selectedTerm: number, selectedChapter: number, selectedTopic: number, selectedSubTopic: number, selectedConcept: number): Observable<any[]> {
    const conceptUrl = `${this.taxonomyUrl}/${selectedClass}/${selectedMedium}/${selectedTerm}/${selectedChapter}/${selectedTopic}/${selectedSubTopic}/${selectedConcept}`;
    return this.http.get<any[]>(conceptUrl, { headers: this.getHeaders() });
  }

  getLearningOptions(selectedClass: number, selectedMedium: number, selectedTerm: number, selectedChapter: number, selectedTopic: number, selectedSubTopic: number, selectedConcept: number, selectedLearning: number): Observable<any[]> {
    const learningUrl = `${this.taxonomyUrl}/${selectedClass}/${selectedMedium}/${selectedTerm}/${selectedChapter}/${selectedTopic}/${selectedSubTopic}/${selectedConcept}/${selectedLearning}`;
    return this.http.get<any[]>(learningUrl, { headers: this.getHeaders() });
  }

  getAllData(taxonomyId: number): Observable<any[]> {
    const allDataUrl = `${this.typeUrl}/detail/${taxonomyId}`;
    return this.http.get<any[]>(allDataUrl, { headers: this.getHeaders() });
  }

  createQuestionAnswer(data: any) {
    return this.http.post(this.questionCreationUrl, data, { headers: this.getHeaders() })
  }

  updateQuestionAnswer(data: any, id: any) {
    return this.http.put(this.questionUpdateUrl + '/' + id, data, { headers: this.getHeaders() })
  }

  submitQuestionAnswer(id: any) {
    console.log("id", id)
    var data = {
      "submitted": "yes"
    }
    return this.http.put(this.questionCreationUrl + '/' + id, data, { headers: this.getHeaders() })
  }

  uploadimage(formData: any) {
    return this.http.post(this.uploadimageurl, formData, { headers: this.getHeaders() })
  }

  getApprove(id: number, data: any) {
    const url = this.approveQuestionUrl + `/${id}`;
    return this.http.put<any>(url, data, { headers: this.getHeaders() });
  }



  createDetails(data: any) {
    return this.http.post(this.addDetails, data, { headers: this.getHeaders() });
  }

  // getQuestionList(){
  //   return this.http.get(this.questionListUrl,{headers:this.getHeaders()})
  // }

  getQuestionList(id: number) {
    return this.http.get(this.questionListUrl + `/${id}/questions`, { headers: this.getHeaders() })
  }



  getQuestionDetails(id: number) {
    const viewUrl = `${this.viewDetailsUrl}/${id}`;
    return this.http.get(viewUrl, { headers: this.getHeaders() });
  }

  getDetails() {
    return this.http.get(this.DetailsUrl, { headers: this.getHeaders() });
  }

  getQuestionDetail(qId: any | any[]) {
    const ids = Array.isArray(qId) ? qId.join(',') : qId.toString();
    const params = new HttpParams().set('ids', ids);
    return this.http.get(this.getReportUrl, { params, headers: this.getHeaders() });
  }


  getReport(qIds: number[] | number): Observable<any> {
    const ids = Array.isArray(qIds) ? qIds.join(',') : qIds.toString();
    const params = new HttpParams().set('ids', ids);
    return this.http.get(this.getReportUrl, { params, headers: this.getHeaders() });
  }


  getPdfReport(qIds?: number[]): Observable<any> {
    if (qIds && qIds.length > 0) {
      const params = new HttpParams().set('ids', qIds.join(','));
      return this.http.get(this.getReportUrl, { params, headers: this.getHeaders() });
    } else {
      return throwError('Invalid or empty qIds');
    }
  }

  getPdfReportSingle(qIds: number[] | number): Observable<any> {
    const ids = Array.isArray(qIds) ? qIds.join(',') : qIds.toString();
    const params = new HttpParams().set('ids', ids);
    return this.http.get(this.getReportUrl, { params, headers: this.getHeaders() });
  }


  getDashboardDetails() {
    return this.http.get<any[]>(this.dashboardDataUrl, { headers: this.getHeaders() });
  }


  getWordReport(qIds?: number[]): Observable<Blob> {
    if (qIds && qIds.length > 0) {
      const params = new HttpParams().set('ids', qIds.join(','));

      return this.http.get(this.getReportUrl, { params, responseType: 'blob', headers: this.getHeaders() })
        .pipe(
          catchError((error: any) => {
            console.error('Error fetching report:', error);
            return throwError('Failed to fetch report');
          })
        );
    } else {
      return throwError('Invalid or empty qIds');
    }
  }


  getTemplate(templateUrl: string): Observable<any> {
    const fullUrl = `/${templateUrl}`;
    return this.http.get(fullUrl, { responseType: 'arraybuffer', observe: 'response' })
      .pipe(
        tap(response => {
          const contentType = response.headers.get('Content-Type');
        }),
        map(response => response.body)
      );
  }


  // generatePdf(data: any[]) {
  //   const doc = new jsPDF.default();
  //   const stripHtmlTags = (htmlString: string) => {
  //     const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  //     return doc.body.textContent || "";
  //   };

  //   data.forEach((entry, index) => {
  //     const questionText = `${index + 1}: ${stripHtmlTags(entry.q_text)}`;
  //     doc.setFontSize(12);
  //     doc.text(questionText, 10, 15 + index * 40);

  //     if (entry.choices && entry.choices.length > 0) {
  //       doc.setFontSize(10);
  //       const midpoint = doc.internal.pageSize.width / 2;
  //       const choiceSpacing = 8; 

  //       entry.choices.forEach((choice: {
  //         choice_notes: any;
  //         choice_correct_yn: any;
  //         choice_text: any;
  //       }, choiceIndex: number) => {
  //         const column = choiceIndex % 2 === 0 ? 1 : 2;

  //         const xOffset = column === 1 ? 20 : midpoint + 10;
  //         const yOffset = 20 + index * 40 + Math.floor(choiceIndex / 2) * choiceSpacing; // Adjusted vertical spacing

  //         const choiceText = `${String.fromCharCode(65 + choiceIndex)}) ${choice.choice_text}`;
  //         doc.text(choiceText, xOffset, yOffset);

  //         const answerText = `Answer: ${entry.choices[0].choice_correct_yn}`;
  //         const answerOffset = 6 + index * 40 + entry.choices.length * choiceSpacing;
  //         doc.text(answerText, 20, answerOffset);

  //         const solutionText = `Solution: ${entry.choices[0].choice_notes}`;
  //         const solutionOffset = 12 + index * 40 + entry.choices.length * choiceSpacing;
  //         doc.text(solutionText, 20, solutionOffset);
  //       });
  //       // Display answer text after all choices
  //       doc.setFontSize(12);
  //     }
  //     // Add more spacing between questions
  //     doc.text('', 10, 50 + index * 40 + (entry.choices.length > 0 ? Math.ceil(entry.choices.length / 2) * 15 : 0));
  //   });
  //   doc.save('output.pdf');
  // }

  async generatePdf(data: any[]): Promise<void> {
    try {
      // Fetch English font URLs
      const englishFontUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans:wght@500&display=swap';
      const englishFontData = await fetch(englishFontUrl).then((response) => response.text());
      const englishFontUrls = englishFontData.match(/https:\/\/[^)]+/g);

      // Fetch Tamil font URLs
      const tamilFontUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@500&display=swap';
      const tamilFontData = await fetch(tamilFontUrl).then((response) => response.text());
      const tamilFontUrls = tamilFontData.match(/https:\/\/[^)]+/g);

      // Check if font URLs are valid
      if (!englishFontUrls || englishFontUrls.length < 2 || !tamilFontUrls || tamilFontUrls.length < 2) {
        console.error('Error fetching font URLs');
        return;
      }

      // Create a new jsPDF instance
      const doc = new jsPDF.default(); // Use .default to access the default export

      // Add English fonts
      doc.addFont(englishFontUrls[0], 'NotoSans', 'normal');
      doc.addFont(englishFontUrls[1], 'NotoSerif', 'normal');

      // Add Tamil fonts
      doc.addFont(tamilFontUrls[0], 'NotoSansTamil', 'normal', 'Identity-H');
      doc.addFont(tamilFontUrls[1], 'NotoSerifTamil', 'normal', 'Identity-H');

      // Set the default font to English
      doc.setFont('NotoSans', 'normal');


      data.forEach(async (entry, index) => {
        const questionText: string = `${index + 1}: ${this.stripHtmlTags(entry.q_text)}`;
        const isTamilText = this.containsTamil(entry.q_text);
        console.log(isTamilText);
        const fontForQuestion = isTamilText ? 'NotoSansTamil' : '';
        doc.addFont(isTamilText ? tamilFontUrls[0] : englishFontUrls[0], 'NotoSansTamil', 'normal');
        doc.setFont(fontForQuestion);
        doc.setFontSize(12);
        doc.text(questionText, 10, 15 + index * 40);
        // if (index > 0) {
        //   doc.addPage();
        // }
        // const questionYPosition = doc.internal.pageSize.height - doc.internal.getFontSize();

        if (entry.choices && entry.choices.length > 0) {
          doc.setFontSize(10);
          const midpoint: number = doc.internal.pageSize.width / 2;
          const choiceSpacing: number = 8;

          entry.choices.forEach((choice: any, choiceIndex: any) => {
            const column: number = choiceIndex % 2 === 0 ? 1 : 2;
            const xOffset: number = column === 1 ? 20 : midpoint + 10;
            const yOffset: number = 20 + index * 40 + Math.floor(choiceIndex / 2) * choiceSpacing;
            const choiceText: string = `${String.fromCharCode(65 + choiceIndex)}) ${choice.choice_text}`;
            doc.text(choiceText, xOffset, yOffset);
            const firstChoiceText: string = entry.choices[0].choice_text;
            const secondChoiceText: string = entry.choices[1].choice_text;
            const thirdChoiceText: string = entry.choices[2].choice_text;
            const fourthChoiceText: string = entry.choices[3].choice_text;

            let answerText: string;

            if (entry.choices[0].choice_correct_yn === 0) {
              answerText = `Answer: ${firstChoiceText}`;
            } else if (entry.choices[1].choice_correct_yn === 1) {
              answerText = `Answer: ${secondChoiceText}`;
            } else if (entry.choices[1].choice_correct_yn === 2) {
              answerText = `Answer: ${thirdChoiceText}`;
            } else if (entry.choices[1].choice_correct_yn === 3) {
              answerText = `Answer: ${fourthChoiceText}`;
            } else {
              answerText = 'Answer not available';
            }
            // const answerText: string = `Answer: ${entry.choices[0].choice_correct_yn}`;
            const answerOffset: number = 6 + index * 40 + entry.choices.length * choiceSpacing;
            doc.text(answerText, 20, answerOffset);

            const choiceNotes: string | null = entry.choices[0].choice_notes;
            const solutionText: string = choiceNotes !== null ? `Solution: ${choiceNotes}` : 'No solution available';

            const solutionOffset: number = 12 + index * 40 + entry.choices.length * choiceSpacing;
            doc.text(solutionText, 20, solutionOffset);
          });

          doc.setFontSize(12);
        }

        doc.text('', 10, 50 + index * 40 + (entry.choices?.length > 0 ? Math.ceil(entry.choices.length / 2) * 15 : 0));
      });
      // Save the PDF
      doc.save('question.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }


  async generatePdfsingle(data: any[]): Promise<void> {
    console.log("datacheck", data)
    try {
      // Fetch English font URLs
      const englishFontUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans:wght@500&display=swap';
      const englishFontData = await fetch(englishFontUrl).then((response) => response.text());
      const englishFontUrls = englishFontData.match(/https:\/\/[^)]+/g);

      // Fetch Tamil font URLs
      const tamilFontUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@500&display=swap';
      const tamilFontData = await fetch(tamilFontUrl).then((response) => response.text());
      const tamilFontUrls = tamilFontData.match(/https:\/\/[^)]+/g);

      // Check if font URLs are valid
      if (!englishFontUrls || englishFontUrls.length < 2 || !tamilFontUrls || tamilFontUrls.length < 2) {
        console.error('Error fetching font URLs');
        return;
      }

      // Create a new jsPDF instance
      const doc = new jsPDF.default(); // Use .default to access the default export

      // Add English fonts
      doc.addFont(englishFontUrls[0], 'NotoSans', 'normal');
      doc.addFont(englishFontUrls[1], 'NotoSerif', 'normal');

      // Add Tamil fonts
      doc.addFont(tamilFontUrls[0], 'NotoSansTamil', 'normal', 'Identity-H');
      doc.addFont(tamilFontUrls[1], 'NotoSerifTamil', 'normal', 'Identity-H');

      // Set the default font to English
      doc.setFont('NotoSans', 'normal');


      data.forEach(async (question, index) => {
        // Add question text
        doc.text(`Question: ${question.text}`, 10, 10);

        // Add clue text
        doc.text(`Clue: ${question.clue_text}`, 10, 20);

        // Add choices
        question.choices.forEach((choice:any, index:any) => {
          console.log("choice",choice,"index",index)
          const x = 20 + (index % 2) * 70;
          const y = 30 + Math.floor(index / 2) * 30;

          // Add choice image
          doc.addImage(choice.choice_img, 'PNG', x, y, 60, 30);

          // Add choice number
          doc.text(`Choice ${index + 1}`, x + 30, y + 40);
        });

        // Find the correct choice for answer and solution
        const correctChoice = question.choices.find((choice:any) => choice.choice_correct_yn !== null);

        // Add answer choice text
        doc.text(`Answer: ${correctChoice.choice_text}`, 10, 110);

        // Add solution choice notes
        doc.text(`Solution: ${correctChoice.choice_notes || 'No solution notes available'}`, 10, 120);

        // Add page break for the next question
        doc.addPage();
      });
      // Save the PDF
      doc.save('question.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }

  // Function to strip HTML tags and convert to plain text
  stripHtmlTags(htmlString: string): string {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || '';
  }

  containsTamil(text: string): boolean {
    const textWithoutTags = text.replace(/<[^>]*>/g, '');
    const tamilRegex = /[\u0B80-\u0BFF]/;
    return tamilRegex.test(textWithoutTags);
  }
}
