import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {User} from "../user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userLogged: boolean;
  user: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {

    this.userLogged = !!this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue;
    this.userService.getMe()
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    window.location.reload();
  }

}
