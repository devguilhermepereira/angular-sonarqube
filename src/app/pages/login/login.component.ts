import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthenticationService} from "../../core/services/authentication/authentication.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  public error: any;

  constructor(private service: AuthenticationService, private spinner: NgxSpinnerService, private router: Router) {

  }

  getError() {
    if (this.email.hasError('required')) {
      return 'O e-mail é obrigatório.';
    }
    return this.email.hasError('email') ? 'Não é um endereço de e-mail válido.' : '';
  }

  login() {
    if (this.email.invalid || this.password.invalid) {
      return;
    } else {
      this.spinner.show();
      const user = {email: this.email.value, password: this.password.value};
      this.service.login(user).subscribe((res) => this.validLogin(res), () => this.spinner.hide());
    }
  }

  validLogin(res: any) {
    if (res && res.length) {
      if (res[0].password === this.password.value) {
        this.spinner.hide();
        localStorage.setItem('token', JSON.stringify(res));
        this.router.navigate(['/']);
      } else {
        this.error = 'Usuário ou senha incorreto';
        this.spinner.hide();
      }
    } else {
      this.error = 'Usuário ou senha incorreto';
      this.spinner.hide();
    }
  }
}
