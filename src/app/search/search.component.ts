import { Component, OnInit } from '@angular/core';
import {BookingService} from "../booking.service";
import {Booking} from "../booking";
import {DataToSearchBy} from "../dataToSearchBy";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  selectedBooking: Booking;
  bookings: Booking[];
  isDateTimeSearch: boolean;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookingById(bookingIdAsString: String): void {
    bookingIdAsString = bookingIdAsString.trim();
    let bookingId = Number(bookingIdAsString);
    if (!bookingId) { return; }
    this.bookingService.getBookingById(bookingId)
      .subscribe(booking => this.selectedBooking = booking);
    this.getBookings()
  }

  getBookings(): void {
    this.isDateTimeSearch = false;
    this.bookingService.getBookings()
      .subscribe(bookings => this.bookings = bookings);
  }

  getBookingsByUsername(username: string): void {
    username = username.trim();
    let roomId = -1;
    this.selectedBooking = null;
    if (!username) { return; }
    this.bookingService.getBookingsByUsername(username)
      .subscribe(bookings => this.bookings = bookings);
  }

  getBookingsByDate(startDate: String, endDate: String): void {
    startDate = startDate.trim();
    endDate = endDate.trim();
    let roomId = -1;
    this.selectedBooking = null;
    if (!startDate || !endDate) { return; }
    this.bookingService.getBookingsByDate( {roomId, startDate, endDate} as DataToSearchBy)
      .subscribe(bookings => this.bookings = bookings);
  }

  onSelect(booking: Booking): void {
    this.getBookingById(booking.id.toString())
  }

  cancelBooking(booking: Booking): void {
    this.bookings = this.bookings.filter(b => b !== booking);
    this.bookingService.deleteBooking(booking).subscribe();
    window.location.reload();
  }
}
