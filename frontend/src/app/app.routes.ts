import { Routes } from '@angular/router';
import { CondoListComponent } from './condos/condo-list/condo-list.component';
import { CondoDetailComponent } from './condos/condo-detail/condo-detail.component';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { DeviceDetailComponent } from './devices/device-detail/device-detail.component';
import { CondoCreateComponent } from './condos/condo-create/condo-create.component';
import { DeviceAddComponent } from './devices/device-add/device-add.component';
import { AccessKeysComponent } from './condos/access-keys/access-keys.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

export const routes: Routes = [
  { path: '', redirectTo: '/condos', pathMatch: 'full' },
  { path: 'condos', component: CondoListComponent },
  { path: 'condos/:condoSlug', component: CondoDetailComponent },
  { path: 'condos/:condoSlug/devices', component: DeviceListComponent },
  { path: 'condos/:condoSlug/devices/add', component: DeviceAddComponent },
  { path: 'condos/:condoSlug/devices/:deviceSlug', component: DeviceDetailComponent },
  { path: 'p/:condoSlug/:deviceSlug', component: DeviceDetailComponent },
  { path: 'admin', component: CondoCreateComponent },
  { path: 'condos/:condoSlug/access-keys', component: AccessKeysComponent },
  { path: 'forbidden', component: ForbiddenComponent },
];
