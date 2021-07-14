/*
    Event Routes
    /api/events
*/ 

const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');

const { eliminarEvento, actualizarEvento, getEventos, crearEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//CRUD



//todas tienen que pasar por la validacion del JWT
router.use(validarJWT)

//Obtener eventos
router.get('/', getEventos)
//Crear un nuevo evento
router.post('/',
[//middlewares
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatorio').custom(isDate),
    check('end','Fecha de finalizción es obligatorio').custom(isDate),
    
    validarCampos
],
 crearEvento)
//Actualizar Evento
router.put('/:id', actualizarEvento)
//Borrar evento
router.delete('/:id', eliminarEvento)


module.exports = router;