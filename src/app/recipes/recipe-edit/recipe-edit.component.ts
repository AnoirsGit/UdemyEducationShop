import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl , FormArray, Validators} from '@angular/forms';
import { RecipeDataService } from '../recipe-data.service';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup
  id:number;
  editMode:boolean= false;

  constructor(private route:ActivatedRoute, 
    private recipeDataService : RecipeDataService,
    private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode=params['id'] !=null;
        this.initFrom();
      }
    )
  }

  private initFrom(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode){
      const recipe = this.recipeDataService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for( let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name , Validators.required),
              'amount': new FormControl(ingredient.amount , [Validators.required ,
                Validators.pattern(/^[1-9][0-9]*$/)]),
              
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
    'name': new FormControl(recipeName , Validators.required),
    'imagePath': new FormControl(recipeImagePath ,Validators.required),
    'description': new FormControl( recipeDescription , Validators.required),
    'ingredients' : recipeIngredients
    });
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[Validators.required ,
          Validators.pattern(/^[1-9][0-9]*$/)])
      })
    )
  }

  onSubmit(){
    
    if (this.editMode){
      this.recipeDataService.updateRecipe(this.id ,this.recipeForm.value)
    }
    else {
      this.recipeDataService.addRecipe(this.recipeForm.value);
    }
  }

  Cancel(){
    this.router.navigate(['../'] , { relativeTo: this.route});
  }


  DeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
