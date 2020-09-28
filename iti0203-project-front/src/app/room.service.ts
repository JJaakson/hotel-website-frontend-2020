import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ROOMS } from './mock-rooms';

import { Room } from './room';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root',
})
export class RoomService {

  private roomsUrl = 'api/rooms';  // URL to web api

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

  /** GET rooms from the server */
  getRooms(): Observable<Room[]> {
    // return of(ROOMS);
    return this.http.get<Room[]>(this.roomsUrl)
      .pipe(
        tap(_ => this.log('fetched rooms')),
        catchError(this.handleError<Room[]>('getRooms', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a RoomService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`RoomService: ${message}`);
  }


}
