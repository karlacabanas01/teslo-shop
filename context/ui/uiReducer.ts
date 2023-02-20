import { UiState } from '.';


type UiActionType = 
   | { type: '[UI] - ToggleMenu' } 


export const uiReducer = ( state: UiState, action: UiActionType ): UiState => {

   switch (action.type) {
      case '[UI] - ToggleMenu':
         return {
            ...state,
            isMenuOpen: !state.isMenuOpen //Se le cambia el valor, de true a false y viceversa
        }

       default:
          return state;
   }

}