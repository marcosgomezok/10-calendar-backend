const {response} = require('express'); //express es para tener la ayuda
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req,res=response)=>{ //response es para tener la ayuda

    const {email,password}=req.body

    try{
        let usuario = await Usuario.findOne({email: email})
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'un usuario ya existe con ese correo'
            })
        }
        
        usuario = new Usuario(req.body);
           
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt)


        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)
    
        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token,
            msg: 'registro'
        })
    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administradorr'
        })
    }
}

const loginUsuario = async(req,res=response)=>{

    const {email,password}=req.body
    

    try {
        
        const usuario = await Usuario.findOne({email:email});
        console.log(usuario)
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        //confirmar password

        const validPassword = bcrypt.compareSync(password,usuario.password)

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        //generar nuestro JWT (json web token)
        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)
        
        res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador entra ene l catch de login'
        })
    }
}

const revalidarToken = async(req,res=response)=>{

    const{uid,name} = req
    // const uid  = req.uid;
    // const name  = req.name;

        //Generar un nuevo JWT
    //Generar JWT
    const token = await generarJWT(uid, name)
    res.json({
        ok:true,
        token,
        uid,name,
        msg:'renew'
    })
}

module.exports = {
    crearUsuario,loginUsuario,revalidarToken
}

//console.log(req.body)
//user:req.body

//solo se puede hacer un solo response. sino da error
//express validator me provee muchos midelware. midelware es una funcion que se va a ejecutar antes de cualquier cosa
/*,
        name,
        email,
        password */