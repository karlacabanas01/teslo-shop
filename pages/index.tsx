import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui/FullScreenLoading";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useProducts } from "../hooks";
{/*Siempre que se use un map se debe poner un key */}

const HomePage: NextPage = () => {
  
  const {products, isLoading} = useProducts('/products');


  return (
   <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos aqui'}>
      <Typography variant='h1' component='h1' > Tienda </Typography>
      <Typography variant='h2' sx={{mb: 1}} >Todos los productos</Typography>
        {/*Me permitirá reutilizarlño por la categoria que necesitaré */}

        {
          isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products}/>
        }
      
   </ShopLayout>
  )
}
export default HomePage;




//Nota: diferencia entre el 
// LocalStorage se debe hacer una peticion
// Cookies cuando se hace la peticion al backend viajan automaticamente al servidor, es automatica
