import { Component } from '@angular/core';
import { CondoService } from '../condo.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-condo-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './condo-detail.component.html',
  styleUrl: './condo-detail.component.scss'
})
export class CondoDetailComponent {
  condo: any = {};

  constructor(private condoService: CondoService,
    private route: ActivatedRoute
  ) {
    this.loadCondo();
  }

  loadCondo() {
    console.log('Loading condo');
    const slug = this.route.snapshot.paramMap.get('condoSlug');
    if (!slug) {
      this.condo = { name: 'Not found'}
    } else {
      this.condoService.getCondoBySlug(slug).subscribe((condo: any) => {
        console.log('Condo loaded', condo);
        this.condo = condo;
      });
    }
  }
}
