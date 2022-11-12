import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { UsersComponent } from './master/users/users.component';
import { SecondPageComponent } from "./second-page/second-page.component";
const routes: Routes = [
  { path: 'first-page', component: FirstPageComponent },
  { path: 'second-page', component: SecondPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: '', redirectTo: '/first-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
