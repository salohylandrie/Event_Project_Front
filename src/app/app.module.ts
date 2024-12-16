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
import { MatDialogModule } from '@angular/material/dialog';
import { InscriptionFormComponent } from './pages/inscription-form/inscription-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { authInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    EvenementFormComponent,
    InscriptionFormComponent,
  ],
  imports: [
    BrowserModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule ,
    BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
    RouterLink// Utilisez AppRoutingModule pour gérer les routes
  ],
  providers: [AuthService, EvenementService,{
    provide: HTTP_INTERCEPTORS,
    useClass: authInterceptor,
    multi: true
  }], // Ajoutez authGuard dans les providers
  bootstrap: [AppComponent]
})
export class AppModule {}
