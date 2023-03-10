import { Stops } from '../constants/Stops';

export class BookedRide {
  public From!: Stops | string;
  public To!: Stops | string;
  public Date!: string;
  public Time!: string;
  public SeatsBooked!: number;
  public OfferId!: number;
  public userId!: number;
  public Price!: number;

  constructor(
    from: Stops | string,
    to: Stops | string,
    date: string,
    time: string,
    seatsbooked: number,
    price: number,
    userId: number
  ) {
    this.From = from;
    this.To = to;
    this.Date = date;
    this.Time = time;
    this.SeatsBooked = seatsbooked;
    this.Price = price;
    this.userId = userId;
  }
}
