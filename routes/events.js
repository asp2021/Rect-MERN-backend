const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');

const router = Router();

// Todas tienen que pasar por la validacion del JWT
router.use( validarJWT );

// Obtener eventos
router.get('/',  getEventos );

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'Fecha de fin es obligatorio').custom( isDate ),
        validarCampos
    ],
     crearEvento );

// Actualizar evento
router.put('/:id', actualizarEvento );

// Borrar evento
router.delete('/:id', eliminarEvento );

module.exports = router;