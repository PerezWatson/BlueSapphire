import { AfterViewInit, Component,inject, OnInit } from '@angular/core';
import { NotifyLoaderService } from '../../Services/notify.service';
@Component({
  selector: 'app-submit',
  standalone: true,
  imports: [],
  templateUrl: './submit.component.html',
  styleUrl: './submit.component.css'
})
export class SubmitComponent implements OnInit,AfterViewInit{
checking:boolean=true;
notifyLoaderService:NotifyLoaderService=inject(NotifyLoaderService);

ngOnInit(){
this.notifyLoaderService.checking.subscribe((status:boolean)=>{
  this.checking = status;  
})
}

ngAfterViewInit(){
  this.notifyLoaderService.checking.subscribe((status:boolean)=>{
    this.checking = status;  
  })
  }
}
