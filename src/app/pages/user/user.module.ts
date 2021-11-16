import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {AngularMaterialModule} from "../../core/angular-material.module";
import {UserService} from "../../core/services/user.service";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ],
  providers :[
    UserService
  ]
})
export class UserModule { }
