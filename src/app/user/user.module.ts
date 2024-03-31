import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizeHtmlUserPipe } from './user/filters/filter-santize.pipe';
import { IonicModule } from '@ionic/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { Appuserouter } from './user.component';
import { UserComponent } from './user/user.component';
const routes: Routes = [
    {
        path: '',
        component: Appuserouter,
        children: [
            {
                path: 'user',
                component: UserComponent
            }
        ]
    }
]
@NgModule({
    declarations: [
        Appuserouter,
        UserComponent,
        SanitizeHtmlUserPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        RouterModule.forChild(routes),
        IonicModule
    ],
    providers: [Appuserouter]
})
export class AppuserModule { }