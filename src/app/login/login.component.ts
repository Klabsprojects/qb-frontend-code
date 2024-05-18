import { Component, OnInit, Renderer2 } from '@angular/core';
import { userLogin } from '../auth.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { authService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin : userLogin = new userLogin();  
  loginForm!:NgForm;
  showPassword = false;

  constructor(private RouterService:Router, private auth:authService,private renderer: Renderer2) { }

  ngOnInit(): void {
    const imagePath = 'url(\'./assets/images/background.jpg\')'; // Adjust the path to your image
    this.renderer.setStyle(document.body, 'background-image', imagePath);
    this.renderer.setStyle(document.body, 'background-size', 'cover');
    this.renderer.setStyle(document.body, 'background-position', 'center');
    this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');

  }

  loginSubmit(data:NgForm){
    this.loginForm = data;
    if(this.loginForm.status == 'VALID'){
      this.auth.login(data.value).subscribe(({
        next:(res:any)=>{
          this.auth.login(res.data);
           //this.RouterService.navigateByUrl('dashboard');
           this.RouterService.navigate(['/dashboard']).then(() => {
            window.location.reload();
          });
        },
        error:(error:any)=>{
          console.error(error);
          alert("Invalid Credentials");
          this.loginForm.reset();
        }
      }))
    }  
    
    // if(this.loginForm.status == 'VALID')
    // {
    //   if(this.loginForm.value.userName == "qbuser" && this.loginForm.value.password == "qb@123"){
    //     this.RouterService.navigateByUrl('dashboard');
    //   }
    //   else{
    //     alert("Invalid Credentials");
    //   }
    // }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}