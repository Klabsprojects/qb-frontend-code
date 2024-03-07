import { Component} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { authService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qb';

  currentRoute:string='';
  Showmenu:boolean = false;
  showLogin:boolean = false;
  showForgot:boolean = false;

  constructor(public router:Router,private authService:authService){
    
  }

  ngOnInit() {
    this.router.events
    .pipe(filter((event: any) => event instanceof NavigationEnd))
    .subscribe(() => {
       this.currentRoute = this.router.url;
      if(this.currentRoute == "/login"){
        this.showLogin = true;
        this.Showmenu = false;
        this.showForgot = false;
      }
      else if(this.currentRoute == "/forgot-password"){
        this.showForgot = true;
        this.showLogin = false;
        this.Showmenu = false;
      }
      else{
        this.Showmenu = true;
        this.showForgot = false;
        this.showLogin = false;
      }
    });
  }

}
