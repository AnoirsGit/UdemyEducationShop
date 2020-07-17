import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping-service.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit  , OnDestroy{
  
  subscription:Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem : Ingredient;

  constructor(private sS:ShoppingService) { }
@ViewChild('form', { static: false}) slForm: NgForm;
  ngOnInit() {
    this.subscription 
    = this.sS.startedEditing.
    subscribe((index: number) =>{
        this.editMode =true;
        this.editedItemIndex = index;
        this.editedItem = this.sS.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onSubmit(form :NgForm) {
    const val = form.value;
    const newIngredient = new Ingredient(val.name , val.amount);
    if(this.editMode){
      this.sS.updateIngredient(this.editedItemIndex , newIngredient );
    }
    else{
      this.sS.AddOnArray(newIngredient);
    }
    this.editMode = false;
    form.reset();

  }


  Clear(){
    this.slForm.reset();
    this.editMode = false;
  }

  Delete(){
    this.sS.deleteIngredient(this.editedItemIndex);
    this.editMode = false;
  }
  
  ngOnDestroy(){

    this.subscription.unsubscribe();
  }

}
