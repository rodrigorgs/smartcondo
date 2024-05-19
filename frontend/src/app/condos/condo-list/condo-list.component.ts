import { Component } from '@angular/core';
import { CondoService } from '../condo.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'condo-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './condo-list.component.html',
  styleUrl: './condo-list.component.scss'
})
export class CondoListComponent {
  condos: Array<any> = [];

  constructor(private condoService: CondoService) {
    this.loadCondos();
  }

  loadCondos() {
    this.condoService.getCondos().subscribe((condos: any) => {
      this.condos = condos;
    });
  }
}
