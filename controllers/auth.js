const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response ) => {
    const { email, password } = req.body ;

    try {
        let usuario = await Usuario.findOne({ email })
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese correo electrónico'
            });
        }
        console.log(usuario)

        usuario = new Usuario( req.body );

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt )

        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        // aca se podria hacer el return, pero no hace falta
        res.status(201).json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error, comuniquese con el administrador'
        });
    }
}

const loginUsuario = async(req, res = response ) => {
    const { email, password } = req.body ;

    try {

        const usuario = await Usuario.findOne({ email })
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario y/o contraseña no es correcto'
            });
        }
        // confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password )

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario y/o contraseña no es correcto'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        // Generar nuestro JWT
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch( error ) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error, comuniquese con el administrador'
        });
    }
}    

const revalidarToken = async (req, res = response ) => {

    const { uid, name } = req;

    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
 