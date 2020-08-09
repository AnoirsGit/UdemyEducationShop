import { Actions, ofType , Effect } from '@ngrx/effects';
import * as authActions from './auth.actions'
import { switchMap, catchError, map , tap} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../../user/user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string ;
  registered?: boolean;
}


const handleAuth = (expiresIn: number , email: string , userId: string , token: string) =>{
  const expirationDate = new Date(new Date().getTime()  + +expiresIn * 1000);
  const user  = new User(email, userId , token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));        
  return new authActions.Login({
              email: email,
              userId: userId,
              token: token,
              exporationDate : expirationDate
            });
  
}

@Injectable()
export class AuthEffects {

  @Effect()
  autologin = this.actions$.pipe(
    ofType(authActions.AUTO_LOGIN), map(() => {
      const userData:
      {
        email: string;
        id: string;
        _token: string;
        _tokenDate: Date;
      } = JSON.parse(localStorage.getItem('userData'));
      if(!userData){
        return { type: 'KAVO' };
      }
      else{
        const expirtaionDuration =  new Date(userData._tokenDate).getTime() - new Date().getTime();
     
        const loadedUser = new User
        (
          userData.email , 
          userData.id, 
          userData._token , 
          new Date(userData._tokenDate) 
        );
        if(loadedUser.token){
          this.authServise.setTimer( expirtaionDuration);
          return new authActions.Login(
              {
                email: loadedUser.email , 
                userId : loadedUser.id , token: 
                loadedUser.token , exporationDate: 
                new Date(userData._tokenDate)
              }
            );
          
        }
      }
      return { type: 'KAVO' };
    })
  )
  
  @Effect({ dispatch:false})
  authLogout = this.actions$.pipe(ofType(authActions.LOGOUT), tap(() => 
  {
    this.authServise.clearTimer();
    this.router.navigate(['/'])
    localStorage.removeItem('userData');
  }));

  @Effect()
  authSignup = this.actions$.pipe(
    ofType( authActions.SIGNUP_START),
    switchMap((signupAction: authActions.SignupStart) => {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebasePIKey, 
      {email: signupAction.payload.email ,
      password: signupAction.payload.password,
      returnSecureToken: true
      }).pipe(
        tap( data => { this.authServise.setTimer(+data.expiresIn * 1000 ) }),
        map( resData => {
          return handleAuth(
            +resData.expiresIn, 
            resData.email, 
            resData.localId, 
            resData.idToken
          )
          
        }),
        catchError( error => {
          return of( new authActions.LoginFail(error));
        }),
        
      );
    }),
    
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(authActions.LOGIN_START), 
    switchMap((authData: authActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebasePIKey
        , 
        {email: authData.payload.email ,
        password: authData.payload.password,
        returnSecureToken: true
      }
    ).pipe(
      tap( data => { this.authServise.setTimer(+data.expiresIn * 1000 ) }),
      map( resData => {
        return handleAuth(
          +resData.expiresIn, 
          resData.email, 
          resData.localId, 
          resData.idToken
        )
        
      }),
      catchError( error => {
        return of( new authActions.LoginFail(error));
      }),
      
    );
  }),
  
  );
@Effect({ dispatch: false})
  authSuccess = this.actions$.pipe(ofType(authActions.LOGIN ), tap(() => 
    { 
      this.router.navigate(['/'])
    })
  );

  constructor(
    private actions$: Actions,
    private http : HttpClient,
    private router : Router,
    private authServise : AuthService
  ){}

}