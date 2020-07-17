import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule(
  {
  imports:
  [
      RouterModule,
      ReactiveFormsModule,
      FormsModule,
      SharedModule,
  ],
  declarations:
  [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  exports:
  [
    
  ],
  }
)
export class ShoppingListModule{

}