import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Room } from './room';
import { MessageService } from './message.service';
import {Booking} from "./booking";

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  private roomsUrl = 'api/rooms';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getRoom(id: number): Observable<Room> {
    const url = `${this.roomsUrl}/${id}`;
    return this.http.get<Room>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Room>(`getHero id=${id}`))
    );
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomsUrl)
      .pipe(
        tap(_ => this.log('fetched roomtypes')),
        catchError(this.handleError<Room[]>('getRooms', []))
      );
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.roomsUrl + '/book', booking, this.httpOptions).pipe(
      tap((newBooking: Booking) => this.log(`added booking w /id =${newBooking.id}`)),
      catchError(this.handleError<Booking>('addBooking'))
    );
  }

  updateRoomCost(cost: string, roomId: number): Observable<any> {
    const url = `${this.roomsUrl}/${roomId}/price`;
    return this.http.post(url, cost, this.httpOptions);

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`RoomService: ${message}`);
  }

}
