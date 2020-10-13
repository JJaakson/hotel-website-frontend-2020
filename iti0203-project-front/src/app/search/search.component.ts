import { Component, OnInit } from '@angular/core';
import {BookingService} from "../booking.service";
import {Booking} from "../booking";

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
  }

  getBookings(): void {
    this.isDateTimeSearch = false;
    this.bookingService.getBookings()
      .subscribe(bookings => this.bookings = bookings);
  }

  onSelect(booking: Booking): void {
    this.selectedBooking = booking;
  }
}
