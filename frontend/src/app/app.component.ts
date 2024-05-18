import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CondosComponent } from './condos/condos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CondosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SmartCondo';
}
