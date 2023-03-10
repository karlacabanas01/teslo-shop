import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email:string) => { //En el payload no se pone ningun dato sensible
    if (!process.env.JWT_SECRET_SEED) {
       throw new Error('No hay semilla de JWT - Revisar variables de entorno') 
    }

    return jwt.sign(
        //payload
        {_id, email},

        //Seed
        process.env.JWT_SECRET_SEED,

        //Options
        {expiresIn: '30d' }

    )
}

//Revisar si ese token es permitido

export const isValidToken = ( token: string ):Promise<string> => { //Regresa una promesa que seria el id del usuario
    
    if ( !process.env.JWT_SECRET_SEED ) { //Validacion de seguridad
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    }

    if (token.length <= 10) {
        return Promise.reject('JWR no es válido');
    }

    return new Promise( (resolve, reject) => { //los callbacks pueden tener diferentes nombres

        try {
            jwt.verify( token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if ( err ) return reject('JWT no es válido'); //Si hay un erro el jwt no ees valido

                const { _id } = payload as { _id: string }; //Si pasa tendremos el id

                resolve(_id);

            })
        } catch (error) {
            reject('JWT no es válido');
        }


    })

}