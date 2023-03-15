//React - Material - componentes internos
import { useContext, useEffect } from "react";
import NextLink from "next/link";

import { Typography, Grid, Card, CardContent, Divider, Box, Button } from "@mui/material";

import { CartList, OrderSummary } from "../../components/cart";

import { ShopLayout } from "@/components/layouts";
import { CartContext } from "@/context";
import { countries } from "@/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/router";




const SummaryPage = () => {
//El shippingAddress puede ser nulo
    const router = useRouter();
    const { shippingAddress, numberOfItems } = useContext( CartContext );

    useEffect(()=>{
        if(Cookies.get('firstName')){
            router.push('/checkout/address');
        }
    },[router])

    if (!shippingAddress) {
        return <></>;
    }

    const {firstName, lastName, address, address2 = '', city, country, phone, zip} = shippingAddress;



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
                    <Typography variant="h2">Resumen ({numberOfItems === 1 ? 'producto' : 'productos'})</Typography>
                    <Divider sx={{my: 1}}/>

                    <Box display='flex' justifyContent='space-between'>
                    <Typography variant="subtitle1">Dirección de entrega</Typography>
                        <NextLink href="/checkout/address" passHref >
                            Editar
                        </NextLink>
                    </Box>
                   
                    <Typography>{firstName} {lastName}</Typography>
                    <Typography>{address}{address2 ? `, ${address2}` : ''}</Typography>
                    <Typography>{city}, {zip}</Typography>
                    {/* <Typography>{ countries.find(c => c.code === country)?.name } </Typography> */}
                    <Typography>{country}</Typography>
                    <Typography>{phone}</Typography>

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