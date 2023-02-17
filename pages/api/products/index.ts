//ARCHIVO DE BACKEND
import { db, seedDatabase, SHOP_CONSTANTS } from "@/database";
import { IProduct } from "@/interfaces";
import { Product } from "@/models";
import { NextApiRequest, NextApiResponse } from "next"; 

type Data ={message: string;}
            | IProduct[];

export default async function handler (req: NextApiRequest, res: NextApiResponse){
    switch (req.method) {
        case 'GET':
            return getProducts(req, res)
    
        default:
            return res.status(401).json({message: 'Bad request'})
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<any>)  => {
  const{ gender = 'all' } = req.query;
  let condition = {}; 

  if (gender !== 'all' && SHOP_CONSTANTS.validGender.includes(`${gender}`) ) {
    condition = {gender};
  }

   await db.connect();
   const products = await Product.find(condition)
                                .select('title images price inStock slug -_id')
                                .lean();

   await db.disconnect();

   return res.status(200).json(products);
}
