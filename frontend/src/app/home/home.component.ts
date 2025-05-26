import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessKeysService } from '../condos/access-keys/access-keys.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  accessKey: string = '';

  constructor(private router: Router, private keyService: AccessKeysService) {}

  ngOnInit() {
    // Check if user is logged in (e.g., by checking for a JWT in localStorage or a cookie)
    // Adjust this logic to your actual authentication method
    const token = this.getCookie('access_token');
    if (token) {
      this.router.navigate(['/condos']);
    }
  }

  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

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
      error: (err) => {
        alert('Chave de acesso inválida ou expirada.');
      }
    });
    // Redirect to a page that uses the access key, e.g., condos list with key param
  }
}
