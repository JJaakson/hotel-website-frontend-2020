import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../room';
import {ActivatedRoute} from "@angular/router";
import {RoomService} from "../room.service";
import {Booking} from "../booking";
import {MessageService} from "../message.service";


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  room: Room;
  bookings: Booking[];

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(id)
      .subscribe(room => this.room = room);
  }

  addBooking(name: String, startDate: String, endDate: String, roomId: Number): void {
    name = name.trim();
    startDate = startDate.trim();
    endDate = endDate.trim();
    if (!name || !startDate || !endDate || !roomId) { return; }
    this.roomService.addBooking({ name, startDate, endDate, roomId } as Booking)
      .subscribe(booking => {
        this.bookings.push(booking)
      })
    this.messageService.add(`RoomDetailComponent: Selected for booking=${name}`);
  }
}
