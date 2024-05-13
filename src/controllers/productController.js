const product = require('../models/productModel');

const viewAll = async (req, res) => {

    try {

        let page = 1;
        const limit = 10;

        if (req.params.page) page = Number(req.params.page);

        const offset = (page - 1) * limit;

        const products = await product.findAll({
            attributes: ['Handle', 'Title', 'Description', 'SKU', 'Grams', 'Stock', 'Price', 'Compare_Price', 'Barcode'],
            offset: offset,
            limit: limit
        });

        if (products.length === 0) {

            return res.status(404).json({
                message: 'No hay productos para mostrar'
            });

        }

        const totalProducts = await product.count();
        const totalPages = Math.ceil(totalProducts / limit);

        return res.status(200).json({
            message: 'Productos obtenidos correctamente',
            page: page,
            totalPages: totalPages,
            products
        });

    } catch (error) {

        return res.status(500).json({
            message: 'Ha ocurrido un error interno al obtener los productos'
        });

    }

}

const create = async (req, res) => {

    try {

        const params = req.body;

        if (!params.Handle || !params.Title || !params.Description || !params.SKU || !params.Grams || !params.Stock || !params.Price || !params.Compare_Price || !params.Barcode) {
    
            return res.status(400).json({
                message: 'Faltan campos obligatorios'
            });
    
        }
    
        const existProduct = await product.findOne({ where: { Handle: params.Handle }, attributes: ['Handle']});
    
        if (existProduct) {
    
            return res.status(409).json({
                message: 'El producto ya existe'
            });
    
        }

        const newProduct = await product.create(params, { fields: ['Handle', 'Title', 'Description', 'SKU', 'Grams', 'Stock', 'Price', 'Compare_Price', 'Barcode'] });

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

    try {

        const handle = req.params.handle;
        const params = req.body;
        const keys = Object.keys(params);

        const existProduct = await product.findOne({ where: { Handle: handle }, attributes: ['Handle']});

        if (!existProduct) {

            return res.status(404).json({
                message: 'Producto no encontrado'
            });

        }

        const updatedProduct = await product.update(params, { where: { Handle: handle }, fields: keys});

        return res.status(200).json({
            message: 'Producto actualizado correctamente',
            product: updatedProduct
        });

    } catch (error) {

        return res.status(500).json({
            message: 'Ha ocurrido un error interno al actualizar el producto'
        });

    }

}

const deleted = async (req, res) => {

    try {

        const handle = req.params.handle;

        const existProduct = await product.findOne({ where: { Handle: handle }, attributes: ['Handle']});

        if (!existProduct) {

            return res.status(404).json({
                message: 'Producto no encontrado'
            });

        }

        const deletedProduct = await product.destroy({ where: { Handle: handle } });

        return res.status(200).json({
            message: 'Producto eliminado correctamente',
            product: deletedProduct
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
