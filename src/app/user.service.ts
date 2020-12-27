import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Booking} from "./booking";
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {UserPassword} from "./user-password";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'api/users';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  constructor(
    private http: HttpClient) {
  }

  register(userPassword: UserPassword): Observable<any> {
    return this.http.post<UserPassword>(`${this.usersUrl}/register`, userPassword, this.httpOptions);
  }

  login(userPassword: UserPassword):  Observable<User> {
    return this.http.post<User>(`${this.usersUrl}/login`, userPassword, this.httpOptions);
  }

  getMe(): Observable<any>{
    return this.http.get<Object>(`${this.usersUrl}/me`);
  }
}
