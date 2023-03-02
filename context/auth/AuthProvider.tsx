import { tesloApi } from '@/api';
import { IUser } from '@/interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FC, ReactNode, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';

export interface AuthState {
    isLogginIn: boolean,
    user? : IUser
}

const AUTH_INITIAL_STATE: AuthState = {
    isLogginIn: false,
    user: undefined,
}

interface Props {
    children: ReactNode;
  }

export const AuthProvider:FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer( authReducer , AUTH_INITIAL_STATE );

    useEffect(() => {
        ckeckToken();
    }, [])

    const ckeckToken = async() => {
        //llamar al endpoint
        //revalidar token guarduado
        //dispatch login
        //borrrar el token de las cookies
        try {
            const {data} = await tesloApi.get('/user/validate-jwt');
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({type:'[Auth] - Login ', payload: user});

            
        } catch (error) {
            Cookies.remove('token');
        }
    }
    

    const loginUser = async (email: string, password: string) : Promise<boolean> => {
        try {
            const {data} = await tesloApi.post('/user/login', {email, password});
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({type:'[Auth] - Login ', payload: user});
            return true;
            
        } catch (error) {
            return false;
        }
    }

    const registerUser = async (name: string, email:string, password:string):Promise<{hasError: boolean; message?: string}> =>{
        try {
            const {data} = await tesloApi.post('/user/register', {email, password, name});
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({type:'[Auth] - Login ', payload: user});
            return{
                hasError: false,
            }

            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return{
                hasError: true,
                message: "No se pudo crear el usuario - intente de neuvo"
            }
        }
    }

    return (
    <AuthContext.Provider value={{
        ...state,
        //methods
        loginUser,
        registerUser,
    }}>
        { children }
    </AuthContext.Provider>
)
};