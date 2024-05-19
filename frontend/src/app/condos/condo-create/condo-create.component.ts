import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CondoService } from '../condo.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-condo-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './condo-create.component.html',
  styleUrl: './condo-create.component.scss'
})
export class CondoCreateComponent {
  condo: {name: string, address: string, slug: string} = {name: '', address: '', slug: ''};

  constructor(
    private condosService: CondoService,
    private router: Router
  ) {}

  async createCondo() {
    console.log('Creating condo', this.condo);
    // Logic to create the condo (e.g., call a service)
    this.condosService.createCondo(this.condo).subscribe((condo: any) => {
      console.log('Condo created', condo);
      this.router.navigate(['/']);
    });
  }
}
