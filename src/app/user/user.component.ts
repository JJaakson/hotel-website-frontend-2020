import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {User} from "../user";
import {Booking} from "../booking";
import {BookingService} from "../booking.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userLogged: boolean;
  selectedBooking: Booking;
  user: User;
  bookings: Booking[];

  constructor(
    private userService: UserService,
    private bookingService: BookingService,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {

    this.userLogged = !!this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue;
    this.userService.getMe();
    if (this.userLogged) {
      console.log(this.user.token.trim());
      this.getBookingsByUsername(this.user.token.trim())
    }

  }

  getBookingsByUsername(username: string): void {
    username = username.trim();
    username = `?username=${username}`;
    if (!username) { return; }
    this.bookingService.getBookingsByUsername(username)
      .subscribe(bookings => this.bookings = bookings);
  }

  getBookingById(bookingIdAsString: String): void {
    bookingIdAsString = bookingIdAsString.trim();
    let bookingId = Number(bookingIdAsString);
    if (!bookingId) { return; }
    this.bookingService.getBookingById(bookingId)
      .subscribe(booking => this.selectedBooking = booking);
  }


  logout() {
    this.authenticationService.logout();
    window.location.reload();
  }

  onSelect(booking: Booking): void {
    this.getBookingById(booking.id.toString());
    this.selectedBooking = booking;
  }

  cancelBooking(booking: Booking): void {
    this.bookings = this.bookings.filter(b => b !== booking);
    this.bookingService.deleteBooking(booking).subscribe();
  }

}
