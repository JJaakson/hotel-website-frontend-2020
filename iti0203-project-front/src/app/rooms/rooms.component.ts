import { Component, OnInit } from '@angular/core';

import { Room } from '../room';
import { RoomService } from '../room.service';
import { MessageService } from '../message.service';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  selectedRoom: Room;
  rooms: Room[];

  constructor(private roomService: RoomService, private messageService: MessageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getRooms();
  }

  onSelect(room: Room): void {
    this.selectedRoom = room;
    this.messageService.add(`RoomsComponent: Selected room id=${room.id}`);
  }

  getRooms(): void {
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }
}
