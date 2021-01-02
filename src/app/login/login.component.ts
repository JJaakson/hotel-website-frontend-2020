import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {UserService} from "../user.service";
import {MessageService} from "../message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  checkoutForm;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
  ) {
    this.checkoutForm = this.formBuilder.group( {
      username: '',
      password: ''
    });

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(userPassword) {
    console.log(userPassword);

    this.authenticationService.login(userPassword)
      .pipe(first())
      .subscribe(
        (user)  => {
          this.messageService.add('Login successful!');
          this.router.navigate([this.returnUrl]);
          window.location.reload();
        },
        error => {
          this.messageService.add('Login unsuccessful!');
          alert("Please use correct credentials to log in or register to become a member!")
          console.log(error);
        });
  }

}
