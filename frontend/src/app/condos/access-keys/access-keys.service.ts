import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccessKeysService {
  constructor(private http: HttpClient) {}

  getAccessKeys(condoSlug: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/condos/${condoSlug}/access-keys`);
  }

  getAccessKeyInfo(key: string): Observable<any> {
    return this.http.get<any>(`/api/access-keys/${key}`);
  }
  createAccessKey(condoSlug: string, data: any): Observable<any> {
    return this.http.post(`/api/condos/${condoSlug}/access-keys`, data);
  }

  deleteAccessKey(condoSlug: string, key: string) {
    return this.http.delete(`/api/condos/${condoSlug}/access-keys/${key}`);
  }
}
