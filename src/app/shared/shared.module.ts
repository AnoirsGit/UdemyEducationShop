import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AlertComponent } from './alert/alert.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule(
  {
    declarations:
    [
      AlertComponent,
      SpinnerComponent,
      DropdownDirective
    ],
    exports:
    [
      AlertComponent,
      SpinnerComponent,
      DropdownDirective,
      CommonModule
    ],
    imports:
    [
      CommonModule,
      
    ]
  }
)
export class SharedModule{

}