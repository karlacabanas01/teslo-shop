import { Grid, Typography } from "@mui/material"

export const OrderSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>N° Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>3 Items</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>$ {155}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Impuestos(15%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>$ {13}</Typography>
        </Grid>
        
        <Grid item xs={6} sx={{marginTop:2 }}> {/*Se puede escribir como margin top o mt */}
            <Typography variant="subtitle1">Total a pagar</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography variant="subtitle1">$ {1234}</Typography>
        </Grid>

        
    </Grid>
  )
}
