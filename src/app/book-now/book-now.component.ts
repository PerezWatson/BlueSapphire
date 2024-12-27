import { NgIf, NgClass,NgFor } from '@angular/common';
import { Component, OnInit,AfterViewInit,inject, ViewChild} from '@angular/core';
import { CheckAvailabilityComponent } from "../check-availability/check-availability.component";
import { SubmitComponent } from '../loader/submit/submit.component';
import { FormsModule,NgForm } from '@angular/forms';
import { BookingService } from '../Services/booking.service';
import { HttpErrorResponse} from '@angular/common/http';
import { map} from 'rxjs/operators';
import { NotifyLoaderService } from '../Services/notify.service';
import { ElementRef } from '@angular/core';
import flatpickr from "flatpickr";

interface handler{
  status:boolean,
  success:boolean
}

interface userTime{
  hall:string,
  start:string,
  end:string
}

interface interface1{
  key:{
    end:string,
    space:string,
    start:string
  }
}

interface bookingDetails{
  hall: string, 
  start: string, 
  end: string
}

interface Spaces {
  name1:string,
  capacity:string
}

interface handler{
  status:boolean,
  success:boolean
}

@Component({
  selector: 'app-book-now',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    NgFor,
    CheckAvailabilityComponent,
    SubmitComponent
  ],
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.css']
})


export class BookNowComponent implements AfterViewInit, OnInit{
  showLoader: boolean = false;
  showBookingForm: boolean = false;
  showFailureNotification: boolean = false;
  errorMessage:string | null=null;
  startDate:string='';
  endDate:string='';
  bookingSpace?:Spaces[];
  availabilityStatus:boolean;
  bookingMessage:string='';
  checkavailabilityDetails:bookingDetails;
  bookingService:BookingService=inject(BookingService);
  notifyLoaderService:NotifyLoaderService=inject(NotifyLoaderService);r
  UserTime:userTime;
  selectedDate:string='select date'

constructor(){ }

// initialization of form from the view for data access and validation
@ViewChild('checkForm') checkForm:NgForm;

// hooks below fetch the space capacity of hall by an first API
ngOnInit() {
    this.bookingService.fetchSpace().pipe(map((response)=>{
         let data;
         for(let key in response){
            for(let key1 in response[key]){
              if(key1== 'data'){
                data=response[key][key1]
              }
            }
         }
          return data;
              })).subscribe({
          next:(response)=>{  this.bookingSpace=[...response].reverse()},
          error:(error)=>{console.log(error);}      
          })  
    }

//access of input tag that carry flatpckr for configuration
    @ViewChild("datePicker1", {static:false }) datePicker1:ElementRef;
    @ViewChild("datePicker2", {static:false }) datePicker2:ElementRef;

    private flapickrInstance1:any;
    private flapickrInstance2:any;
// hooks below work with flatpickr configurations
ngAfterViewInit() {
  this.flapickrInstance1=flatpickr(this.datePicker1.nativeElement, {
        dateFormat: "d-m-Y", // Customize the format as needed
        enableTime: false, // Set to true if you need time selection
        minDate:"today",   // Set minimum date for starting date selection
        disableMobile:true
      });

  this.flapickrInstance2=flatpickr(this.datePicker2.nativeElement,{
        dateFormat: "d-m-Y", // Customize the format as needed
        enableTime: false,   // Set to true if you need time selection
        minDate:"today",  // Set maxmum date for ending date selection
        disableMobile:true
      });

      this.showingLoaderToast();
    }
   
// below are manual open of datepicker in mobile version for selection date
    openDatePicker1(){
        this.flapickrInstance1.open()
     }

     openDatePicker2(){
      this.flapickrInstance2.open()
   } 
  
//method for hiding booking form after submision when submit button clicked
hideForm(data:boolean){
    this.availabilityStatus=data;
  }

// method that handle checking of availability of hall after button clicked
submit(){
  // below responsible for showing loader while checking availability from API
  this.notifyLoaderService.checking.emit(true);
  this.showLoader=true;

  // data variable prepared for re-allignment and to be used in API
  let ends=this.checkForm.value.end;
  let starts=this.checkForm.value.start;

  //  data object for checking availability in first API payload and for second API payload when booking is submitted
    this.UserTime={
       end:ends[6]+ends[7]+ends[8]+ends[9]+ends[5]+ends[3]+ends[4]+ends[2]+ends[0]+ends[1],
       start:starts[6]+starts[7]+starts[8]+starts[9]+starts[5]+starts[3]+starts[4]+starts[2]+starts[0]+starts[1],
       hall:this.checkForm.value.space
 }

  // below is working with API to check hall availability based on user date selection 
    this.bookingService.checkAvailability({end:this.checkForm.value.end, start:this.checkForm.value.start, hall:this.checkForm.value.space
      }).pipe(
      map((response)=>{
      for(let key in response){
        for(let key1 in response[key]){
          if(key1==='status'){
            if(response[key][key1] ==='available'){
               this.availabilityStatus=true;
               this.bookingMessage='';}
            else{ 
              this.availabilityStatus=false 
              this.bookingMessage='Hall is not available, please choose/book another day' 
              setTimeout(()=>{this.bookingMessage='' },3000);
              this.availabilityStatus=false 
              this.showLoader=false;
            }
      }
    }
}
       return null})).subscribe({
        next:(response)=>{ this.showLoader=false; },
        error:(error)=>{console.log(error);}      
        })
}

// method that handler displaying of loader and a toast when booking is completed and according to API response
showingLoaderToast(){
  this.notifyLoaderService.complete.subscribe((data:handler)=>{
    console.log("booking component");
    console.log(data);
    setTimeout(()=>{
      this.showLoader=false;
      if(data.success===true){ this.showToast(this.successMsg);}
      else{ this.showToast(this.errorMsg);}
    },2000);
  })
}

displayLoader(data:boolean){
  this.showLoader=data;
  setTimeout(()=>{this.showLoader=false},3000)

  this.checkForm.reset();
}

  successMsg =  '<i class="fa-solid fa-circle-check"></i>Booking made successfully';
  errorMsg =   '<i class="fa-solid fa-circle-xmark"></i> Error occurred, try again';
  invalidMsg = '<i class="fa-solid fa-circle-exclamation"></i> invalid input, try again';

  @ViewChild('toastBox') toastBox: ElementRef<any>;

  showToast(msg: string): void {
    let toast = document.createElement('div');
       toast.classList.add('toast');
      toast.innerHTML = msg;
      this.toastBox.nativeElement.appendChild(toast);

    // Add specific class for different types of messages
    if (msg.includes('error')) {
      toast.classList.add('error');
    }
    if (msg.includes('invalid')) {
      toast.classList.add('invalid');
    }

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}