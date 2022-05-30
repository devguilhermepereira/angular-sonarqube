import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardModule} from "./dashboard/dashboard.module";
import {UserModule} from "./user/user.module";
import {LoginModule} from "./login/login.module";
import {PagesRouting} from "./pages.routing";

const Modules: any = [
  DashboardModule,
  UserModule,
  LoginModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRouting
  ],
  exports: [
    ...Modules
  ]
})
export class PagesModule {
}
