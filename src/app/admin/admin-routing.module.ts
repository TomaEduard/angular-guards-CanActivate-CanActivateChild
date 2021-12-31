import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGuardGuard } from '../auth/form-guard.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListComponent } from './list/list.component';
import { PermissionsGuardChild } from '../auth/permissions.guard.child';
import { Roles } from '../auth/auth.service';

const routes: Routes = [
  { 
    path: '', 
    component: WelcomeComponent,
    children: [
      {
        path: '',
        canActivateChild: [PermissionsGuardChild],
        data: {auth: [Roles[Roles.ADMIN]]},
        children: [
          {
            path: 'add-user',
            component: AddUserComponent,
            canDeactivate: [FormGuardGuard],
          },
          {
            path: 'add-product',
            component: AddProductComponent,
            canDeactivate: [FormGuardGuard],
          },
    
          { 
            path: 'list', 
            component: ListComponent 
          },
    
          { path: '**', redirectTo: 'add-user'}
        ]
      },
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
