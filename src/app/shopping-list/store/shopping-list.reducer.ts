import { Ingredient } from '../../shared/ingredient.model';
import * as SLActions from './shopping-list.actions'

export interface AppState{
 shoppingList: State;   
}

export interface State{
    ingredients: Ingredient[];
    editedIngredient:Ingredient;
    editedIngredientIndex: number;
}

const initialState :State= {
    ingredients:[
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null, 
    editedIngredientIndex: -1
};



export function shoppingListReducer(state: State = initialState, action: SLActions.SLActions){
    
    switch ( action.type ){
        case SLActions.ADD_INGREDIENT:
        {
            return { 
                ... state, 
                ingredients: [...state.ingredients, action.payload ] 
            }
        };
        case SLActions.ADD_INGREDIENTS:
        {
            return {
                ...state, 
                ingredients: [...state.ingredients, ... action.payload]
            }
        };
        case SLActions.UPDATE_INGREDIENT:
        {
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatetedIngr = {
                 ...ingredient , 
                 ...action.payload};
            const updatetedIngrs = [...state.ingredients];
            updatetedIngrs[state.editedIngredientIndex] = updatetedIngr;
            return {
                ...state,
                ingredients: updatetedIngrs,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        };
        case SLActions.DELETE_INGREDIENT:
        {
            return {
                ...state, 
                ingredients: state.ingredients.filter
                ((ingr,IngrIndex) => {
                    return IngrIndex !==state.editedIngredientIndex;
                }),
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        };

        case SLActions.START_EDIT:
        {
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            }
        };


        case SLActions.STOP_EDIT:
        {
            return{
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        };

        default: 
        {
            return state;
        };

    }
}