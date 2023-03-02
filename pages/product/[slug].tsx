import { ShopLayout } from "@/components/layouts"
import { ProductSlideshow, SizeSelector } from "@/components/products";
import { ItemCounter } from "@/components/ui";
import { dbProducts } from "@/database";
import { ICartProduct, IProduct, ISize } from "@/interfaces";
import { Button, Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { CartContext } from '@/context/cart'

// const product = initialData.products[0];
interface Props{
  product: IProduct;
}
const ProductPage: NextPage<Props> = ({product}) => {
  // const router = useRouter(); //este route tiene varias propiedades verlas con console.log
  // const {products: product, isLoading} = useProducts(`/products/${router.query.slug}`);
  // Estamos renombrando el product y del route sacamos desde la query(propiedad del 
  // router) la propiedad de nuestro producto que es el slug

  const router = useRouter();
  //Para poder realizar mi agregar al carrito necesito tomar mi contexto
  const {addProductToCart} = useContext ( CartContext );


  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({ //UIn estado temporal
    _id: product._id,
    image : product.images[0],
    price: product.price, 
    size: undefined,
    slug: product.slug,
    title: product.title, 
    gender: product.gender,
    quantity: 1, 
  });

  const selectedSize = (size: ISize) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      size
    }));
  }

//Funcion para el contador
  const onUpdateQuantity = (quantity: number) => { 
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }));
  }

//Funcion agregar producto
  const onAddProduct = () => { 
    if (!tempCartProduct.size) { return; }


  //llamar accion context para agregar al carrito
    addProductToCart ( tempCartProduct )
    router.push('/cart');
  }



  return (
    <ShopLayout title= {product.title} pageDescription= {product.description}>
        <Grid container spacing={3}>

            <Grid item xs={12} sm={7} >
                <ProductSlideshow 
                  images={product.images}
                />
            </Grid>
            
            <Grid item xs={12} sm={5} >
                <Box display='flex' flexDirection='column' >
                    {/*Titulos */}
                    <Typography variant='h1' component='h1'> {product.title} </Typography>
                    <Typography variant='subtitle1' component='h2'> $ {product.price} </Typography>

                    {/*Cantidad de elementos */}
                    <Box sx={{my:2}}>
                      <Typography variant='subtitle2' > Cantidad </Typography>

                      <ItemCounter 
                        currentValue={tempCartProduct.quantity}
                        updatedQuantity={ onUpdateQuantity} 
                        maxValue={product.inStock > 5 ? 5 : product.inStock }
                        //Si el producto en stock es mayor a 5 el maxValue es 5 y si no, es el stock del producto
                      />

                      <SizeSelector 
                        // selectorSize={product.sizes[0]} 
                        sizes={product.sizes}
                        selectorSize={tempCartProduct.size}
                        onSelectedSize={ selectedSize }
                      />

                    </Box>
                     {/*Agregar al carrito */}
                     {
                      (product.inStock > 0 ) 
                        ?(
                          <Button 
                            color="secondary" 
                            className="circular-btn"
                            onClick={onAddProduct}
                            
                            >
                           { 
                           tempCartProduct.size
                            ? ' Agregar al carrito'
                            :  'Seleccione una talla'
                           }
                          
                          </Button>
                        ):
                        (
                          <Chip label='No hay disponibles' color='error' variant='outlined' /> 
                        )
                     }
                     

                     
                     <Box sx={{mt:3}}>
                        <Typography variant="subtitle2">Descripcion</Typography>
                        <Typography variant="body2">{product.description}</Typography>
                     </Box>


                </Box>
            </Grid>

        </Grid>
    </ShopLayout>
  )
}
//No usar el Server Side Rendering
// //getServerSideProps
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
//   const { slug = '' } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug( slug );

//   if ( !product ) { //Si el produto no existe lo mando al home
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

//Get Static Paths - Get Static Props

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map( ({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug( slug );

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 //Se revalida cada 24 hrs, tambien se puede hacer el calculo
  }
}



export default ProductPage;


