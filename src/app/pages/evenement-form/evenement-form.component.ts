import { Component, OnInit } from '@angular/core';
import { EvenementService } from '../../service/evenement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.css']
})
export class EvenementFormComponent implements OnInit {

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  evenement: any = {
    titre_Even: '',
    descri_Even: '',
    date: '',
    lieu_Even: '',
    capacite_Even: null,
    categorie_Even: ''
  };
  id: number | null = null;

  constructor(
    private evenementService: EvenementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    
    if (this.id) {
      this.evenementService.getEvenement(this.id).subscribe(
        (data) => {
          this.evenement = data;
  
          if (this.evenement.date) {
            const [datePart, timePart] = this.evenement.date.split(' ');
            const [day, month, year] = datePart.split('/');
            const [hour, minute, second] = timePart.split(':');
            
            // Adapter au format pour datetime-local
            this.evenement.date = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'événement :', error);
        }
      );
    }
  }
  

  saveEvenement(): void {
    if (this.evenement.date.includes('T')) {
      // Reformater pour correspondre au format attendu par le backend : d/m/Y H:i:s
      const [datePart, timePart] = this.evenement.date.split('T');
      const [year, month, day] = datePart.split('-');
      const [hour, minute, second] = timePart.split(':');
      this.evenement.date = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    }
  
    if (
      !this.evenement.titre_Even ||
      !this.evenement.descri_Even ||
      !this.evenement.date ||
      !this.evenement.lieu_Even ||
      !this.evenement.capacite_Even ||
      !this.evenement.categorie_Even
    ) {
      console.error('Tous les champs sont requis.');
      return;
    }
  
    if (this.id) {
      this.evenementService.updateEvenement(this.id, this.evenement).subscribe(
        () => {
          console.log('Événement mis à jour avec succès.');
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'événement :', error);
        }
      );
    } else {
      this.evenementService.createEvenement(this.evenement).subscribe(
        () => {
          console.log('Événement créé avec succès.');
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.error('Erreur lors de la création de l\'événement :', error);
        }
      );
    }
  }
  
}
