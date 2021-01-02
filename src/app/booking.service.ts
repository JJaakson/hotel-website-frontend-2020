import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {Booking} from "./booking";
import {catchError, tap} from "rxjs/operators";
import {DataToSearchBy} from "./dataToSearchBy";
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
    return this.http.get<Booking[]>(`${this.bookingsUrl}/all`)
      .pipe(
        tap(_ => this.log('fetched bookings')),
        catchError(this.handleError<Booking[]>('getBookings', []))
      );
  }

  getBookingById(bookingId: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.bookingsUrl}/${bookingId}`)
      .pipe(
        tap(_ => this.log(`fetched booking id=${bookingId}`)),
        catchError(this.handleError<Booking>(`getBooking id=${bookingId}`))
      );
  }

  getBookingsByUsername(username: string): Observable<Booking[]> {
    return this.http.get(`${this.bookingsUrl}/${username}`).pipe(
      tap(_ => this.log(`searched by username`)),
      catchError(this.handleError<any>('searched by username'))
    );
  }

  getBookingsByDate(dateData: DataToSearchBy): Observable<Booking[]> {
    const url = `${this.bookingsUrl}`;
    return this.http.put(url, dateData, this.httpOptions).pipe(
      tap(_ => this.log(`searched by date`)),
      catchError(this.handleError<any>('searched by date'))
    );
  }

  getAvailabilityByDate(dateData: DataToSearchBy): Observable<Room> {
    return this.http.put('api/availability', dateData, this.httpOptions).pipe(
      tap(_ => this.log(`updated availabilitydata`)),
      catchError(this.handleNonAvailable<any>('updateAvailability'))
    );
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.bookingsUrl, booking, this.httpOptions).pipe(
      tap((newBooking: Booking) => this.log(`added booking w /id =${newBooking.id}`)),
      catchError(this.handleError<Booking>('addBooking'))
    );
  }

  deleteBooking(booking: Booking | number): Observable<Booking> {
    const id = typeof booking === 'number' ? booking : booking.id;
    const url = `${this.bookingsUrl}/${id}`;
    console.log(url);
    return this.http.delete<Booking>(url, this.httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private handleNonAvailable<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      alert("No available rooms!")
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`RoomService: ${message}`);
  }
}
