import { Injectable , EventEmitter} from '@angular/core';
import { Recipe} from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping-service.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {

recpeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [];
  constructor(private slService:ShoppingService) { }

  recipeChanged = new Subject<Recipe[]>();

  getRecipe(){
    return this.recipes.slice();
  }

  getRecipeById(id:number){
    return this.recipes[id];
  }

  addIgredients( ing: Ingredient[] ){
    this.slService.AddIngredients(ing);
  }

  addRecipe( recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  
  updateRecipe(index : number , updatedRecipe: Recipe){
    this.recipes[index] = updatedRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  

  Delete(id : number){
    this.recipes.splice(id, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes=recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  
}
