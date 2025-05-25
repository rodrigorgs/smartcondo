import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessKeysComponent } from './access-keys/access-keys.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // ...other imports
  ],
  declarations: [
    // ...other components
    AccessKeysComponent,
  ],
  // ...other module properties
})
export class CondosModule { }