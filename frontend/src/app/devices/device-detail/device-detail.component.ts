import { Component } from '@angular/core';
import { CondoService } from '../../condos/condo.service';
import { DeviceService } from '../device.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.scss'
})
export class DeviceDetailComponent {
  condo: any = {};
  device: any = {};
  key: string = '';
  message: any = '';

  constructor(
    private condoService: CondoService,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loadDevice();
  }

  loadDevice() {
    const condoSlug = this.route.snapshot.paramMap.get('condoSlug');
    const deviceSlug = this.route.snapshot.paramMap.get('deviceSlug');
    this.key = this.route.snapshot.queryParamMap.get('key') ?? '';
    if (!condoSlug || !deviceSlug) {
      this.device = { name: 'Not found' };
    } else {
      this.deviceService.getDevice(condoSlug, deviceSlug, this.key).subscribe({
        next: (device: any) => {
          this.device = device;
        },
        error: (err) => {
          if (err.status === 403) {
            this.router.navigate(['/forbidden']);
          }
        }
      });
      this.condoService.getCondoBySlug(condoSlug).subscribe({
        next: (condo: any) => {
          this.condo = condo;
        },
        error: (err) => {
          if (err.status === 403) {
            this.router.navigate(['/forbidden']);
          }
        }
      });
    }
  }

  async activateDevice() {
    const condoSlug = this.route.snapshot.paramMap.get('condoSlug');
    const deviceSlug = this.route.snapshot.paramMap.get('deviceSlug');
    if (!condoSlug || !deviceSlug) {
      throw new Error('Invalid condo or device');
    }

    this.message = 'Verificando localização...';
    if (!navigator.geolocation) {
      this.message = 'Geolocalização não suportada pelo navegador.';
      return;
    }
    console.log(this);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(this);
        this.message = '1';
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const allowedLat = -12.9477487;
        const allowedLng = -38.4541479;
        const distance = Math.sqrt(
          Math.pow(lat - allowedLat, 2) + Math.pow(lng - allowedLng, 2)
        );
        this.message = '2';
        if (distance > 0.0002) { // ~20m radius
          this.message = '3';
          this.message = 'Você precisa estar próximo ao local autorizado para ativar este dispositivo.';
          return;
        }
        this.message = '4';
        this.message = 'Aguardando resposta...';
        this.deviceService.activateDevice(condoSlug, deviceSlug, this.key).subscribe((x: any) => {
          this.message = x.originalResponse.msg;
        });
      },
      (error) => {
        this.message = 'Não foi possível obter sua localização.';
      },
      {
        enableHighAccuracy: false,
        timeout: 10_000,
        maximumAge: (3600000 /* 1 hour */)
      }
    );
  }
}
