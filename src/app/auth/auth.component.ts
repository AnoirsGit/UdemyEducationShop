import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'

import { AuthService , AuthResponseData} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading =false;
  error = null;

  onSwitch(){
      this.isLoginMode=!this.isLoginMode;
  }

  constructor(private auth : AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  submitForm(form : NgForm){
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;  

    if(this.isLoginMode){
      if(!form.valid){
        return;
      }
      this.isLoading =true;
      authObs = this.auth.login(email, password);
    }
    else{
      if(!form.valid){
        return;
      }
      this.isLoading =true;
      authObs = this.auth.signup(email, password);
    }
    authObs.
      subscribe(Data =>{
        this.router.navigate(['/recipes']);
        this.isLoading=false;
        console.log(Data);
      },
      error => {
        this.isLoading=false;
        this.error = error;
      });
      form.reset();

  }

  

}
