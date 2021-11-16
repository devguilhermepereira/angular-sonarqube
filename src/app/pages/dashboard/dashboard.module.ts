import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AngularMaterialModule } from '../../core/angular-material.module';
import {UserService} from "../../core/services/user.service";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    NgxSpinnerModule,
    AngularMaterialModule
  ],
  providers: [
    UserService
  ],
})
export class DashboardModule { }
