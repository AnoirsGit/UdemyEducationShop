import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeDataService } from '../recipe-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy{
 
  recipes :Recipe[];
  subscription: Subscription;
 

  constructor(private recService : RecipeDataService,
    private router:Router, private route:ActivatedRoute,
    private dataStorage: DataStorageService) { }

  ngOnInit() {
    this.dataStorage.fetchRecipes();
    this.subscription = this.recService.recipeChanged
      .subscribe(
        (recipes: Recipe[]) =>{
          this.recipes = recipes;
        }
      )
    this.recipes = this.recService.getRecipe()
    this.onFetchData();
  }
  onFetchData(){
    this.dataStorage.fetchRecipes().subscribe();
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onNewRecipe(){
     this.router.navigate(['new'], {relativeTo: this.route});
  }
  
}
