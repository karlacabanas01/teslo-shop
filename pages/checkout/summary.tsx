import { CartList } from "@/components/cart";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { ShopLayout } from "@/components/layouts";
import { Typography, Grid, Card, CardContent, Divider, Box, Button } from "@mui/material";

import NextLink from "next/link";

const SummaryPage = () => {
  return (
    <ShopLayout title="Resumen de compra" pageDescription="Resumen de la compra">
    <Typography variant='h1' component='h1' >Resumen de la compra</Typography> {/*Arreglar*/}
    <br />

    <Grid container>
        <Grid item xs={12} sm={7}>
            <CartList  />

        </Grid>
        <Grid item xs={12} sm={5}>
            <Card className="summary-card">
                <CardContent>
                    <Typography variant="h2">Resumen (3 Productos)</Typography>
                    <Divider sx={{my: 1}}/>

                    <Box display='flex' justifyContent='space-between'>
                    <Typography variant="subtitle1">Dirección de entrega</Typography>
                        <NextLink href="/checkout/address" passHref >
                            Editar
                        </NextLink>
                    </Box>
                   
                    <Typography>Karla</Typography>
                    <Typography>323 Algun Lugar</Typography>
                    <Typography>Villa 123, H2</Typography>
                    <Typography>Canadá</Typography>
                    <Typography>82773662</Typography>
                    <Divider sx={{my: 1}}/>

                    <Box display='flex' justifyContent='end'>
                        <NextLink href="/cart" passHref >
                            Editar
                        </NextLink>
                    </Box>

                    <OrderSummary />

                    <Box sx={{ mt: 3}}> {/*SX es del estilo y XS es de Small */}
                        <Button color="secondary" className="circular-btn" fullWidth> 
                            Confirmar Orden
                        </Button>

                    </Box>
                </CardContent>

            </Card>
        </Grid>

    </Grid>
</ShopLayout>

  )
}

export default SummaryPage;