import { ICartProduct } from "@/interfaces";
import { FC, ReactNode, useEffect, useReducer } from "react";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";


export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number; 

  shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
  firstName : string;
  lastName  : string;
  address   : string;
  address2? : string;
  zip       : string;
  city      : string;
  country   : string;
  phone     : string;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded      : false,
  cart          : [],
  numberOfItems : 0,
  subTotal      : 0,
  tax           : 0,
  total         : 0, 

  shippingAddress: undefined,
};

interface Props {
  children: ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  //Effect que recargue las cookies
  useEffect(() => {
    try {
        const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ) : [];
        dispatch({type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts}) 
    } catch (error) {
        dispatch({type: '[Cart] - LoadCart from cookies | storage', payload: []}) 
        
    }

  
  }, [])

  
  useEffect(() => {
  
    if(Cookie.get('firstName')){
      const shippingAddress = {
        firstName : Cookie.get('firstName') || '',
        lastName  : Cookie.get('lastName') || '',
        address   : Cookie.get('address') || '',
        address2  : Cookie.get('address2') || '',
        zip       : Cookie.get('zip') || '',
        city      : Cookie.get('city') || '',
        country   : Cookie.get('country') || '',
        phone     : Cookie.get('phone') || '',
      }
      dispatch({type:'[Cart] - LoadAddress from Cookies', payload: shippingAddress})  
    }

  }, [])

  
  useEffect(() => {
    if( state.cart.length > 0 ){
      Cookie.set('cart', JSON.stringify(state.cart));
    }
    
  }, [state.cart])


  //Contador
  useEffect(() => {
    const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev , 0 );//Cuantas unidades
    const subTotal = state.cart.reduce( (prev, current) =>(current.price * current.quantity) + prev, 0);//total precio
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0); //es el impuesto 15%

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate ,
      total: subTotal * (taxRate +1),

    }
    dispatch({type:'[Cart] - Update order summary', payload: orderSummary})
  }, [state.cart])





  
  //Agregar
  const addProductToCart = (product: ICartProduct) => {
    {
      //Inicio Solucion Nivel 1
      //No es la solucion ya que agrega más de un producto con el mismo id
      // dispatch ({type: '[Cart] - Add Product', payload: product})
      //Nivel 2
      //Veo todos los productos diferentes del que tengo, el problema de esta solución
      //es que los pasos para resolverla son muy largos, de igual forma no funcionaría como se espera
      //No estría acumulando, solo estaría sobrer escribeindo el valor
      // const productsInCart = state.cart.filter( p => p._id !== product._id && p.size !== product.size);
    }
    //Nivel Final
    //Verifico si existe un producto con ese id //Some es como un filter, solo que regresa un valor boolean
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart)
      return dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product],
      }); //Mando el arreglo del carrito con el producto

    //Existe el producto con esa talla? y con ese ID
    const producctInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    ); //Si no existe simplemente lo agregamos
    if (!producctInCartButDifferentSize)
      return dispatch({
        type: '[Cart] - Update products in cart' ,
        payload: [...state.cart, product],
      }); //Mando el arreglo del carrito con el producto

    //Existe el producto con ese ID y Talla entonces debemos acumular
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p; //Si el producto es diferente NO es el que tengo que editar
      if (p.size !== product.size) return p; //Si pasa valido el Size, si la talla es difernete no hago nada

      //Si logra pasar Actualiza la cantidad
      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: '[Cart] - Update products in cart',
      payload: updatedProducts,
    }); //No se hace desectructuracion ya que el map hace el nuevo arreglo
  }

  //Actulizar 
  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({type: '[Cart] - Change cart quantity', payload: product});
  } 

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({type: '[Cart] - Remove product in cart', payload: product});
  }

  const updateAddress = (address: ShippingAddress) => {
      Cookie.set('firstName', address.firstName) ;
      Cookie.set('lastName', address.lastName) ;
      Cookie.set('address', address.address) ;
      Cookie.set('address2', address.address2 || '') ;
      Cookie.set('zip', address.zip );
      Cookie.set('city', address.city );
      Cookie.set('country', address.country );
      Cookie.set('phone', address.phone);
      
    dispatch({type:'[Cart] - Update Address', payload: address});
  }


  return (
    <CartContext.Provider
      value={{
        ...state,

        //Methods
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,

      }}
    >
      {children}
    </CartContext.Provider>
  );
};
