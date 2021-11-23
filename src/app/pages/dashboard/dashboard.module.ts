import {NgModule} from '@angular/core';
import {NgxSpinnerModule} from "ngx-spinner";
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {AngularMaterialModule} from '../../core/angular-material.module';
import {UserService} from "../../core/services/user/user.service";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {RolesService} from "../../core/services/roles/roles.service";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    AngularMaterialModule,
    NgxChartsModule,
    RouterModule
  ],
  providers: [
    UserService,
    RolesService
  ],
})
export class DashboardModule {
}
