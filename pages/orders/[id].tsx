import { CartList } from "@/components/cart";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { ShopLayout } from "@/components/layouts";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Chip,
} from "@mui/material";
import NextLink from "next/link";

const OrderPage = () => {
  return (
    <ShopLayout
      title="Resumen de la compra 172787382"
      pageDescription="Resumen de la compra"
    >
      <Typography variant="h1" component="h1">
        Order: 172787382
      </Typography>{" "}
      {/*Arreglar*/}
      <br />
      {/* <Chip 
        sx={{my: 2}} 
        label="Pendiente de pago"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined/> } /> */}
      <Chip
        sx={{ my: 2 }}
        label="Pagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 Productos)</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <NextLink href="/checkout/address" passHref>
                  Editar
                </NextLink>
              </Box>

              <Typography>Karla</Typography>
              <Typography>323 Algun Lugar</Typography>
              <Typography>Villa 123, H2</Typography>
              <Typography>Canadá</Typography>
              <Typography>82773662</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  Editar
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                {" "}
                {/*SX es del estilo y XS es de Small */}
                <h1>Pagar</h1>
                <Chip
                  sx={{ my: 2 }}
                  label="Pagada"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
                
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
