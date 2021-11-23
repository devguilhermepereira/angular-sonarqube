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
    if (this.user) {
      this.name.setValue(this.user.name);
      this.email.setValue(this.user.email);
      this.role.setValue(this.user.userType.role);
    }
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
    } else {
      const data: any = {
        active: true,
        email: this.email.value,
        isAdmin: false,
        name: this.name.value,
        password: this.name.value + 123,
      }
      if (this.user) {
        this.userService.update(data, this.role.value, this.user).then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Informações atualizadas',
          }).then();
        })

      } else {
        this.userService.save(data, this.role.value).then((res) => {
          this.reset();
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Funcionário cadastrado',
          }).then();
        })

      }
    }
  }

  reset() {
    this.name.setValue('');
    this.email.setValue('');
    this.role.setValue('');
  }

  ngOnDestroy(): void {
    localStorage.removeItem('userEdit');
  }
}
