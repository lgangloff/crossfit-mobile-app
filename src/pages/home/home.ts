import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { BookingServiceProvider } from '../../providers/booking-service/booking-service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bookings:any[];

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider,
    public bookingService: BookingServiceProvider, public toastCtrl: ToastController) {

      this.loadBookings();

  }

  private loadBookings() {
    this.bookingService.getBookings().subscribe(res => {
      this.bookings = res;
    });
  }

  deleteBooking(booking: any){
    this.bookingService.deleteBooking(booking).subscribe(res=>{
      let toast = this.toastCtrl.create({
        message: 'La réservation a été supprimée',
        duration: 2000,
        position: 'top'
      });
  
      toast.present(toast);

      this.loadBookings();
    })
  }

  disconnect(){
    this.authService.logout().subscribe(res=>{
      window.location.reload(true);
    },
    error=>{
      window.location.reload(true);

    });
  }
}
