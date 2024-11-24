import { Component,inject ,OnInit} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';


import { EvenementService } from '../../service/evenement.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent  implements OnInit{
  status = false;
  authservice= inject(AuthService);
  router=inject(Router);

  evenement: any[] = [];
  
  
 constructor(private evenementservive: EvenementService) {}

 ngOnInit(): void {
     this.evenementservive.getEvenements().subscribe(data=>{
      this.evenement=data; 
     });
 }


 deleteEvenement(id:number): void{
  this.evenementservive.deleteEvenement(id).subscribe(()=>{
    this.evenement=this.evenement.filter(evenement=>evenement.id!=id);
  })

  if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
    // Implémentez la logique pour supprimer l'événement
    console.log('Événement supprimé avec l\'ID:', id);
  }
 }

 viewEvenement(evenement: any) {
  // Implémentez la logique pour afficher les détails
  console.log('Détails de l\'événement :', evenement);
}

 public logout(){
  this.authservice.logout();
  this.router.navigate(['/login']);
}


}

  