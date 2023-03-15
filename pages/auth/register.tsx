import { AuthLayout } from "@/components/layouts";
import { AuthContext } from "@/context";
import { validations } from "@/utils";
import { ErrorOutline } from "@mui/icons-material";
import { Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getSession, signIn } from "next-auth/react";

import NextLink from 'next/link';
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";


type FormData = {
  name: string,
  email: string,
  password: string,
};


const RegisterPage = () => {

  const router = useRouter();
  const {registerUser} = useContext(AuthContext)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegisterForm = async  ({name, email, password}: FormData) =>{   

    setShowError(false);
    const {hasError, message} = await registerUser(name, email, password);

    if (hasError ) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    // const destination =  router.query.p?.toString() || '/';
    // router.replace(destination);

    await signIn ('credentials', {email, password }); //nextAuth
  }



  return (
   
    <AuthLayout title="Registrar">

      <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>

        <Box sx={{width:350, padding:'10px 20px'}}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">Registrate</Typography>
              
              <Chip
                label="Email ya registrado"
                color="error"
                icon={ <ErrorOutline/> }
                className="fadeIn"
                sx={{display: showError ? 'flex': 'none'}}
              />

            </Grid>
{/* Nombre */}
            <Grid item xs={12} sx={{my: 1}}>
              <TextField 
                label="Nombre" 
                variant="filled" 
                fullWidth
                {
                  ...register('name',{
                    required: 'Este campo es requerido',
                    minLength: {value:2, message: 'Mínimo 2 caracteres'}
                }) }
                  error={!!errors.name }
                  helperText={errors.password?.message}
                />
            </Grid>
{/* Correo */}
            <Grid item xs={12} sx={{my: 1}}>
              <TextField 
                label="Correo" 
                variant="filled" 
                fullWidth
                {...register('email',{
                  required: 'Este campo es requerido',
                  validate: validations.isEmail
                }) }
                error={!!errors.email }
                helperText={errors.email?.message}/>
            </Grid>
{/* Password */}
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
                fullWidth
              >
                Registrar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink 
                href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}  
                passHref>
                ¿Ya tienes cuenta?

              </NextLink>
              
            </Grid>

          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
  const session = await getSession({ req }); //NextAuth

  const { p = '/' } = query;

  if ( session ) {
      return { //Si tengo lo amndo a esa pagina
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
export default RegisterPage;
