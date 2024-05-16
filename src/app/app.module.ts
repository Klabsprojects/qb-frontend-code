import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { authService } from './auth.service';
import { ListComponent } from './question-creation/list/list.component';
import { AddMasterComponent } from './add-master/add-master.component';
import { AuthGuard } from './auth.guard';
import { NgChartsModule } from 'ng2-charts';
// import { UserComponent } from './user/user/user.component';
// import { SanitizeHtmlPipe } from './sanitize-html.pipe';

const routes : Routes = [{
  path:'login',
  component : LoginComponent
},
{
  path:'forgot-password',
  component:ForgotPasswordComponent
},
{
  path:'dashboard',
  canActivate:[AuthGuard],
  component:DashboardComponent
},
{
  path:'add-master',
  canActivate:[AuthGuard],
  component:AddMasterComponent
},
{
  path:'question-creation',
  canActivate:[AuthGuard],
  loadChildren:()=>import('./question-creation/question-creation.module').then(m=>m.QuestionCreationModule)
},
{
  path:'creator',
  canActivate:[AuthGuard],
  loadChildren:()=>import('./creator/creator.module').then(m=>m.CreatorModule)
},
{
  path:'question-creation-translation',
  canActivate:[AuthGuard],
  loadChildren:()=>import('./question-creation-translator/question-creation-translator.module').then(m=>m.QuestionCreationTranslationModule)
},
{
  path:'question-translation',
  canActivate:[AuthGuard],
  loadChildren:()=>import('./question-translator/question-translator.module').then(m=>m.QuestionTranslationModule)
},
{
  path:'user',
  canActivate:[AuthGuard],
  loadChildren:()=>import('./user/user.module').then(m=>m.AppuserModule)
},
{
  path:'',
  redirectTo:'login',
  pathMatch:'full'
}]


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    FooterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    AddMasterComponent,
    // UserComponent,
    // SanitizeHtmlPipe
    // FilterByChapterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    NgChartsModule,
    RouterModule.forChild(routes),
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},authService,ListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
