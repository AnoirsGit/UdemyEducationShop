import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';



import {RecipeDataService} from './recipes/recipe-data.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

import { ShoppingListRoutingModule } from './shopping-list/shopping-list-routing.module';


import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer}),

    // HttpModule,
    AppRoutingModule,
    HttpClientModule,

    ShoppingListModule,
    SharedModule,
    AuthModule,
    ShoppingListRoutingModule
  
  ],
  providers: [ RecipeDataService , 
    {
      provide : HTTP_INTERCEPTORS, 
      useClass : AuthInterceptorService, 
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
