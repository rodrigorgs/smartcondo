import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DevicesService {
  constructor(private http: HttpClient) {}

  createDevice(condoSlug: string, device: any, key: string): Observable<any> {
    return this.http.post(`/api/condos/${condoSlug}/devices?key=${key}`, device);
  }
}
