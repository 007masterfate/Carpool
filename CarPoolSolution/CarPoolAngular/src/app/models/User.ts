import { NonNullAssert } from '@angular/compiler';

export class User {
  public username: string;
  public password: string;
  public name: string | null;

  constructor(username: string, password: string, name: string | null) {
    this.username = username;
    this.password = password;
    this.name = name;
  }
}
