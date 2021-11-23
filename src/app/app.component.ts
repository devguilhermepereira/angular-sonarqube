import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template:  `
    <router-outlet></router-outlet>
    <ngx-spinner bdColor="rgba(0, 0, 0, 0.8)" size="medium" color="#dd1706" type="pacman" [fullScreen]="true">
        <p style="color: white" > Carregando... </p>
    </ngx-spinner>
  `
})
export class AppComponent {
  title = 'portal';
}
