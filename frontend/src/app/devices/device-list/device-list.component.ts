import { Component } from '@angular/core';
import { DeviceService } from '../device.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CondoService } from '../../condos/condo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent {
  devices: Array<any> = [];
  condo: any = {};
  key: string = '';

  constructor(
    private condoService: CondoService,
    private deviceService: DeviceService,
    private route: ActivatedRoute
  ) {
    this.loadDevices();
  }

  loadDevices() {
    const slug = this.route.snapshot.paramMap.get('condoSlug');
    this.key = this.route.snapshot.queryParamMap.get('key') ?? '';
    if (!slug) {
      this.devices = [{ name: 'Not found' }];
    } else {
      this.deviceService.getDevices(slug, this.key).subscribe((devices: any) => {
        this.devices = devices;
      });
      this.condoService.getCondoBySlug(slug).subscribe((condo: any) => {
        this.condo = condo;
      });
    }
  }
}
