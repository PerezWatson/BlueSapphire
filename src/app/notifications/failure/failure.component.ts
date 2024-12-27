import { Component, EventEmitter,Output,inject } from '@angular/core';

@Component({
  selector: 'app-failure',
  standalone: true,
  imports: [],
  templateUrl: './failure.component.html',
  styleUrl: './failure.component.css'
})
export class FailureComponent {
@Output() confirmAlert:EventEmitter<boolean>=new EventEmitter<boolean>;

onConfirm(value:boolean){
  this.confirmAlert.emit(value);
}

}