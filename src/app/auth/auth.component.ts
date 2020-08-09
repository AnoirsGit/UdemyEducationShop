import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router'

import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as authActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit , OnDestroy{

  isLoginMode = true;
  isLoading =false;
  error = null;
  private storeSubscription: Subscription;

  onSwitch(){
      this.isLoginMode=!this.isLoginMode;
  }

  constructor(
    private auth : AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      // if( this.error){
      
      // }
    });
  }
  ngOnDestroy(): void {

    if(this.storeSubscription){
      this.storeSubscription.unsubscribe();
    }
    
  }

  submitForm(form : NgForm){
    const email = form.value.email;
    const password = form.value.password;

    

    if(this.isLoginMode){
      if(!form.valid){
        return;
      }
     
      // authObs = this.auth.login(email, password);
      this.store.dispatch( new authActions.LoginStart({ email:email , password: password}));
    }
    else{
      if(!form.valid){
        return;
      }
     
      this.store.dispatch( new authActions.SignupStart({ email:email , password: password}));
    }
    
      form.reset();
  }

  

}
