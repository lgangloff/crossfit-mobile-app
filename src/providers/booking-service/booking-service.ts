import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '@environment';

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
    return this.http.get<any[]>(ENV.API_ENDPOINT + "api/bookings");
  }

  deleteBooking(booking: any){
    return this.http.delete(ENV.API_ENDPOINT + "api/bookings/" + booking.id, {responseType: 'text'});
  }

}
