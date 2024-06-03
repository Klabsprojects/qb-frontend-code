import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listofusers:any[]=[]
  loading:boolean = false;
  @ViewChild('dt') dt!: Table;

  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getlistofusers().subscribe((res:any)=>{
      this.listofusers = res.data
    })
  }

  addNew(){
    this.router.navigateByUrl('/creator/create');
  }

  applyFilterGlobal($event:any, stringVal:any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
