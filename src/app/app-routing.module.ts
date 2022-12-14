import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatesComponent } from './master/states/states.component';
import { UsersComponent } from './master/users/users.component';
const routes: Routes = [
  { path: 'dashboard', data: { breadcrumb: 'dashboard' }, component: DashboardComponent },
  {
    path: 'master', data: { breadcrumb: 'master' }, children: [
      { path: 'states', component: StatesComponent, data: { breadcrumb: 'States' } },
      { path: 'users', component: UsersComponent, data: { breadcrumb: 'Users' } }
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
