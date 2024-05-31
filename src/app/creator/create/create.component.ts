import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  subjectslist : string[]=[];
  roles:string[]=[];
  // userForm!: FormGroup;
  showPassword = false;


  constructor(private router:Router,private formBuilder: FormBuilder,private userService:UserService) { }
  


  ngOnInit(): void {
    this.subjectslist = [
      'Tamil',
      'English',
      'Maths',
      'Physics',
      'Chemistry',
      'Botany',
      'Zoology',
      'Biology'
    ];

    this.roles = [
      "Creator",
      "Curator",
    ]
    this.initForm();
  }


  initForm() {
    // this.userForm = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   username: ['', Validators.required],
    //   pass: ['', Validators.required],
    //   mobile: ['', Validators.required],
    //   role: ['', Validators.required],
    //   subjects: ['', Validators.required],
    // });
  }



  back(){
    this.router.navigateByUrl('/creator/list');
  }
  

  // submit() {
    // console.log("form",this.userForm.value)
    // this.userForm.markAllAsTouched();
    // if (this.userForm.valid) {
    //   console.log('Form submitted:', this.userForm.value);
    //   this.userService.createUser(this.userForm.value).subscribe(({
    //     next:(res:any)=>{
    //       console.log(res);
    //       alert(res.message);
    //       this.router.navigateByUrl('/creator/create');
    //     }
    //   }))
    // } 
  // }

  submit(form:any){
    if(form.valid){
      this.userService.createUser(form.value).subscribe(({
        next:(res:any)=>{
          alert(res.message);
          this.router.navigateByUrl('/creator/list');
        }
      }))
    }
  }

  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
