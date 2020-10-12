import { Component, OnInit} from '@angular/core';
import {BookingService} from "../booking.service";
import {Booking} from "../booking";
import {Availabilitydata} from "../availabilitydata";
import {Room} from "../room";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookings: Booking[];
  room: Room;
  bookedBooking: Booking;

  constructor(private bookingService: BookingService, private messageService: MessageService) { }

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

  addBooking(name: String, startDate: String, endDate: String, paymentInfo: String, roomIdAsString: String): void {
    name = name.trim();
    paymentInfo = paymentInfo.trim();
    startDate = startDate.trim();
    endDate = endDate.trim();
    roomIdAsString = roomIdAsString.trim();
    let roomId = Number(roomIdAsString);
    if (!name || !startDate || !endDate || !roomId) { return; }
    this.bookingService.addBooking({ name, startDate, endDate, roomId, paymentInfo } as Booking)
      .subscribe(booking => {
        this.bookings.push(booking)
      })
    this.messageService.add(`RoomDetailComponent: Selected for booking=${name}`);
  }

  isItReadyForBooking(): boolean {
    return this.room.amount > 0;
  }

  getBookings(): void {
    this.bookingService.getBookings()
      .subscribe(bookings => this.bookings = bookings);
  }
}
