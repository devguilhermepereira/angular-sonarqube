import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardModule} from "./dashboard/dashboard.module";
import {UserModule} from "./user/user.module";

const Modules: any = [
  DashboardModule,
  UserModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ...Modules
  ]
})
export class PagesModule {
}
