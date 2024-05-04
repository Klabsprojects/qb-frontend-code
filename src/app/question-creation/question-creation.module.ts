import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { QuestionCreationComponent } from './question-creation.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuestionCreationService } from './question-creation.service';
import { ViewComponent } from './view/view.component';
// import { SanitizeHtmlPipe } from '../sanitize-html.pipe';
import { SanitizeHtmlCreationPipe } from './list/filters/filter-santize.pipe';
import { IonicModule } from '@ionic/angular';
import { EditComponent } from './edit/edit.component';
import { FilterByClassPipe } from './list/filters/filter-by-class.pipe';
import { FilterBySubjectPipe } from './list/filters/filter-by-subject.pipe';
import { FilterByChapterPipe } from './list/filters/filter-by-chapter.pipe';
import { FilterByTypePipe } from './list/filters/filter-by-type.pipe';
import { FilterByLevelPipe } from './list/filters/filter-by-level.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { StatusFilterPipe } from './list/filters/filter-by-status.pipe';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
const routes : Routes = [
  {
    path:'',
    component:QuestionCreationComponent,
    children:[
      {
        path:'create',
        component:CreateComponent
      },
      {
        path:'list',
        component:ListComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    QuestionCreationComponent,
    CreateComponent,
    ListComponent,
    ViewComponent,
    EditComponent,
    SanitizeHtmlCreationPipe,
    FilterByClassPipe,
    FilterBySubjectPipe,
    FilterByChapterPipe,
    FilterByTypePipe,
    FilterByLevelPipe,
    StatusFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
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
    IonicModule
  ],
  providers:[QuestionCreationService]
})
export class QuestionCreationModule { }
