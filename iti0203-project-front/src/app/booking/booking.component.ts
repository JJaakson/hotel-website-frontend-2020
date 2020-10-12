import { Component, OnInit} from '@angular/core';
import {BookingService} from "../booking.service";
import {Booking} from "../booking";
import {Availabilitydata} from "../availabilitydata";
import {Room} from "../room";
import {MessageService} from "../message.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RoomService} from "../room.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookings: Booking[];
  selectedRoom: Room;
  rooms: Room[];
  roomsForm: FormGroup;

  constructor(private bookingService: BookingService, private roomService: RoomService,
              private messageService: MessageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getRooms()
    this.roomsForm = this.fb.group({
      room: []
    })
  }

  sendAvailabilityData(roomIdAsString: String, startDate: String, endDate: String): void {
    roomIdAsString = roomIdAsString.trim();
    let roomId = Number(roomIdAsString);
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
    return this.selectedRoom.amount > 0;
  }

  getRooms(): void {
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }
}
