import { Component, OnInit  } from '@angular/core';
import { inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email],
        [this.asyncEmailValidator], // Validateur asynchrone
      ],
      password: ['', Validators.required],
    });
  }

  asyncEmailValidator(control: any): Observable<any> {
    const email = control.value;
    if (email === 'test@example.com') {
      return of({ emailTaken: true }); // Retourne une erreur si l'email est "test@example.com"
    }
    return of(null); // Aucun problème
  }

  login(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
  
      this.authService.login(loginData).subscribe(
        (response: any) => {
          console.log('Connexion réussie, réponse :', response);
          const roles = response.roles;
          if (roles.includes('ROLE_ADMIN')) {
            console.log('Redirection vers /admin');
            this.router.navigate(['/admin']);
          } else if (roles.includes('ROLE_USER')) {
            console.log('Redirection vers /user');
            this.router.navigate(['/user']);
          } else {
            console.error('Rôle inconnu, reste sur login.');
          }
        },
        (error) => {
          console.error('Erreur lors de la connexion', error);
        }
      );
    } else {
      console.error('Formulaire invalide');
    }
  }
}