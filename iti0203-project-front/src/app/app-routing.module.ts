import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import {HomeComponent} from "./home/home.component";
import {ContactComponent} from "./contact/contact.component";
import {RoomDetailComponent} from "./room-detail/room-detail.component";
import {BookingComponent} from "./booking/booking.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'rooms', component: RoomsComponent },
  { path: 'detail/:id', component: RoomDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'booking', component: BookingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
