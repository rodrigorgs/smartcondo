import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private http: HttpClient) {}

  getDevices(condoSlug: string, accessKey: string = "") {
    return this.http.get(`/api/condos/${condoSlug}/devices?key=${accessKey}`);
  }

  getDevice(condoSlug: string, deviceSlug: string, accessKey: string = "") {
    return this.http.get(`/api/condos/${condoSlug}/devices/${deviceSlug}?key=${accessKey}`);
  }

  activateDevice(condoSlug: string, deviceSlug: string, accessKey: string = "") {
    return this.http.post(`/api/condos/${condoSlug}/devices/${deviceSlug}/state?key=${accessKey}`, {});
  }
}
