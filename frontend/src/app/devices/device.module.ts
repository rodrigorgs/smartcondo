import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceAddComponent } from './device-add/device-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // ...other imports
  ],
  declarations: [
    // ...other components
    DeviceAddComponent,
  ],
  // ...other module properties
})
export class DevicesModule { }