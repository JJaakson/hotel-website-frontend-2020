import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import {ActivatedRoute} from "@angular/router";
import {RoomService} from "../room.service";
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import {User} from "../user";


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  room: Room;
  user: User;

  checkoutForm;
  userLogged: boolean;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private authenticationService: AuthenticationService,
  ) {
    this.checkoutForm = this.formBuilder.group( {

      price: '',
    });
    this.userLogged = !!this.authenticationService.currentUserValue
  }

  ngOnInit(): void {
    if (this.userLogged) {
      this.user = this.authenticationService.currentUserValue;
    }
    this.getRoom();
  }

  getRoom(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(id)
      .subscribe(room => this.room = room);
  }

  onSubmit(roomId: number, cost: string): void {
    this.roomService.updateRoomCost(cost, roomId).subscribe();
    window.location.reload();
  }

}
