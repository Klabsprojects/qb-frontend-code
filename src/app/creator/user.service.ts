import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { authService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {


  userCreationUrl = environment.baseUrl+`/api/user/create`;
  masterCreationUrl = environment.baseUrl+`/api/master`;
  listofusersurl = environment.baseUrl + `/api/user/list`;

  constructor(public http:HttpClient, private authService:authService) { }

  private getHeaders(): HttpHeaders {
    const authToken = this.authService.getAuthToken();
    return new HttpHeaders({'Authorization': authToken ?? ''});
  }

  createUser(data:any){
    return this.http.post(this.userCreationUrl,data, {headers:this.getHeaders()})
  }

  createMaster(data:any){
    return this.http.post(this.masterCreationUrl,data,{headers:this.getHeaders()})
  }

  getlistofusers(){
    return this.http.get<any[]>(this.listofusersurl,{ headers: this.getHeaders() })
  }

}
