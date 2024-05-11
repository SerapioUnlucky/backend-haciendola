const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const app = express();

app.use(cors());
app.use(express.json());
app.use('*', cors());
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

sequelize.sync()
    .then(() => {
        console.log('Base de datos sincronizada correctamente');
        app.listen(process.env.PORT, () => {console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)});
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos: ', err);
    });
    