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
    this.selectedBooking = booking;
  }
}
