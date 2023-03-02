import { IUser } from "@/interfaces/user";
import mongoose, {Schema, model, Model} from "mongoose";

const userShcema = new Schema({ //Definicion del esquema
    name    :{type: String, require: true},
    email   :{type: String, require: true, unique: true},
    password:{type: String, require: true},
    role    :{
        type: String, 
        enum: {
            values: ['admin', 'client'],
            message: '{VALUE} no es un rol válido',
            default:'client',
            required: true,
        }
    }

    }, {
        timestamps: true,
    
    })

    //definicion del modelo en mongoose
    const User:Model<IUser> = mongoose.models.User || model('User', userShcema);
    export default User;