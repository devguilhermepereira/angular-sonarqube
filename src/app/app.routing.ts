import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {UserComponent} from "./pages/user/user.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {LoginComponent} from "./pages/login/login.component";
import {MenuComponent} from "./shared/layout/menu/menu.component";


const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {
    path: '',
    canActivate: [AuthGuard], component: MenuComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRouting {
}
