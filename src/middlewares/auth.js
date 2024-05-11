const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.auth = (req, res, next) => {

    if (!req.headers.authorization) {

        return res.status(401).json({
            message: 'No se ha proporcionado un token'
        });

    }

    const token = req.headers.authorization.replace(/['"]+/g, '');

    try {

        const payload = jwt.verify(token, secret);

        if (payload.exp <= Date.now()) {

            return res.status(401).json({
                message: 'El token ha expirado'
            });

        }

        next();
        
    } catch (error) {

        return res.status(401).json({
            message: 'Token inválido'
        });
        
    }

}
