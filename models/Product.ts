//Aqui es parte del backend
//Para aprender más sobre esto hay un curso de node.js
import { IProduct } from "@/interfaces";
import mongoose, {Schema, model, Model, } from "mongoose";

const productSchema = new Schema ({
    description: {type: String, require: true},
    images: [{type: String}],
    inStock: {type: Number, require: true, default: 0},
    price: {type: Number, require: true,  default: 0},
    sizes:[ {
        type: String, 
        enum:{
            values:['XS','S','M','L','XL','XXL','XXXL'],
            message: '{VALUE} no es un tamaño valido'

        }
    }],
    slug: {type: String, require: true, unique: true},
    tags: [{type: String}],
    title: {type: String, require: true},
    type: {
        type: String, 
        enum:{
            values:['shirts','pants','hoodies','hats'],
            message: '{VALUE} no es un tamaño valido'
        }
    },
    gender: {
        type: String, 
        enum:{
            values:['men','women','kid','unisex'],
            message: '{VALUE} no es un genero valido'
        }
    }
        
    
},{
    timestamps: true //Hace que moongo me cree timestaps por mi
});
// TODO: Crear indice de MOngo
productSchema.index({title: 'text', tags: 'text'});

const Product: Model<IProduct> = mongoose.models.Product || model ('Product', productSchema);

export default Product;