import { Component, OnInit, OnDestroy, } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import { map } from 'rxjs/operators'
import { Logout } from '../auth/store/auth.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  authenticated:boolean= false;
  private userSub: Subscription;

  constructor(
    private dataStorage: DataStorageService,
    private auth: AuthService,
    private store: Store<fromApp.AppState>
    ){}

  public isMenuCollapsed = true;
  
  onSaveData(){
    this.dataStorage.storeRecipes();
  }

  onFetchData(){
    this.dataStorage.fetchRecipes().subscribe();
  }

  ngOnInit(){
    this.userSub =  this.store.select('auth').pipe( map( authState => authState.user)).subscribe(user =>{
      this.authenticated= !user ? false :true
    });
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  
  logout(){
    this.store.dispatch( new Logout());
  }

  
}
