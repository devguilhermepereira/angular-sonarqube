import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {AngularMaterialModule} from "../../core/angular-material.module";
import {UserService} from "../../core/services/user/user.service";
import {RouterModule} from "@angular/router";
import {LayoutModule} from "../../shared/layout/layout.module";
import {RolesService} from "../../core/services/roles/roles.service";



@NgModule({
  declarations: [
    UserComponent
  ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        RouterModule,
        LayoutModule
    ],
  providers :[
    UserService,
    RolesService
  ]
})
export class UserModule { }
