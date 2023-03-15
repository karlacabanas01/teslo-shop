import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "@/database";

export const authOptions = ({

  providers: [
    Credentials({
      name:'Custom Login',
      credentials:{
        email   : {label:'Correo:', type: 'email', placeholder:'correo@google.com'},
        password: {label:'Contraseña:', type: 'password', placeholder:'**********'}
      },
      async authorize(credentials){
        console.log({credentials})

        //return {name: 'Juan', correo: 'juan@gmail.com', role: 'admin'};
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

  ],

  //Custom Pages
  pages:{
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  //Callbacks
  jwt:{

  },

  session:{
    maxAge: 2592000, //30 dias
    strategy: 'jwt',
    updateAge: 86400, //Cada día
  },




  callbacks: {
    async jwt({token, account, user}){
      //console.log({token, account, user});

      if (account) { //Si hay una cuenta
        token.accessToken =  account.access_token;

        switch (account.type) {
          case 'oauth':
            //Verificar si existe en la base de datos
            token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
          break;

          case 'credentials':
            token.user = user;
          break;
        
          default:
            break;
        }
      }

      return token;

    },

    async session({session, token, user} ){
    //console.log({session, token, user});
    session.accessToken =  token.access_token;
    session.user = token.user as any
      
    return session;
    }
  } 

});

export default NextAuth(authOptions);