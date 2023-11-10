const db = require('../db')

exports.getTravels = async (req, res) => {  
    try {
        const { rows } = await db.query('SELECT id, name, departure, destination, date, price, length FROM travels');

        return res.status(200).json({
            success: true,
            travels: rows
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.getTravelsCustomer = async (req, res) => {  
    try {
        const customerEmail = req.user.email;

        const { rows } = await db.query('SELECT id, email, name, departure, destination, date, price, length FROM customer_travels WHERE email = $1', [customerEmail]);

        return res.status(200).json({
            success: true,
            customerTravels: rows
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.reserveTravels = async (req, res) => {  
    try {
        const customerEmail = req.user.email
        const {name, departure, destination, date, price, length} = req.params

        const { rows } = await db.query('INSERT INTO customer_travels (email, name, departure, destination, date, price, length) VALUES ($1, $2, $3, $4, $5, $6, $7)', [customerEmail, name, departure, destination, date, price, length]);

        return res.status(200).json({
            success: true,
            message: "Bakancslistához adva"
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.removeTravels = async (req,res) => {
    const {Id} = req.params
    try {

        await db.query('DELETE FROM customer_travels WHERE id = $1', [Id])

        return res.status(201).json({
            success: true,
            message: 'Utazás eltávolítva a bakancslistáról'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}