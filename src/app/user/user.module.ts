import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizeHtmlUserPipe } from './user/filters/filter-santize.pipe';
import { IonicModule } from '@ionic/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { Appuserouter } from './user.component';
import { UserComponent } from './user/user.component';
//////////
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
const routes: Routes = [
  {
    path: '',
    component: Appuserouter,
    children: [
      {
        path: 'user',
        component: UserComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [Appuserouter, UserComponent, SanitizeHtmlUserPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  providers: [Appuserouter],
})
export class AppuserModule {}
