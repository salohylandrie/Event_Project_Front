import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EvenementService } from '../../service/evenement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.css']
})
export class EvenementFormComponent implements OnInit {
  formgroup: FormGroup;

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  constructor(
    private evenementService: EvenementService,
    private dialogRef: MatDialogRef<EvenementFormComponent>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialiser le formulaire avec des validations
    this.formgroup = this.formBuilder.group({
      titre_Even: ['', Validators.required],
      descri_Even: ['', Validators.required],
      date: ['', Validators.required], // Champ requis pour la date
      lieu_Even: ['', Validators.required],
      capacite_Even: [null, [Validators.required, Validators.min(1)]], // La capacité doit être un nombre valide
      categorie_Even: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Pré-remplir le formulaire si des données existent
    if (this.data) {
      const event = { ...this.data };
      if (event.date) {
        // Adapter le format pour le champ `datetime-local`
        const [datePart, timePart] = event.date.split(' ');
        const [day, month, year] = datePart.split('/');
        const [hour, minute, second] = timePart.split(':');
        event.date = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
      }
      this.formgroup.patchValue(event);
    }
  }

  saveEvenement(): void {
    if (this.formgroup.valid) {
      const formValue = this.formgroup.value;

      // Reformatage de la date avant envoi au backend
      if (formValue.date) {
        const date = new Date(formValue.date); // Convertir en objet Date
        formValue.date = this.formatDate(date); // Reformater avec formatDate
      }

      if (this.data?.id) {
        // Mise à jour d'un événement existant
        this.evenementService.updateEvenement(this.data.id, formValue).subscribe({
          next: () => {
            alert('Événement mis à jour avec succès.');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour de l\'événement :', err);
            alert('Erreur lors de la mise à jour.');
          },
        });
      } else {
        // Création d'un nouvel événement
        this.evenementService.createEvenement(formValue).subscribe({
          next: () => {
            alert('Événement ajouté avec succès.');
            this.formgroup.reset();
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Erreur lors de la création de l\'événement :', err);
            alert('Erreur lors de la création.');
          },
        });
      }
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}
