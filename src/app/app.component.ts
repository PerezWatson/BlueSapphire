import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookNowComponent } from './book-now/book-now.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BookNowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
