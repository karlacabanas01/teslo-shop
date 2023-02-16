import { ShopLayout } from "@/components/layouts";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import NextLink from 'next/link';


const EmptyPage = () => {
  return (
    <ShopLayout title="Carrito Vacio" pageDescription="NO hay articulos en el carrito">
        <Box 
            display={'flex'} 
            justifyContent='center' 
            alignItems={'center'} 
            height='calc(100vh - 200px)'
            sx={{flexDirection:{xs:'column', sm:'row'}}}>
              <RemoveShoppingCartOutlined sx={{fontSize: 100}}/>
            <Box display={'flex'} flexDirection='column' alignItems={'center'}>
              <Typography>Su carrito está vacio</Typography>
              <NextLink href='/' passHref> 
                <Typography variant='h4' color='secondary'>Regresar</Typography>
              </NextLink>
            </Box>
        </Box>
    </ShopLayout>
  )
}
export default EmptyPage;