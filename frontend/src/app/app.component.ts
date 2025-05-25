import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SmartCondo';

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!(this.getCookie('access_token'));
  }

  logout() {
    document.cookie = 'access_token=; Max-Age=0; path=/;';
    this.router.navigate(['/']);
  }

  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
}
