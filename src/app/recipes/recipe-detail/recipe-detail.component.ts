import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeDataService  } from '../recipe-data.service';
import { ActivatedRoute , Params, Router} from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipe: Recipe;
   id:number;

  constructor(private recService: RecipeDataService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
    (params:Params) =>{
      this.id = +params['id'];
      this.recipe = this.recService.
    getRecipeById(this.id);
    }
    );
    
  }

  AddingToSL() {
    this.recService.
    addIgredients(this.recipe.ingredients);
    
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteRecipe(){
    this.recService.Delete(this.id);
    this.router.navigate(['/recipes']);
  }



}
