import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
@NgModule(
  {
    declarations:
    [
      AuthComponent
    ],
    imports:
    [
      SharedModule,
      ReactiveFormsModule,
      FormsModule
    ],
    exports:
    [
      AuthComponent
    ]
  }
)
export class AuthModule{

}