import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import {SharedModule} from "../shared/shared.module";
import {SearchPostPipe} from "./shared/pipes/search-post.pipe";
import {GuardService} from "./shared/Services/guard.service";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPostPipe
  ],
  exports: [
    RouterModule
  ],
  providers: [GuardService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [GuardService]},
          {path: 'create', component: CreatePageComponent, canActivate: [GuardService]},
          {path: 'post/:id/edit', component: EditPageComponent, canActivate: [GuardService]},
        ]
      }
    ])
  ]
})
export class AdminModule {

}
