import { Injectable,inject } from "@angular/core";
import { HttpClient, HttpHeaders,HttpParams, HttpErrorResponse} from "@angular/common/http";
import { Subject } from 'rxjs'

interface SpaceResponse {
  message: {
    data: Array<{ name1: string, capacity: string }>,
    status:string
  };
}

interface checkAvailability{
  message:{
       status:string,
       message:string,
       estimated_price:number
  }
}
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
  remarks: string
    }
interface bookingResponse{
    message:{
      success:boolean,
      booking:string
    }
}
@Injectable({
    providedIn:'root'
})
export class BookingService{
  errorSubject=new Subject<HttpErrorResponse>();
    http:HttpClient=inject(HttpClient);
    spaceApiUrl:string='https://blues.albitech.co.tz/api/method/conference_hall.conference_hall.doctype.booking.api.get_halls'
    checkAvailabilityApiUrl:string='https://blues.albitech.co.tz//api/method/conference_hall.conference_hall.doctype.booking.api.check_availability'
    bookingApiUrl:string='https://blues.albitech.co.tz/api/method/conference_hall.conference_hall.doctype.booking.api.post_booking'

    fetchSpace(){
      const header=new HttpHeaders({
        'Authorization':'74b542f5d6858e7:78ce35f272a1eb2',
        'Content-Type':'application/json'
      })

      return this.http.get<SpaceResponse>(this.spaceApiUrl, {headers:header})
    }

    checkAvailability(bookingData: bookingDetails) {
      const header = new HttpHeaders({
          'Authorization':'token 74b542f5d6858e7:78ce35f272a1eb2',
          'Content-Type':'application/json'
      });
        
      return this.http.post<checkAvailability>(this.checkAvailabilityApiUrl, bookingData, { headers:header});
  }  
   
  BookNow(data:bookingNow){
    let header= new HttpHeaders({
      'Content-Type':'application/json',
      "Authorization":'token 74b542f5d6858e7:78ce35f272a1eb2'
    })

    return this.http.post<bookingResponse>(this.bookingApiUrl, data, {headers:header})
  }  
}
