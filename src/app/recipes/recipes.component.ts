import { Component, OnInit } from '@angular/core';
import {RecipeDataService} from './recipe-data.service'
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'], 

})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor( private recData:RecipeDataService) {

   }

  ngOnInit() {
    this.recData.recpeSelected.subscribe((
recipe :Recipe) => {
  console.log(recipe)
  this.selectedRecipe=recipe
});
  }


}
