import { Component, OnInit, OnDestroy, } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  authenticated:boolean= false;
  private userSub: Subscription;

  constructor(
    private dataStorage: DataStorageService,
    private auth: AuthService){}

  public isMenuCollapsed = true;
  
  onSaveData(){
    this.dataStorage.storeRecipes();
  }

  onFetchData(){
    this.dataStorage.fetchRecipes().subscribe();
  }

  ngOnInit(){
    this.userSub =  this.auth.user.subscribe(user =>{
      this.authenticated= !user ? false :true
    });
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  
  logout(){
    this.auth.logout();
  }

  
}
