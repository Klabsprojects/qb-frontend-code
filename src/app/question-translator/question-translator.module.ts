import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTranslatorComponent } from './create-translator/create-translator.component';
import { ListtranslatorComponent } from './list-translator/list-translator.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ViewTranslatorComponent } from './view-translator/view-translator.component';
import { FilterByClassTranslatorPipe } from './list-translator/filters/filter-by-class.pipe';
import { FilterBySubjectTranslatorPipe } from './list-translator/filters/filter-by-subject.pipe';
import { FilterByChapterTranslatorPipe } from './list-translator/filters/filter-by-chapter.pipe';
// import { SanitizeHtmlPipe } from '../sanitize-html.pipe';
import { SanitizeHtmlTranslationPipe } from './list-translator/filters/filter-santize.pipe';
import { IonicModule } from '@ionic/angular';
import { QuestionTranslatorComponent } from './question-translator.component';
import { QuestionCreationService } from './question-translator.service';
import { FilterByLevelPipeTranslatorPipe } from './list-translator/filters/filter-by-level.pipe';
import { FilterByTypePipeTranslatorPipe } from './list-translator/filters/filter-by-type.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
// import { EditComponent } from './edit/edit.component';

const routes : Routes = [
  {
    path:'',
    component:QuestionTranslatorComponent,
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
    QuestionTranslatorComponent,
    CreateTranslatorComponent,
    ListtranslatorComponent,
    ViewTranslatorComponent,
    FilterByClassTranslatorPipe,
    FilterBySubjectTranslatorPipe,
    FilterByChapterTranslatorPipe,
    FilterByLevelPipeTranslatorPipe,
    FilterByTypePipeTranslatorPipe,
    SanitizeHtmlTranslationPipe
    // SanitizeHtmlPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
    IonicModule
  ],
  providers:[QuestionCreationService]
})
export class QuestionTranslationModule { }
