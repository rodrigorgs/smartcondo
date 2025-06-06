import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { AccessKeysService } from './condos/access-keys/access-keys.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // ...other routes
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // ...other components
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    // ...other modules
  ],
  providers: [AccessKeysService],
  bootstrap: [AppComponent]
})
export class AppModule { }