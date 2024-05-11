const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('../services/token');

const register = async (req, res) => {

    try {

        const params = req.body;

        if (!params.firstname || !params.lastname || !params.email || !params.username || !params.password) {

            return res.status(400).json({
                message: 'Todos los campos son requeridos'
            });

        }

        const existingUser = await User.findOne({ where: { username: params.username } });

        if (existingUser) {

            return res.status(400).json({
                message: 'El usuario ya existe'
            });

        }

        let pwd = await bcrypt.hash(params.password, 10);
        params.password = pwd;

        const newUser = await User.create(params);

        return res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: newUser
        });

    } catch (error) {

        return res.status(500).json({
            message: 'Ha ocurrido un error interno al registrar el usuario'
        });

    }

}

const login = async (req, res) => {

    try {

        const params = req.body;

        if (!params.username || !params.password) {

            return res.status(400).json({
                message: 'Todos los campos son requeridos'
            });

        }

        const existingUser = await User.findOne({ where: { username: params.username } });

        if (!existingUser) {

            return res.status(400).json({
                message: 'El usuario no existe'
            });

        }

        const match = await bcrypt.compare(params.password, existingUser.password);

        if (!match) {

            return res.status(400).json({
                message: 'Credenciales incorrectas'
            });

        }

        const token = jwt.createToken(existingUser);

        return res.status(200).json({
            message: 'Usuario autenticado correctamente',
            user: existingUser.username,
            token
        });

    } catch (error) {

        return res.status(500).json({
            message: 'Ha ocurrido un error interno al autenticar el usuario'
        });

    }

}

const forgotPassword = async (req, res) => {

    try {

        const params = req.body;

        if (!params.email || !params.newPassword || !params.confirmPassword) {

            return res.status(400).json({
                message: 'Todos los campos son requeridos'
            });

        }

        if (params.newPassword !== params.confirmPassword) {

            return res.status(400).json({
                message: 'Las contraseñas no coinciden'
            });

        }

        const existingUser = await User.findOne({ where: { email: params.email } });

        if (!existingUser) {

            return res.status(400).json({
                message: 'El usuario no existe'
            });

        }

        let pwd = await bcrypt.hash(params.newPassword, 10);
        existingUser.password = pwd;

        await existingUser.update({ password: existingUser.password });

        return res.status(200).json({
            message: 'Contraseña actualizada correctamente'
        });

    } catch (error) {
        
        return res.status(500).json({
            message: 'Ha ocurrido un error interno al actualizar la contraseña'
        });
        
    }

}

module.exports = {
    register,
    login,
    forgotPassword
};
