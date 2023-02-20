import { ICartProduct } from '@/interfaces';
import { FC, ReactNode, useReducer } from 'react';
import { CartContext, cartReducer } from './';

export interface CartState {
    cart: ICartProduct[];
}


const CART_INITIAL_STATE: CartState = {
    cart: []
}

interface Props{
    children: ReactNode;
}

export const CartProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( cartReducer , CART_INITIAL_STATE );


    return (
        <CartContext.Provider value= {{
            ...state,
        }}>
            { children }
        </CartContext.Provider>
    )
};