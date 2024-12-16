import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InscriptionService } from '../../serviceInscription/inscription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EvenementService } from '../../service/evenement.service';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {
  formgroup: FormGroup;
  evenements: { id: number }[] = []; // Liste des événements disponibles pour la sélection

  constructor(
    private inscriptionService: InscriptionService,
    private evenementService: EvenementService,
    private dialogRef: MatDialogRef<InscriptionFormComponent>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formgroup = this.formBuilder.group({
      evenement_id: ['', Validators.required], // Contrôle pour l'evenement_id
    });
  }

  ngOnInit(): void {
    this.loadEvenements();

    // Pré-remplir le formulaire si des données existent
    if (this.data?.evenement_id) {
      this.formgroup.patchValue({
        evenement_id: this.data.evenement_id, // Pré-sélectionner l'événement si disponible
      });
    }
  }

  // Charger la liste des événements disponibles
  loadEvenements(): void {
    this.evenementService.getEvenements().subscribe({
      next: (evenements) => {
        this.evenements = evenements; // Assurez-vous que cette liste contient {id: number}
      },
      error: (err) => {
        console.error('Erreur lors du chargement des événements :', err);
      },
    });
  }

  saveEvenement(): void {
    if (this.formgroup.valid) {
      const formValue = this.formgroup.value;

      if (this.data?.id) {
        // Mise à jour d'une inscription existante
        this.inscriptionService.updateInscription(this.data.id, formValue).subscribe({
          next: () => {
            alert('Inscription mise à jour avec succès.');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour de l\'inscription :', err);
            alert('Erreur lors de la mise à jour.');
          },
        });
      } else {
        // Création d'une nouvelle inscription
        this.inscriptionService.createInscription(formValue).subscribe({
          next: () => {
            alert('Inscription ajoutée avec succès.');
            this.formgroup.reset();
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Erreur lors de la création de l\'inscription :', err);
            alert('Erreur lors de la création.');
          },
        });
      }
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}
