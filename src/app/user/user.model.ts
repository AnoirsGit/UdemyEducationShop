import { tokenName } from '@angular/compiler'

export class User {
  constructor(
    public email: string , 
    public id: string, 
    private _token: string , 
    private _tokenDate: Date  )
  {}

  get token(){
    if(!this._tokenDate || new Date() > this._tokenDate){
      return null;
    }
    return this._token;
  }
}