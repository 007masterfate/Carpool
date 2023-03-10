import { Stops } from '../constants/Stops';

export class OfferRide {
  public offerId!: number;
  public From!: Stops | string;
  public To!: Stops | string;
  public Date!: string;
  public Time!: string;
  public seatsAvailable!: number;
  public price!: number;
  public Stops!: string | undefined;
  public IssuerId!:number;
  public id!: number;

  constructor(
    from: Stops | string,
    to: Stops | string,
    date: string,
    time: string,
    seatsAvailable: number,
    price: number,
    stops: string,
    issuerId: number
  ) {
    this.From = from;
    this.To = to;
    this.Date = date;
    this.Time = time;
    this.seatsAvailable = seatsAvailable;
    this.price = price;
    this.Stops = stops;
    this.IssuerId = issuerId;
  }
}
