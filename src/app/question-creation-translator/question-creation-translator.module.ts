import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTranslatorComponent } from './create-translator/create-translator.component';
import { ListtranslatorComponent } from './list-translator/list-translator.component';
import { QuestionCreationTranslatorComponent } from './question-creation-translator.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuestionCreationService } from './question-creation-translator.service';
import { ViewTranslatorComponent } from './view-translator/view-translator.component';
import { FilterByClassTranslatorPipe } from './list-translator/filters/filter-by-class.pipe';
import { FilterBySubjectTranslatorPipe } from './list-translator/filters/filter-by-subject.pipe';
import { FilterByChapterPipe } from './list-translator/filters/filter-by-chapter.pipe';
import { FilterByLevelPipeTranslator } from './list-translator/filters/filter-by-level.pipe';
import { FilterByTypePipeTranslator } from './list-translator/filters/filter-by-type.pipe';
// import { SanitizeHtmlPipe } from '../sanitize-html.pipe';
import { SanitizeHtmlCreationTranslationPipe } from './list-translator/filters/filter-santize.pipe';
import { IonicModule } from '@ionic/angular';
import { NgxPaginationModule } from 'ngx-pagination';
// import { EditComponent } from './edit/edit.component';
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
    component:QuestionCreationTranslatorComponent,
    children:[
      {
        path:'create',
        component:CreateTranslatorComponent
      },
      {
        path:'list',
        component:ListtranslatorComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    QuestionCreationTranslatorComponent,
    CreateTranslatorComponent,
    ListtranslatorComponent,
    ViewTranslatorComponent,
    FilterByClassTranslatorPipe,
    FilterBySubjectTranslatorPipe,
    FilterByChapterPipe,
    FilterByLevelPipeTranslator,
    FilterByTypePipeTranslator,
    SanitizeHtmlCreationTranslationPipe
    // SanitizeHtmlPipe
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
export class QuestionCreationTranslationModule { }
