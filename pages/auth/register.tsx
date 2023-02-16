import { AuthLayout } from "@/components/layouts";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

import NextLink from 'next/link';

const RegisterPage = () => {
  return (
   
    <AuthLayout title="Registrar">

      <Box sx={{width:350, padding:'10px 20px'}}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">Registrate</Typography>
          </Grid>

          <Grid item xs={12} sx={{my: 1}}>
            <TextField label="Nombre" variant="filled" fullWidth/>
          </Grid>

          <Grid item xs={12} sx={{my: 1}}>
            <TextField label="Correo" variant="filled" fullWidth/>
          </Grid>
          <Grid item xs={12} sx={{my: 1}}>
            <TextField label="Contraseña" variant="filled" type="password" fullWidth/>
          </Grid>

          <Grid item xs={12} >
            <Button color="secondary" className="circular-btn" size="large" fullWidth>Registrar</Button>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink href="/auth/login" passHref>
              ¿Ya tienes cuenta?

            </NextLink>
            
          </Grid>

        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
