import { LoadGuard } from './auth/load.guard';
import { FormGuardGuard } from './auth/form-guard.guard';
import { ManagementComponent } from './management/management.component';
import { ListComponent } from './admin/list/list.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './admin/welcome/welcome.component';
import { AuthenticationGuard } from './auth/authentication.guard';
import { PermissionsGuardChild } from './auth/permissions.guard.child';
import { Roles } from './auth/auth.service';
import { PermissionsGuard } from './auth/permissions.guard';

const routes: Routes = [
  { 
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [LoadGuard],
    data: {auth: [Roles[Roles.ADMIN]]},
  },
  {
    path: 'management',
    component: ManagementComponent,
    // canActivate: [IsManagerGuard],
    canActivate: [PermissionsGuard],
    data: {auth: [Roles[Roles.MANAGER]]},
  },


  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
