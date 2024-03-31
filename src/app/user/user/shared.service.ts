import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { userLogin } from '../../auth.model';
import { authService } from '../../auth.service';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})

export class shared {
    constructor(public http: HttpClient, private authService: authService) { }
    public class_options: { [key: string]: string[] } = {
        'JEE': ['11', '12'],
        'NEET': ['11', '12'],
        'Foundation': ['9', '10']
    };

    public selectsubject: { [key: string]: string[] } = {
        '9': ['Maths', 'Chemistry', 'Physics', 'Biology'],
        '10': ['Maths', 'Chemistry', 'Physics', 'Biology'],
        '11': ['Botany', 'Zoology', 'Physics', 'Chemistry', 'Maths'],
        '12': ['Botany', 'Zoology', 'Physics', 'Chemistry', 'Maths']
    };
    private getHeaders(): HttpHeaders {
        const authToken = this.authService.getAuthToken();
        return new HttpHeaders({ 'Authorization': authToken ?? '' });
    }
    getchapter(selectedClass: any, selectedSubject: any) {
        const newchapterUrl = 'https://api-qgen.a2zweb.in/api/master/detail/' + selectedClass + '/' + selectedSubject
        return this.http.get<any[]>(newchapterUrl, { headers: this.getHeaders() });
    }
    gettopic(selectedClass: any, selectedSubject: any, selectedChapter: any) {
        const newtopicUrl = 'https://api-qgen.a2zweb.in/api/master/detail/' + selectedClass + '/' + selectedSubject + '/' + selectedChapter
        return this.http.get<any[]>(newtopicUrl, { headers: this.getHeaders() });
    }
    search_questions(payload: any) {
        const searchUrl = environment.baseUrl + `/api/question/search/data?type=${payload.type}&class=${payload.class}&subject=${payload.subject}&chapter=${payload.chapter}&difficulty=${payload.level}&format=${payload.qtype}&topic=${payload.topic}`
        return this.http.get<any[]>(searchUrl, { headers: this.getHeaders() });
    }
    save_question_paper(payload: any) {
        const newQuestionUrl = 'https://api-qgen.a2zweb.in/api/question/paper/new';
        return this.http.post(newQuestionUrl, payload, { headers: this.getHeaders() });
    }
    update_question_paper(payload:any,id:any){
        const newupdateurl = 'https://api-qgen.a2zweb.in/api/question/paper/'+id;
        return this.http.put(newupdateurl,payload,{ headers: this.getHeaders() })
    }
    get_questionpaper_list() {
        const getquestionpaperlist = 'https://api-qgen.a2zweb.in/api/question/paper/list';
        return this.http.get<any[]>(getquestionpaperlist, { headers: this.getHeaders() })
    }
    get_questions(qIds: number[] | number) {
        const ids = Array.isArray(qIds) ? qIds.join(',') : qIds.toString();
        const params = new HttpParams().set('ids', ids);
        var getReportUrl = 'https://api-qgen.a2zweb.in/api/question/selected/data';
        return this.http.get(getReportUrl, { params, headers: this.getHeaders() });
    }
    question_download_count(id:any){
        var count_url = 'https://api-qgen.a2zweb.in/api/question/paper/downloaded/'+id;
        return this.http.put(count_url,{},{ headers: this.getHeaders() });
    }

}