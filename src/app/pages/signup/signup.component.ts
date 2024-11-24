import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  authservice= inject(AuthService);
  router=inject(Router);
  
  public singupForm= new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  })
  
  public onSubmit(){
    if(this.singupForm.valid){
      console.log(this.singupForm.value);
      this.authservice.signup(this.singupForm.value)
      .subscribe({
        next:(data:any)=>{
          console.log(data);
        this.router.navigate(['/login']);
  
        },
        error: (err)=>console.log(err)
        
          
      }
  
      );
    }
  }
  }
  