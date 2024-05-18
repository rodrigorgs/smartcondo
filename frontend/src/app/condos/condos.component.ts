import { Component } from '@angular/core';
import { CondoService } from './condo.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-condos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './condos.component.html',
  styleUrl: './condos.component.scss'
})
export class CondosComponent {
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
