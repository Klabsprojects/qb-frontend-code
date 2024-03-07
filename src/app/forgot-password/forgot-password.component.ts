import { Component, OnInit } from '@angular/core';
import { forgotPassword } from '../auth.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassword = new forgotPassword();

  constructor() { }

  ngOnInit(): void {
  }

  Submit(data:any){
    
  }

}
