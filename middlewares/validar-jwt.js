const{response}=require('express')
const jwt = require('jsonwebtoken');

const validarJWT = (req,res=response,next) =>{  

    //X-TOKENS headers

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        const {uid,name} = jwt.verify(
            token,process.env.SECRET_JWT_SEED
        )
        
            req.uid = uid;
            req.name = name;


//        console.log(payload)



    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    
        next();

    //console.log(token)


}

module.exports = {
    validarJWT
}