import { Component, OnInit } from '@angular/core';
import {BookingService} from "../booking.service";
import {Booking} from "../booking";
import {Availabilitydata} from "../availabilitydata";
import {Room} from "../room";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: Booking[];
  room: Room;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.getBookings()
  }

  sendAvailabilityData(roomIdAsString: String, startDate: String, endDate: String): void {
    roomIdAsString = roomIdAsString.trim();
    let roomId = Number(roomIdAsString);
    startDate = startDate.trim();
    endDate = endDate.trim();
    if (!startDate || !endDate || !roomId) { return; }
    this.bookingService.getAvailabilityData({ roomId, startDate, endDate } as Availabilitydata)
      .subscribe(room => this.room = room);
  }

  getBookings(): void {
    this.bookingService.getBookings()
      .subscribe(bookings => this.bookings = bookings);
  }
}
