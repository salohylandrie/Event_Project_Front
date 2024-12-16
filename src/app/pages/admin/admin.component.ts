import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { EvenementService } from '../../service/evenement.service';
import { EvenementFormComponent } from '../evenement-form/evenement-form.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'], // corrected from `styleUrl` to `styleUrls`
})
export class AdminComponent implements OnInit {
  status = false;
  selectedEventId: number | null = null;
  authservice = inject(AuthService);
  router = inject(Router);

  evenement: any[] = [];
  displayedColumns: string[] = [
    'id',
    'titre_Even',
    'descri_Even',
    'lieu_Even',
    'date',
    'capacite_Even',
    'categorie_Even',
    'action',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private evenementservive: EvenementService,
    private elementRef: ElementRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.AfficheListeEvenement();
  }

  AfficheListeEvenement(): void {
    this.evenementservive.getEvenements().subscribe((data) => {
      this.evenement = data;
      this.dataSource = new MatTableDataSource(this.evenement);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteEvenement(id: number | null): void {
    if (id === null) {
      console.error("ID de l'événement non valide");
      return;
    }
    this.evenementservive.deleteEvenement(id).subscribe(() => {
      this.AfficheListeEvenement();
    });
  }

  showDeleteModal(id: number) {
    this.selectedEventId = id;
    const modal = this.elementRef.nativeElement.querySelector('#myModal');
    modal.style.display = 'block';
  }

  hideDeleteModal() {
    this.selectedEventId = null;
    const modal = this.elementRef.nativeElement.querySelector('#myModal');
    modal.style.display = 'none';
  }

  viewEvenement(evenement: any) {
    console.log("Détails de l'événement :", evenement);
  }

  openAddEditEmployeeDialog() {
    const dialogRef = this.dialog.open(EvenementFormComponent);
    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.AfficheListeEvenement();
      }
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(EvenementFormComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.AfficheListeEvenement();
      }
    });
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
}
