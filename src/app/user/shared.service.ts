import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { userLogin } from '../auth.model';
import { authService } from '../auth.service';
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
    search_questions(payload:any) {
        const searchUrl = environment.baseUrl + `/api/question/search/data?type=${payload.type}&class=${payload.class}&subject=${payload.subject}&chapter=${payload.chapter}&difficulty=${payload.level}&format=${payload.qtype}&topic=${payload.topic}`
        return this.http.get<any[]>(searchUrl, { headers: this.getHeaders() });
    }
}