import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  getCurrentUser(): Promise<any> {
    const token = this.getCookie('access_token');
    if (!token) return Promise.resolve(null);
    let userId: string | undefined;
    try {
      const decoded: any = jwtDecode(token);
      userId = decoded.sub;
    } catch {
      return Promise.resolve(null);
    }
    if (!userId) return Promise.resolve(null);
    return this.http.get(`/api/users/${userId}`).toPromise();
  }
  
  getCondoToUser(condoSlug: string, userId: number) {
    return this.http.get(`/api/condos/${condoSlug}/users/${userId}`);
  }

    // return this.getCurrentUser().then(user => {
    //   if (!user || !user.condos || user.condos.length === 0) {
    //     return null;
    //   }
    //   return user.condos[0]; // Assuming we want the first condo
    // });
  // }
}
