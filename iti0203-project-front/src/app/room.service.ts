import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Room } from './room';
import { ROOMS } from './mock-rooms';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  constructor(private messageService: MessageService) { }

  getRooms(): Observable<Room[]> {
    // Sends the message _after_ fetching the rooms
    // this.messageService.add('RoomService: fetched rooms');
    return of(ROOMS);
  }
}
