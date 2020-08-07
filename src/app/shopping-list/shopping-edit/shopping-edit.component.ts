import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as SLActions from "../store/shopping-list.actions";
import * as fromSL from '../store/shopping-list.reducer';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit  , OnDestroy{
  
  subscription:Subscription;
  editMode = false;
  editedItem : Ingredient;

  constructor( private store: Store< fromSL.AppState >) 
  { }


@ViewChild('form', { static: false}) slForm: NgForm;
  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
      stateData =>
      {
        if(stateData.editedIngredientIndex >-1)
        {
          this.editMode =true;
          this.editedItem = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
        else
        {
          this.editMode=false;
        }
      }
    );
  }

  onSubmit(form :NgForm) {
    const val = form.value;
    const newIngredient = new Ingredient(val.name , val.amount);
    if(this.editMode){
      // this.sS.updateIngredient(this.editedItemIndex , newIngredient );
      this.store.dispatch(new SLActions.UpdateIngredient(newIngredient));
    }
    else{
      // this.sS.AddOnArray(newIngredient);
      this.store.dispatch(new SLActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();

  }


  Clear(){
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new SLActions.StopEdit());
  }

  Delete(){
    // this.sS.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new SLActions.DeleteIngredient());
    this.editMode = false;
  }
  
  ngOnDestroy(){

    this.subscription.unsubscribe();
    this.store.dispatch(new SLActions.StopEdit());
  }

}
