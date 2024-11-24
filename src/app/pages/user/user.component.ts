import { Component,inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  status = false;
  authservice= inject(AuthService);
  router=inject(Router);
  
  public logout(){
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
}
