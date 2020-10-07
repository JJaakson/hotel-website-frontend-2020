import { Component, OnInit } from '@angular/core';

import { Room } from '../room';
import { RoomService } from '../room.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  selectedRoom: Room;
  rooms: Room[];

  constructor(private roomService: RoomService, private messageService: MessageService) { }

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
