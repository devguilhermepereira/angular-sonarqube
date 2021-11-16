import {Component, OnDestroy} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UserService} from "../../core/services/user.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnDestroy {

  public novo: boolean = true;
  public name = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private userService: UserService) {
    const user: any = JSON.parse(<string>localStorage.getItem('userEdit'));
    if (user) {
      this.novo = false;
      this.name.setValue(user.name);
      this.email.setValue(user.email);
    } else {
      this.novo = true;
    }
  }

  pegarMensagemErro() {
    if (this.email.hasError('required')) {
      return 'O e-mail é obrigatório.';
    }
    return this.email.hasError('email') ? 'Não é um endereço de e-mail válido.' : '';
  }

  cadastrar() {
    if (this.name.valid || this.email.valid) {
      const data = {
        name: this.name.value,
        email: this.email.value
      }
      this.userService.save(data).then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Usuário cadastrado',
        }).then();
      })
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('userEdit');
  }
}
