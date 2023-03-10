export class Login {
  public username!: string;
  public password!: string;

  constructor(Username: string, Password: string) {
    this.username = Username;
    this.password = Password;
  }
}
