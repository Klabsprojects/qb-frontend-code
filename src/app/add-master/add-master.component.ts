import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../creator/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-master',
  templateUrl: './add-master.component.html',
  styleUrls: ['./add-master.component.css']
})
export class AddMasterComponent implements OnInit {

  masterForm!:FormGroup;

  constructor(private Form:FormBuilder, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.master();
  }

  master(){
    this.masterForm = this.Form.group({
      type:[''],
      class:[''],
      medium:[''],
      subject:[''],
      chapter:[''],
      topic:[''],
      sub_topic:['']
    })
  }

  submit(){
    if (this.masterForm.valid) {
      console.log('Form submitted:', this.masterForm.value);
      this.userService.createMaster(this.masterForm.value).subscribe(({
        next:(res:any)=>{
          console.log(res);
          alert(res.message);
          // this.router.navigateByUrl('/add-master');
          this.masterForm.reset();
        }
      }))
    }
  }
}
