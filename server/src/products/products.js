const db = require('../db')

exports.getProducts = async (req, res) => {  
    try {
        const { rows } = await db.query('SELECT id, name, description, price, material FROM products');

        return res.status(200).json({
            success: true,
            products: rows
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.getProductsCustomer = async (req, res) => {  
    try {
        const customerEmail = req.user.email;

        const { rows } = await db.query('SELECT id, email, name, description, price, material FROM customer_products WHERE email = $1', [customerEmail])

        return res.status(200).json({
            success: true,
            customerProducts: rows
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.reserveProducts = async (req, res) => {  
    try {
        const customerEmail = req.user.email
        const {name, description, price, material} = req.params

        const { rows } = await db.query('INSERT INTO customer_products (email, name, description, price, material) VALUES ($1, $2, $3, $4, $5)', [customerEmail, name, description, price, material]);

        return res.status(200).json({
            success: true,
            message: "Kosárba rakva"
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.removeProducts = async (req,res) => {
    const {Id} = req.params
    try {

        await db.query('DELETE FROM customer_products WHERE id = $1', [Id])

        return res.status(201).json({
            success: true,
            message: 'Termék eltávolítva a kosárból'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}