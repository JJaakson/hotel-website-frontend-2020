import { Component, OnInit} from '@angular/core';
import {BookingService} from "../booking.service";
import {Booking} from "../booking";
import {Room} from "../room";
import {MessageService} from "../message.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RoomService} from "../room.service";
import {DataToSearchBy} from "../dataToSearchBy";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  selectedRoom: Room;
  rooms: Room[];
  bookings: Booking[];
  roomsForm: FormGroup;
  currentDate = new Date();
  isBooked: boolean;
  currentBooking: Booking;

  constructor(private bookingService: BookingService, private roomService: RoomService,
              private messageService: MessageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getRooms()
    this.roomsForm = this.fb.group({
      roomControl: []
    })
  }

  getAvailabilityDateData(roomIdAsString: String, startDate: String, endDate: String): void {
    this.isBooked = false;
    startDate = startDate.trim();
    endDate = endDate.trim();
    roomIdAsString = roomIdAsString.trim();
    let roomId = Number(roomIdAsString);
    if (!startDate || !endDate || !roomId) { return; }
    this.bookingService.getAvailabilityByDate({ roomId , startDate, endDate } as DataToSearchBy)
      .subscribe(room => this.selectedRoom = room);
    this.messageService.add(`BookingsComponent: Got availability data ${this.selectedRoom.id} `);
  }

  addBooking(name: String, startDate: String, endDate: String, paymentInfo: String, room: Room): void {
    name = name.trim();
    paymentInfo = paymentInfo.trim();
    startDate = startDate.trim();
    endDate = endDate.trim();
    if (!name || !startDate || !endDate || !room) { return; }
    this.bookingService.addBooking({ name, startDate, endDate, room, paymentInfo} as Booking)
      .subscribe(booking => this.currentBooking = booking)
    this.isBooked = true;
  }

  isItReadyForBooking(): boolean {
    return this.selectedRoom.amount > 0;
  }

  getRooms(): void {
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }
}
