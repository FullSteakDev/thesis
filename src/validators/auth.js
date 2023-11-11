const { check } = require('express-validator')
const db = require('../db')
const { compare } = require('bcryptjs')

//password
const password = check('password').isLength({ min: 8, max: 30 })
.withMessage('A jelszónak 8 és 30 karakter közötti értéknek kell lennie')

//email
const email = check('email').isEmail().withMessage('Kérem érvényes email címet adjon meg')

//check if emails exists (customer)
const emailExistsCustomer = check('email').custom(async (value) => {
    const { rows } = await db.query('SELECT * from customers where email = $1', [
        value,
    ])

    if (rows.length) {
        throw new Error('A megadott email cím már létezik')
    }
})

//check if emails exists (employee)
const emailExistsEmployee = check('email').custom(async (value) => {
    const { rows } = await db.query('SELECT * from employee where email = $1', [
        value,
    ])

    if (rows.length) {
        throw new Error('A megadott email cím már létezik')
    }
})

//check if emails exists (management)
const emailExistsManager = check('email').custom(async (value) => {
    const { rows } = await db.query('SELECT * from management where email = $1', [
        value,
    ])

    if (rows.length) {
        throw new Error('A megadott email cím már létezik')
    }
})

//login validation (customer)
const loginFieldsCheckCustomer = check('email').custom(async (value, { req }) => {
    const customer = await db.query('SELECT * from customers where email = $1', [value])
    if (!customer.rows.length) {
        throw new Error('Nincs ilyen email cím')
    }

    const validPassword = await compare(req.body.password, customer.rows[0].password_hash)

    if (!validPassword) {
        throw new Error ('Helytelen jelszó')
    }

    req.customer = customer.rows[0]
})

//login validation (employee)
const loginFieldsCheckEmployee = check('email').custom(async (value, { req }) => {
    const employee = await db.query('SELECT * from employee where email = $1', [value])
    if (!employee.rows.length) {
        throw new Error('Nincs ilyen email cím')
    }

    const validPassword = await compare(req.body.password, employee.rows[0].password_hash)

    if (!validPassword) {
        throw new Error ('Helytelen jelszó')
    }

    req.employee = employee.rows[0]
})

//login validation (management)
const loginFieldsCheckManager = check('email').custom(async (value, { req }) => {
    const management = await db.query('SELECT * from management where email = $1', [value])
    if (!management.rows.length) {
        throw new Error('Nincs ilyen email cím')
    }

    const validPassword = await compare(req.body.password, management.rows[0].password_hash)

    if (!validPassword) {
        throw new Error ('Helytelen jelszó')
    }

    req.management = management.rows[0]
})


module.exports = {
    loginValidationCustomer: [loginFieldsCheckCustomer],
    loginValidationEmployee: [loginFieldsCheckEmployee],
    loginValidationManager: [loginFieldsCheckManager],
    registerValidation: [email, emailExistsCustomer, emailExistsEmployee, emailExistsManager, password]
}