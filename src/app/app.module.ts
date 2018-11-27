import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";

import { AppComponent } from './app.component';
import { AuthService } from './core/auth.service';
import { environment } from '../environments/environment';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProblemsComponent } from './problems/problems.component';
import { ProblemDetailComponent } from './problems/problem-detail/problem-detail.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    ProblemsComponent,
    ProblemDetailComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
