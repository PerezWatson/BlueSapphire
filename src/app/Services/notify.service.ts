import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

interface userTime{
  hall:string,
  start:string,
  end:string
}
interface handler{
  status:boolean,
  success:boolean
}

@Injectable({
  providedIn: 'root',
})
export class NotifyLoaderService {
  // Define EventEmitters for checking and submitting
  public checking = new EventEmitter<boolean>();
  public complete = new EventEmitter<handler>();
  
 public userTimeSubject = new Subject<userTime>();

}