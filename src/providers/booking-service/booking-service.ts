import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BookingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BookingServiceProvider Provider');
  }

  getBookings(){
    return this.http.get<any[]>("api/bookings");
  }

  deleteBooking(booking: any){
    return this.http.delete("api/bookings/" + booking.id, {responseType: 'text'});
  }

}
