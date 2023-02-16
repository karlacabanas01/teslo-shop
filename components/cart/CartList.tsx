import { initialData } from "@/database/products";
import { Button, CardActionArea, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import NextLink from "next/link";
import { FC } from "react";
import { ItemCounter } from "../ui";

const productsInCard = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable?: boolean;
}

export const CartList:FC<Props> = ({editable = false}) => {

  return (
    <>
        {
            productsInCard.map(product =>(
                <Grid container spacing={2} sx={{mb: 1}} key={product.slug}>
                    <Grid xs={3}> 
                        <NextLink href={'/product/slug'} passHref>
                            <CardActionArea>
                                <CardMedia 
                                    image={`/products/${product.images[0]}`}
                                    component="img"
                                    sx={{borderRadius: '5px'}}
                                />
                            </CardActionArea>
                        </NextLink>
                    
                    </Grid>
                    <Grid xs={7}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant="body1">{product.title} </Typography>
                            <Typography variant="body1">Talla: <strong>M</strong> </Typography>

                            {
                                editable
                                ? <ItemCounter/>
                                : <Typography variant="h6">3 Items</Typography>
                            }

                            
                        </Box>
                    </Grid>
                    <Grid xs={2} display='flex' alignItems='center' flexDirection='column'> 
                        <Typography variant="subtitle1">$ {product.price} </Typography>
                        {
                                editable && (
                                    <Button variant="text" color="secondary">Remover</Button>
                                )
                        }
                        
                    </Grid>
                </Grid>
            ))
        }
    </>
  )
}
