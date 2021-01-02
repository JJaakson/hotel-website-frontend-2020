import { Component, OnInit} from '@angular/core';
import {BookingService} from "../booking.service";
import {Booking} from "../booking";
import {Room} from "../room";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RoomService} from "../room.service";
import {DataToSearchBy} from "../dataToSearchBy";
import {AuthenticationService} from "../authentication.service";
import {User} from "../user";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  selectedRoom: Room;
  rooms: Room[];
  userLogged: boolean;
  roomsForm: FormGroup;
  currentDate = new Date();
  isBooked: boolean;
  currentBooking: Booking;
  user: User;

  constructor(private bookingService: BookingService, private roomService: RoomService,
              private authenticationService: AuthenticationService, private fb: FormBuilder) {
    this.userLogged = !!this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
    this.getRooms();
    this.roomsForm = this.fb.group({
      roomControl: []
    });
  }

  getAvailabilityDateData(roomIdAsString: String, startDate: String, endDate: String): void {
    this.isBooked = false;
    startDate = startDate.trim();
    endDate = endDate.trim();
    roomIdAsString = roomIdAsString.trim();
    let roomId = Number(roomIdAsString);
    if (!startDate || !endDate || !roomId) {
      alert("Please fill out correct information!")
      return;
    }
    this.bookingService.getAvailabilityByDate({ roomId , startDate, endDate } as DataToSearchBy)
      .subscribe(room => this.selectedRoom = room);
  }

  addBooking(name: String, startDate: String, endDate: String, paymentInfo: String, room: Room): void {
    name = name.trim();
    paymentInfo = paymentInfo.trim();
    startDate = startDate.trim();
    endDate = endDate.trim();
    if (!name || !startDate || !endDate || !room || !paymentInfo) {
      alert("Please choose a payment method!")
      return;
    }
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
