import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signIn, getSession, getProviders } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { GetServerSideProps } from 'next';

import { Box, Button, Chip, Divider, Grid, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '../../components/layouts'
import { validations } from '@/utils';




type FormData = {
  email: string,
  password: string,
};



const LoginPage = () => {

  const router = useRouter();

  //const {loginUser} = useContext(AuthContext); //Para poder traer codigo de los Context, Provider, Reducer
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false)
  
  //traer los demas proveedores, como github, facebook, google, etc.
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then( prov => {
      //console.log({prov});
      setProviders(prov);
    })
  }, [])


  const onLoginUser  = async ({email, password}: FormData) =>{

     
    // setShowError(false);
    // const isValidLogin = await loginUser(email, password);

    // if (!isValidLogin) {
    //   setShowError(true);
    //   setTimeout(() => setShowError(false), 3000);
    //   return;
    // }


    // //navegacion
    // const destination =  router.query.p?.toString() || '/';
    // router.replace(destination);
  
    await signIn ('credentials', {email, password });


  }

  return (
    <AuthLayout title="Ingresar">
      <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
        <Box sx={{width:350, padding:'10px 20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">Iniciar sesión</Typography>
              
              <Chip
                label="No reconocemos el usuario / contraseña"
                color="error"
                icon={ <ErrorOutline/> }
                className="fadeIn"
                sx={{display: showError ? 'flex': 'none'}}
              />

            </Grid>

            <Grid item xs={12} >
              <TextField  
                type="email"
                label="Correo" 
                variant="filled" 
                fullWidth
                {...register('email',{
                  required: 'Este campo es requerido',
                  validate: validations.isEmail
                }) }
                error={!!errors.email }
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12} sx={{my: 1}}>
              <TextField 
                label="Contraseña" 
                variant="filled" 
                type="password" 
                fullWidth
                {
                  ...register('password',{
                    required: 'Este campo es requerido',
                    minLength: {value:6, message: 'Mínimo 6 caracteres'}
                }) }
                  error={!!errors.password }
                  helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12} >
              <Button 
                type = "submit"
                color="secondary" 
                className="circular-btn" 
                size="large" 
                fullWidth>
                  Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink 
                href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'} 
                passHref>
                ¿No tienes cuenta?

              </NextLink>
              
            </Grid>

            {/* Boton para github y proveedores */}
            <Grid item xs={12} display="flex" flexDirection="column" justifyContent="end">
              <Divider sx={{width: '100', mb: 2}} />
              {
                Object.values( providers ) .map(( provider: any ) => { //Es una propiedad de js para traer objetos
                  if(provider.id === 'credentials') return (<div key="credentials"></div>)
                  return(
                     <Button
                      key={provider.id}
                      variant="outlined"
                      fullWidth
                      color="primary"
                      sx={{ mb:1 }}
                      onClick={() => signIn(provider.id)}
                     >
                      {provider.name}
                     </Button>
                  )

                })
              }
            </Grid>

          </Grid>
        </Box> 
      </form>
     
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
  const session = await getSession({ req }); //NextAuth
  // console.log({session});

  const { p = '/' } = query;

  if ( session ) {
      return { //Si tengo una sesion lo amndo a esa pagina
          redirect: {
              destination: p.toString(),
              permanent: false
          }
      }
  }


  return {
      props: { }
  }
}
export default LoginPage;
