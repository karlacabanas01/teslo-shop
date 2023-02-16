import { CartList } from "@/components/cart/CartList";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { ShopLayout } from "@/components/layouts"
import { Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const CardPage = () => {
  return (
    <ShopLayout title="Carrito - 3" pageDescription="Carrito de compras de la tienda">
        <Typography variant='h1' component='h1' >Carrito</Typography> {/*Arreglar*/}
        <br />

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList  />

            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2">Orden</Typography>
                        <Divider sx={{my: 1}}/>
                        <OrderSummary />

                        <Box sx={{ mt: 3}}> {/*SX es del estilo y XS es de Small */}
                            <Button color="secondary" className="circular-btn" fullWidth> 
                                Checkout
                            </Button>

                        </Box>
                    </CardContent>

                </Card>
            </Grid>

        </Grid>
    </ShopLayout>

  )
}

export default CardPage;