import {Component, OnDestroy} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UserService} from "../../core/services/user/user.service";
import Swal from 'sweetalert2';
import {RolesService} from "../../core/services/roles/roles.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnDestroy {

  public userRoles: Array<any> = [];
  public name = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public role = new FormControl('', [Validators.required]);
  public user;

  constructor(private userService: UserService, private rolesService: RolesService) {
    this.getRoles();
    this.user = JSON.parse(<string>localStorage.getItem('userEdit'));

  }

  ngOnDestroy(): void {
    localStorage.removeItem('userEdit');
  }

  pegarMensagemErro() {
    if (this.email.hasError('required')) {
      return 'O e-mail é obrigatório.';
    }
    return this.email.hasError('email') ? 'Não é um endereço de e-mail válido.' : '';
  }

  getRoles() {
    this.rolesService.get().subscribe((res) => this.userRoles = res);
  }

  cadastrar() {
    if (this.name.invalid || this.email.invalid || this.role.invalid) {
      return;
    }
  }

  showMessage(text: string) {
    Swal.fire({icon: 'success', title: 'Sucesso!', text: text}).then();
  }

  reset() {
    this.name.setValue('');
    this.email.setValue('');
    this.role.setValue('');
  }
}
