import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import * as fromApp from '../store/app.reducer'
import { Logout } from './store/auth.actions'



@Injectable({providedIn: 'root'})
export class AuthService{

  // user = new BehaviorSubject<User>(null);
  private tokenTimer: any;

  constructor(

    private store: Store<fromApp.AppState>,){}
 

  setTimer(expirtaionDuration: number){
    this.tokenTimer = this.tokenTimer = setTimeout(()=>{
      this.store.dispatch( new Logout())
    },expirtaionDuration);
  }
  clearTimer(){
    if( this.tokenTimer){
      clearTimeout(this.tokenTimer);
      this.tokenTimer = null;
    }
  }

}