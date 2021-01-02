import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import {HomeComponent} from "./home/home.component";
import {ContactComponent} from "./contact/contact.component";
import {RoomDetailComponent} from "./room-detail/room-detail.component";
import {BookingComponent} from "./booking/booking.component";
import {SearchComponent} from "./search/search.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";
import {UserComponent} from "./user/user.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'rooms', component: RoomsComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: RoomDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'search', component: SearchComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
