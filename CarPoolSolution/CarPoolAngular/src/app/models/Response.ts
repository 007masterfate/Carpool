export class Response {
  public Value: any;
  public IsSuccess: boolean;
  public Message : string;

  constructor(value:any,isSuccess:boolean,message:string){
    this.Value = value,
    this.IsSuccess = isSuccess,
    this.Message = message
  }
}
