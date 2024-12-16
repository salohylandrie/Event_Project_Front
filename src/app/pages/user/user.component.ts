import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { InscriptionService } from '../../serviceInscription/inscription.service';
import { EvenementFormComponent } from '../evenement-form/evenement-form.component';
import { InscriptionFormComponent } from '../inscription-form/inscription-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  status = false;
  selectedEventId: number | null = null;
  authservice = inject(AuthService);
  router = inject(Router);

  evenement: any[] = [];
  displayedColumns: string[] = [
    'id',
    'user_id',
    'evenement_id',
    'email',
    'date_inscri',
    'action',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private evenementservive: InscriptionService,
    private elementRef: ElementRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.AfficheListeEvenement();
  }

  AfficheListeEvenement(): void {
    this.evenementservive.getInscriptions().subscribe((data) => {
      this.evenement = data;
      this.dataSource = new MatTableDataSource(this.evenement);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

 

  


  viewEvenement(evenement: any) {
    console.log("Détails de l'événement :", evenement);
  }


  openAddEditEmployeeDialog() {
    const dialogRef = this.dialog.open(InscriptionFormComponent);
    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.AfficheListeEvenement();
      }
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(InscriptionFormComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.AfficheListeEvenement();
      }
    });
  }
 
  showDeleteModal(id: number) {
    this.selectedEventId = id;
    const modal = this.elementRef.nativeElement.querySelector('#myModal');
    modal.style.display = 'block';
  }

 

  public logout() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  hideDeleteModal() {
    this.selectedEventId = null;
    const modal = this.elementRef.nativeElement.querySelector('#myModal');
    modal.style.display = 'none';
  }

  deleteEvenement(id: number | null): void {
    if (id === null) {
      console.error("ID de l'événement non valide");
      return;
    }
    this.evenementservive.deleteInscription(id).subscribe(() => {
      this.AfficheListeEvenement();
    });
  }
  
}



