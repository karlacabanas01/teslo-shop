import { AuthLayout } from "@/components/layouts";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

import NextLink from "next/link";

const LoginPage = () => {
  return (
    <AuthLayout title="Ingresar">
      <Box sx={{width:350, padding:'10px 20px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">Iniciar sesión</Typography>
          </Grid>

          <Grid item xs={12} >
            <TextField label="Correo" variant="filled" fullWidth/>
          </Grid>
          <Grid item xs={12} sx={{my: 1}}>
            <TextField label="Contraseña" variant="filled" type="password" fullWidth/>
          </Grid>

          <Grid item xs={12} >
            <Button color="secondary" className="circular-btn" size="large" fullWidth>Ingresar</Button>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink href="/auth/register" passHref>
              ¿No tienes cuenta?

            </NextLink>
            
          </Grid>

        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
