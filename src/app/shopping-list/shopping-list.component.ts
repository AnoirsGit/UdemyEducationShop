import { Component, OnInit } from '@angular/core';
import { Store, State } from '@ngrx/store'
import {Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

import * as fromSl from './store/shopping-list.reducer';
import * as SLActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ingredients: Ingredient[],}>;

  constructor( 

    
    private store: Store<fromSl.AppState>) 
  {  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    this.store.select('shoppingList').subscribe();
  
  }

  onEditItem(i:number){
    this.store.dispatch(new SLActions.StartEdit(i));
  }
  
}
