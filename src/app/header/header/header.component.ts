import { Component, OnInit } from '@angular/core';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css'; // Import Flatpickr styles

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  ngOnInit() {
    flatpickr("#datepicker", {
      // Add any desired Flatpickr options here
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      minDate: "2023-01-01",
      maxDate: "2024-12-31"
    });
  }
}
