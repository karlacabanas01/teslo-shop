import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { initialData } from "@/database/products";
import { Typography } from "@mui/material";
{/*Siempre que se use un map se debe poner un key */}

export default function Home() {
  return (
   <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos aqui'}>
      <Typography variant='h1' component='h1' > Tienda </Typography>
      <Typography variant='h2' sx={{mb: 1}} >Todos los productos</Typography>
{/*Me permitirá reutilizarlño por la categoria que necesitaré */}
      <ProductList products={initialData.products as any}/>
   </ShopLayout>
  )
}
