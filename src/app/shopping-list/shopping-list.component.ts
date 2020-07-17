import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping-service.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor( private shopService : ShoppingService) {
    
   }

  ngOnInit() {
    this.ingredients = this.shopService.getArrIngredients();
  this.shopService.addingIngredient.
  subscribe((ingred: Ingredient[]) => {
    this.ingredients = ingred;
  });
  }

  onEditItem(i:number){
    this.shopService.startedEditing.next(i); 
  }
  
}
