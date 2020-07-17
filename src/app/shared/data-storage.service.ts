import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map,tap,take,exhaustMap } from 'rxjs/operators';


import { Recipe } from "../recipes/recipe.model";
import { RecipeDataService } from '../recipes/recipe-data.service';
import { AuthService } from '../auth/auth.service';


@Injectable({providedIn: 'root'})
export class DataStorageService{
  constructor(
    private http : HttpClient, 
    private recipeService: RecipeDataService,
    private authSevice : AuthService )
  {}

  storeRecipes(){
    const recipes = this.recipeService.getRecipe();
    this.http.put("https://angular-backend-interaction.firebaseio.com/recipes.json" , recipes)
    .subscribe(response=>{
      
    });
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>(
      "https://angular-backend-interaction.firebaseio.com/recipes.json")
      .pipe(
 
      map(recipes =>{
        return recipes.map(recipe => {
          return {...recipe, 
            ingredients: recipe.ingredients ? recipe.ingredients: []};
        });
      }),
      tap(recipes =>{
        this.recipeService.setRecipes(recipes);
      }));
    }
    
  

}