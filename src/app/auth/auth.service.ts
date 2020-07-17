import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Subject , BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { User } from '../user/user.model'
import { Router } from '@angular/router';


export interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string ;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{

  user = new BehaviorSubject<User>(null);
  tokenTimer: any;

  constructor(
    private http : HttpClient,
    private router:Router ){}
  
  signup(email: string , password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebasePIKey, 
    {email: email ,
    password: password,
    returnSecureToken: true
    }).pipe( tap(Data => {
      const expirationDate = new Date(new Date().getTime()  + +Data.expiresIn * 1000);
      const user = new User(
        Data.email, 
        Data.localId , 
        Data.idToken , 
        expirationDate
        );
        this.user.next(user);
    })
    );
  }

  private handleAuthentication(
    email: string , 
    userId: string, 
    token: string , 
    expiresIn: number
    ){
    const expirationDate = new Date(new Date().getTime()  + +expiresIn * 1000);
    const user = new User(
      email, 
      userId , 
      token , 
      expirationDate
      );
      this.user.next(user);
      this.autoLogout(expiresIn*1000);
      localStorage.setItem('userData', JSON.stringify(user));
  }

  login(email: string , password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebasePIKey
      , 
      {email: email ,
      password: password,
      returnSecureToken: true
    }
    ).pipe(tap(Data=>{
      this.handleAuthentication(
        Data.email,
        Data.localId,
        Data.idToken,
        +Data.expiresIn
      )
    }))
  }

  autoLogin(){
    const userData:
    {
      email: string;
      id: string;
      _token: string;
      _tokenDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    else{
      const loadedUser = new User
      (
        userData.email , 
        userData.id, 
        userData._token , 
        new Date(userData._tokenDate) 
      );
      if(loadedUser.token){
        this.user.next(loadedUser);
        const expirtaionDuration =  new Date(userData._tokenDate).getTime() - new Date().getTime();
        this.autoLogout(expirtaionDuration);
      }
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenTimer){
      clearTimeout(this.tokenTimer);
    }
    this.tokenTimer= null;
  }

  autoLogout(expirtaionDuration: number){
    this.tokenTimer = setTimeout(()=>{
      this.logout();
    },expirtaionDuration);
  }

}