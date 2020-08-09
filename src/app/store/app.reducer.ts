import * as fromSl from '../shopping-list/store/shopping-list.reducer'
import * as fromAuth from '../auth/store/auth.reducer'
import { ActionReducerMap } from '@ngrx/store'

export interface AppState {
  shoppingList: fromSl.State;
  auth: fromAuth.State;

}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromSl.shoppingListReducer,
  auth: fromAuth.authReducer
}