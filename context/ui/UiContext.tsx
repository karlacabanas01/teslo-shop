import { createContext } from "react";

interface ContextProps { //Propiedades que necesito, es el estado del contexto
    isMenuOpen: boolean;

    //Methods
    toggleSideMenu: () => void;
}

export const UiContext = createContext( {} as ContextProps); 


