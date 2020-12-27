import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLogged: boolean;

  constructor(
    private authenticationService: AuthenticationService,
  ) {

    this.userLogged = !!this.authenticationService.currentUserValue;
  }


  ngOnInit(): void {
  }


}
