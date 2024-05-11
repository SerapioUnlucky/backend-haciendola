const product = require('../models/productModel');

const viewAll = async (req, res) => {

    try {

        const products = await product.findAll();

        if (products.length === 0) {

            return res.status(404).json({
                message: 'No hay productos para mostrar'
            });

        }

        return res.status(200).json({
            message: 'Productos obtenidos correctamente',
            products
        });

    } catch (error) {

        return res.status(500).json({
            message: 'Ha ocurrido un error interno al obtener los productos'
        });

    }

}

const create = async (req, res) => {

    const params = req.body;

    if (!params.Handle || !params.Title || !params.Description || !params.SKU || !params.Grams || !params.Stock || !params.Price || !params.Compare_Price || !params.Barcode) {

        return res.status(400).json({
            message: 'Faltan campos obligatorios'
        });

    }

    try {

        const newProduct = await product.create(params);

        return res.status(201).json({
            message: 'Producto creado correctamente',
            product: newProduct
        });

    } catch (error) {

        return res.status(500).json({
            message: 'Ha ocurrido un error interno al crear el producto'
        });

    }

}

const update = async (req, res) => {

    const id = req.params.id;
    const params = req.body;

    try {

        const existProduct = await product.findOne({ where: { id } });

        if (!existProduct) {

            return res.status(404).json({
                message: 'Producto no encontrado'
            });

        }

        await product.update(params, { where: { id } });

        return res.status(200).json({
            message: 'Producto actualizado correctamente'
        });

    } catch (error) {

        return res.status(500).json({
            message: 'Ha ocurrido un error interno al actualizar el producto'
        });

    }

}

const deleted = async (req, res) => {

    const id = req.params.id;

    try {

        const existProduct = await product.findOne({ where: { id } });

        if (!existProduct) {

            return res.status(404).json({
                message: 'Producto no encontrado'
            });

        }

        await product.destroy({ where: { id } });

        return res.status(200).json({
            message: 'Producto eliminado correctamente'
        });

    } catch (error) {

        return res.status(500).json({
            message: 'Ha ocurrido un error interno al eliminar el producto'
        });

    }

}

module.exports = {
    viewAll,
    create,
    update,
    deleted
};
