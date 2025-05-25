import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CondoService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private http: HttpClient) {}

  getCondos() {
    return this.http.get(`/api/condos`);
  }

  getCondoBySlug(slug: string) {
    return this.http.get(`/api/condos/${slug}`);
  }

  createCondo(condo: { name: string; address: string; slug: string }) {
    console.log('Service creating condo', condo);
    return this.http.post(`/api/condos`, condo);
  }

  getCondoUsers(condoSlug: string): Observable<any> {
    return this.http.get(`/api/condos/${condoSlug}/users`);
  }

  removeCondoUser(condoSlug: string, userId: string) {
    return this.http.delete(`/api/condos/${condoSlug}/users/${userId}`);
  }
}
