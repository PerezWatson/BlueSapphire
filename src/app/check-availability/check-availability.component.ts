import { Component,ViewChild,inject ,Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { BookingService } from '../Services/booking.service';
import { NotifyLoaderService } from '../Services/notify.service';
import { NgIf, NgClass,NgFor } from '@angular/common';
import { SubmitComponent } from '../loader/submit/submit.component';


interface bookingDetails{
  hall: string, 
  start: string, 
  end: string
}
     
interface bookingNow {
  hall: string, 
  start_date: string, 
  end_date: string,
  no_of_units:number,
  client: string,
  phone: string, 
  address: string,
  remarks:string
    }
interface handler{
  status:boolean,
  success:boolean
}

interface userTime{
  end:string,
  start:string,
  hall:string
}

@Component({
  selector: 'app-check-availability',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './check-availability.component.html',
  styleUrl: './check-availability.component.css'
})
export class CheckAvailabilityComponent{ 
  // event enitter emit true value to show loader after submision
@Output() loader:EventEmitter<boolean> = new EventEmitter<boolean>();
 
showLoader:boolean=false;
dataSent:bookingNow;
bookingService:BookingService=inject(BookingService);
notifyLoaderService:NotifyLoaderService=inject(NotifyLoaderService);
Http:HttpClient=inject(HttpClient);
confirm:boolean;

// input that receive data obejct of pre used data in checking so as to be used again in completing booking
@Input() UsersTime:userTime;


//event emitter with its method to emit to false value in order hide the booking form after submission
@Output() hide:EventEmitter<boolean> = new EventEmitter<boolean>();
  hideForm(){
    this.hide.emit(false);
  }
// variable to access form and its value from the view
  @ViewChild('bookingForm') bookingForm:NgForm;
  // method that respond to form submission with API manipulations to complete booking
  onBookingFormSubmitted(){
   this.loader.emit(true);

     this.dataSent = {
      hall:this.UsersTime.hall, 
      start_date:this.UsersTime.start, 
      end_date:this.UsersTime.end, 
      no_of_units: 5,
      client:this.bookingForm.value.fullName,
      phone: this.bookingForm.value.phoneNumber.toString(),
      address: this.bookingForm.value.address,
      remarks:this.bookingForm.value.views
    }
    
    this.bookingService.BookNow(this.dataSent).subscribe({
      next:(response)=>{
          this.notifyLoaderService.complete.emit({ status:true, success:true});
      },
      error:(error)=>{
        this.notifyLoaderService.complete.emit({ status:false, success:false});
      }
    })
    }
}

