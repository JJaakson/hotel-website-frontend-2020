import { Component, OnInit } from '@angular/core';
import {BookingService} from "../booking.service";
import {Booking} from "../booking";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  booking: Booking;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
  }

  getBookingById(bookingIdAsString: String): void {
    bookingIdAsString = bookingIdAsString.trim();
    let bookingId = Number(bookingIdAsString);
    if (!bookingId) { return; }
    this.bookingService.getBookingById(bookingId)
      .subscribe(booking => this.booking = booking);
  }

}
