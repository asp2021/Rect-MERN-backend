/*
  api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
// const router = express.Router   (asi seria sin desestructurar)
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
  '/new',
  [  // middlewares
    check( 'name', 'el nombre es obligatorio' ).not().isEmpty(),
    check( 'email', 'el email es obligatorio' ).isEmail(),
    check( 'password', 'el password deber ser mayor a 6 caracteres' ).isLength({ min: 6}),
    validarCampos
  ],
  crearUsuario );

router.post(
  '/',
  [
    check( 'email', 'el email es obligatorio' ).isEmail(),
    check( 'password', 'el password deber ser mayor a 6 caracteres' ).isLength({ min: 6}),
    validarCampos
  ],
   loginUsuario );

router.get('/renew', validarJWT, revalidarToken );

module.exports = router;