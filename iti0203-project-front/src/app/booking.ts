import {Room} from "./room";

export interface Booking {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  room: Room;
  paymentInfo: string;
}
