import { IUser } from '@/interfaces';
import { createContext } from 'react'; 
//El contexto es lo que quiero que vean los componentes hijos fuera del provider
interface ContextProps { 
    isLoggedIn: boolean;
    user?: IUser;

    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>;
    logout: () => void;
}

export const AuthContext = createContext( {} as ContextProps); 