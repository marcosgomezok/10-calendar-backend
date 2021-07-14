const {response} = require('express');
const Evento = require('../models/Evento');
const getEventos=async(req,res=response)=>{
    
        const eventos = await Evento.find()
                                    .populate('user','name');

            res.status(201).json({
                ok:true,
                eventos,
                msg: 'getEventos'
            })

}
const crearEvento=async(req,res=response)=>{

    const evento = new Evento(req.body)

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save()

        res.json({
            ok:true,
            evento: eventoGuardado
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }




}
const actualizarEvento=async(req,res=response)=>{
    


    const eventoId = req.params.id;

    try {
        const evento = await Evento.findById(eventoId);
        const uid = req.uid;
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'ev no existe por ese id'
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg: 'no tiene priv de editar'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user:uid
        }

        //const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento)
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true})

        res.status(200).json({
            ok:true,
            eventoActualizado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                ok:false,
                msg: 'Hable con el administrador'
                
            })
    }


}
const eliminarEvento=async(req,res=response)=>{
    
    const eventoId = req.params.id;

    try {
        const evento = await Evento.findById(eventoId);
        const uid = req.uid;

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'ev no existe por ese id'
            })
        }
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg: 'no tiene priv para eliminar'
            })
        }

        const eventoBorrado = await Evento.findByIdAndDelete(eventoId)

        res.json({
            ok:true,
            eventoBorrado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                ok:false,
                msg: 'Hable con el administrador'
                
            })
    }


}

module.exports = {
    getEventos,crearEvento,actualizarEvento,eliminarEvento
}
