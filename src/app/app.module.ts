import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AppRoutingModule } from './app-routing.module'; // Importez AppRoutingModule
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { UserComponent } from './pages/user/user.component';
import { EvenementService } from './service/evenement.service';
import { RouterLink } from '@angular/router';
import { EvenementFormComponent } from './pages/evenement-form/evenement-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    EvenementFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule ,
    RouterLink// Utilisez AppRoutingModule pour gérer les routes
  ],
  providers: [AuthService, EvenementService], // Ajoutez authGuard dans les providers
  bootstrap: [AppComponent]
})
export class AppModule {}
