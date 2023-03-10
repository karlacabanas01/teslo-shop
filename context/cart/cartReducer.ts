import { ICartProduct } from '@/interfaces';
import { CartState, ShippingAddress } from '.';


type CartActionType = 
   | { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] } 
   | { type: '[Cart] - Update products in cart', payload: ICartProduct[] } 
   | { type: '[Cart] - Change cart quantity', payload: ICartProduct } 
   | { type: '[Cart] - Remove product in cart', payload: ICartProduct } 
   | { type: '[Cart] - LoadAddress from Cookies', payload: ShippingAddress } 
   | { type: '[Cart] - Update Address', payload: ShippingAddress } 
   | { 
      type: '[Cart] - Update order summary', 
      payload:{     
         numberOfItems: number;
         subTotal: number;
         tax: number;
         total: number; }
   } 


export const cartReducer = ( state: CartState, action: CartActionType ): CartState => {

   switch (action.type) {

      case '[Cart] - LoadCart from cookies | storage':
         return {
            ...state,
            isLoaded: true,
            cart: [...action.payload]
        }

      case '[Cart] - Update products in cart':
         return {
            ...state,
            cart: [...action.payload] //El nuevo valor de mi arrito va a ser lo que tenga en mi payload
        }
      
      case '[Cart] - Change cart quantity':
         return {
            ...state,
            //Será el producto actualizado con la cantidad actualizada
            cart: state.cart.map(product => {
               if (product._id !== action.payload._id) return product; //Si son diferentes no es el producto que quiero actualizar
               if (product.size !== action.payload.size) return product; //Si los tamaños son diferentes no es producto que quiero actualizar

               return action.payload;
            })
         }

      case '[Cart] - Remove product in cart':
         return{
            ...state,

            cart: state.cart.filter( product => {
              
               if(product._id === action.payload._id && product.size === action.payload.size){
                  return false;
               }

               return true;
         })
      }


      case '[Cart] - Update order summary' :
         return{
            ...state,
            ...action.payload
         }

      
      case '[Cart] - LoadAddress from Cookies':
      case '[Cart] - Update Address':
         return{
            ...state,
            shippingAddress: action.payload
         }
      
      
       default:
          return state;
   }

}