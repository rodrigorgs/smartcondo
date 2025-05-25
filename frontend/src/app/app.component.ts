import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SmartCondo';
  currentUser: any = null;

  constructor(private router: Router) {
    this.setCurrentUserFromToken();
  }

  setCurrentUserFromToken() {
    const token = this.getCookie('access_token');
    if (token) {
      try {
        this.currentUser = jwtDecode(token);
      } catch (e) {
        this.currentUser = null;
      }
    } else {
      this.currentUser = null;
    }
  }

  isLoggedIn(): boolean {
    return !!(this.getCookie('access_token'));
  }

  logout() {
    document.cookie = 'access_token=; Max-Age=0; path=/;';
    this.currentUser = null;
    this.router.navigate(['/']);
  }

  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
}
