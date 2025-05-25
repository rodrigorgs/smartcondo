import { DeviceService } from './../device.service';
import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-device-add',
  templateUrl: './device-add.component.html',
})
export class DeviceAddComponent {
  device = { identifier: '', name: '', slug: '' };
  condoSlug: string;

  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.condoSlug = this.route.snapshot.paramMap.get('condoSlug') || '';
  }

  async addDevice() {
    console.log('Adding device:', this.device);
    this.deviceService.createDevice(this.condoSlug, this.device).subscribe(
      (response) => {
        console.log('Device added successfully:', response);
        this.router.navigate(['/condos', this.condoSlug, 'devices']);
      });
  }
}
