import { FC, useMemo, useState } from "react";
import NextLink from 'next/link';
import { Card, CardActionArea, CardMedia, Chip, Grid, Typography } from "@mui/material";
import { Box } from '@mui/system';

import { IProduct } from '../../interfaces';
interface Props {
    product: IProduct; //Es uno por eso se define de esa manera
}

export const ProductCard: FC<Props> = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false); //Se usará para saber cuando el mouse está encima y cuando no
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const productImage = useMemo(() =>{ //Memorisar el product image
    return isHovered
        ? `/products/${product.images[1]}` //Si hovered está en true se muestra la segunda imagen
        : `/products/${product.images[0]}`

    } , [isHovered]);


    return (
    <Grid 
        item xs={6} sm={4}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
      <Card>
        <NextLink href={`/product/${product.slug}`} passHref prefetch={false}> 
        {/* Con el prefech no se siente uan depresiacion */}   

                
                <CardActionArea>
                  {
                    (product.inStock === 0) && (
                      <Chip 
                        color="primary"
                        label="No hay disponibles"
                        sx={{position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                      />   
                    )
                  }
                   
                  <CardMedia
                    component="img"
                    className='fadeIn'
                    image={productImage}
                    alt={product.title}
                    onLoad={( ) => setIsImageLoaded(true)}
                  />

                </CardActionArea>
        </NextLink>
      </Card>

{/*Si la imagen no está cargada entonces no va a aparecer*/}
{/*FadeIn es para darle el estilo de los styles */}
      <Box sx= {{mt:1, display: isImageLoaded ? 'block' : 'none'}} className='fadeIn'>
        <Typography fontWeight={700}> {product.title} </Typography>
        <Typography fontWeight={500}> $ {product.price} </Typography>
        {/* <Typography> {`$${product.price}`} </Typography> se puede hacer de ambas fromas*/}
      </Box>
    </Grid>
  );
};
