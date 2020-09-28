import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../room';
import {ActivatedRoute} from "@angular/router";
import {RoomService} from "../room.service";


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  room: Room;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
  ) {}

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(id)
      .subscribe(room => this.room = room);
  }


}
