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

    this.message = 'Aguardando resposta...';
    // wait 1 second
    // await new Promise(resolve => setTimeout(resolve, 1000));
    this.deviceService.activateDevice(condoSlug, deviceSlug, this.key).subscribe((x: any) => {
      this.message = x.originalResponse.msg;
    });
  }
}
