import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { ProblemsComponent } from './problems/problems.component';
import { ProblemDetailComponent } from './problems/problem-detail/problem-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent},
  { path: "login", component: UserLoginComponent },
  { path: "problems", component: ProblemsComponent },
  { path: "problem-detail/:id", component: ProblemDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
