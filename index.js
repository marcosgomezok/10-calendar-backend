const express = require ('express');
const cors = require ('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();


//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors())

//Directorio Público
app.use(express.static('public')) //siempre que alguien pase por mi servidor

//Lectura y parseo del body
app.use(express.json())

//Rutas
app.use('/api/auth', require('./routes/auth')); //todo lo que auth.js vaya a exportar lo va a habilitar en '/api/auth'

app.use('/api/events', require('./routes/events')); 

//Escuchar Peticiones
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})



//console.log(process.env)

//const dotenv = require('dotenv').config();

//TODO: CRUD: Eventos

/* app.get('/',(req,res)=>{

  //  console.log('Se requiere el /');
    res.json({
        ok:true
    })
}) */

//nunca poner puerto 3000