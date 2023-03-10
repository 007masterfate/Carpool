import { Stops } from '../constants/Stops';

export class BookRide {
  public From!: Stops | string;
  public To!: Stops | string;
  public Date!: string;
  public Time!: string;
  public SeatsRequired!: number;
  public UserId!:number;

  constructor(
    from: Stops | string,
    to: Stops | string,
    date: string,
    time: string,
    seatsrequired: number,
    userId:number
  ) {
    this.From = from;
    this.To = to;
    this.Date = date;
    this.Time = time;
    this.SeatsRequired = seatsrequired;
    this.UserId=userId;
  }
}
