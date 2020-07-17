import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';
import * as SLActions from './shopping-list.actions'

const initialState= {
    ingredients:[
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    ]
};

export function shoppingListReducer(state = initialState, action: SLActions.AddIngredient){
    switch ( action.type ){
        case SLActions.ADD_INGREDIENT:
        {
            return { 
                ... state, ingredients: [...state.ingredients, action.payload ] 
            }
        };
    }
}