import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccessKeysService } from '../condos/access-keys/access-keys.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  accessKey: string = '';

  constructor(private router: Router, private keyService: AccessKeysService) {}

  loginWithGoogle() {
    window.location.href = '/api/auth/google';
  }

  enterAccessKey() {
    if (!this.accessKey) {
      alert('Please enter an access key.');
      return;
    }
    this.keyService.getAccessKeyInfo(this.accessKey).subscribe({
      next: (info: any) => {  
        this.router.navigate(['condos', info.condoSlug], { queryParams: { key: this.accessKey } });
      },
    });
    // Redirect to a page that uses the access key, e.g., condos list with key param
  }
}
