import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {Booking} from "./booking";
import {catchError, tap} from "rxjs/operators";
import {Availabilitydata} from "./availabilitydata";
import {Room} from "./room";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingsUrl = 'api/bookings';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingsUrl)
      .pipe(
        tap(_ => this.log('fetched bookings')),
        catchError(this.handleError<Booking[]>('getBookings', []))
      );
  }

  getAvailabilityData(data: Availabilitydata): Observable<Room> {
    const url = `${this.bookingsUrl}`;
    return this.http.put(url, data, this.httpOptions).pipe(
      tap(_ => this.log(`updated availabilitydata`)),
      catchError(this.handleError<any>('updateAvailability'))
    );
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.bookingsUrl, booking, this.httpOptions).pipe(
      tap((newBooking: Booking) => this.log(`added booking w /id =${newBooking.id}`)),
      catchError(this.handleError<Booking>('addBooking'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
