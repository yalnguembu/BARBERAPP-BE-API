import { ReservationSchema } from "../../utils";

export class Reservation {
  private readonly reservation: ReservationSchema;
  constructor(private readonly data: ReservationSchema) {
    this.reservation = data;
  }

  get service() {
    return this.reservation.service;
  }
  get date() {
    return this.reservation.date.trim();
  }

  get time() {
    return this.reservation.time.trim();
  }

  get client() {
    return this.reservation.client;
  }

  get maker() {
    return this.reservation.maker;
  }

  details() {
    return {
      service: this.service,
      date: this.date,
      time: this.time,
      client: this.client,
      maker: this.maker,
    };
  }
}
