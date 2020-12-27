import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {UserService} from "../user.service";
import {MessageService} from "../message.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  checkoutForm;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.checkoutForm = this.formBuilder.group( {
      username: '',
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(userPassword) {
    console.log(userPassword);

    this.userService.register(userPassword)
      .pipe(first())
      .subscribe(
        ()  => {
          this.messageService.add('Registration successful!');
          this.router.navigate(['/login']);
          this.checkoutForm.reset();

    },
        error => {
          this.messageService.add('Registration unsuccessful!');
          console.log(error);
        });
  }

}
