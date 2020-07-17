import { CanActivate , RouterStateSnapshot ,ActivatedRouteSnapshot, UrlTree } from '@angular/router'
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router'

import { AuthService } from './auth.service'


@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  
  constructor( private authService : AuthService , private router: Router ){

  }

  canActivate(route: ActivatedRouteSnapshot , router: RouterStateSnapshot): UrlTree | boolean | Promise<boolean> | Observable<boolean | UrlTree>{
    return this.authService.user.pipe(
      take(1),
      map( user=>{
      const authbool = !!user;

      if(authbool){
        return true;
      }
      return this.router.createUrlTree(['/auth']);

    }));
     
  }
}