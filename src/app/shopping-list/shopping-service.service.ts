import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor() { }

  addingIngredient = new EventEmitter<Ingredient[]>();
  startedEditing  = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];


  getArrIngredients(){
    return this.ingredients.slice();
  }

  AddOnArray(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.addingIngredient.emit(this.ingredients.slice());
  }

  AddIngredients(ingr: Ingredient[]){
    this.ingredients.push(...ingr);
    this.addingIngredient.emit(this.ingredients.slice());
  }


  getIngredient(index: number){
    return this.ingredients[index];
  }

  updateIngredient(index:  number , ing : Ingredient ){
    this.ingredients[index]= ing;
    this.addingIngredient.emit(this.ingredients.slice());
  }

  deleteIngredient(i:number){
    this.ingredients.splice(i, 1);
    this.addingIngredient.emit(this.ingredients.slice());
  }

}
