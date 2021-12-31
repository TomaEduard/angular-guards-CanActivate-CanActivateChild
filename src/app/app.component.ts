import { AuthService, Roles } from './auth/auth.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  roles: string[] = [];
  roleForm: FormControl = new FormControl(this.authService.rol);

  constructor(public authService: AuthService) {
    this.roles = this.authService.getAllRolesAsString();
  }

  setRole() {
    this.authService.rol = this.roleForm.value;
  }


}
