import { Component } from '@angular/core';
import { CondoService } from '../condo.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'condo-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './condo-list.component.html',
  styleUrl: './condo-list.component.scss'
})
export class CondoListComponent {
  condos: Array<any> = [];

  constructor(private condoService: CondoService, private router: Router) {
    this.loadCondos();
  }

  loadCondos() {
    this.condoService.getCondos().subscribe({next: (condos: any) => {
      this.condos = condos;
    },
    error: (err) => {
      if (err.status === 403 || err.status === 401) {
        // logout user if unauthorized
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        this.router.navigate(['/']);
      }
    }
  });
  }
}
