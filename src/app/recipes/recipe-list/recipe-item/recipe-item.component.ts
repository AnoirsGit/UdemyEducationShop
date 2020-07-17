import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router'
import { Recipe } from '../../recipe.model';
import { RecipeDataService } from '../../recipe-data.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index:number
  ngOnInit() {
  }

  constructor( ){}
  
 


}
