const db = require('../db')
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { SECRET } = require('../constants')

// customer
exports.registerCustomers = async (req,res) => {
    const {email, password, first_name, last_name} = req.body
    try {
        const hashedPassword = await hash(password, 10)

        await db.query('insert into customers(email, password_hash, first_name, last_name) values ($1, $2, $3, $4)', [email, hashedPassword, first_name, last_name])

        return res.status(201).json({
            success: true,
            message: 'A regisztráció sikeres volt'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.loginCustomers = async (req,res) => {
    let customer = req.customer
    let payload = {
        id: customer.customer_id,
        email: customer.email
    }

    try {
        const token = await sign(payload, SECRET)
        return res.status(200).cookie('token', token, {httpOnly: true}).json ({
            succes: true,
            message: 'Bejelentkezve'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.protectedCustomer = async (req,res) => {
    try {
        return res.status(200).json({
            info: 'protected info for customers',
        })
    } catch (error) {
        console.log(error.message)
    }
}

// employee
exports.registerEmployees = async (req,res) => {
    const {email, password, first_name, last_name} = req.body
    try {
        const hashedPassword = await hash(password, 10)

        await db.query('insert into employee(email, password_hash, first_name, last_name) values ($1, $2, $3, $4)', [email, hashedPassword, first_name, last_name])

        return res.status(201).json({
            success: true,
            message: 'A regisztráció sikeres volt'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.loginEmployees = async (req,res) => {
    let employee = req.employee
    let payload = {
        id: employee.employee_id,
        email: employee.email
    }

    try {
        const token = await sign(payload, SECRET)
        return res.status(200).cookie('token', token, {httpOnly: true}).json ({
            succes: true,
            message: 'Logged in'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.protectedEmployee = async (req,res) => {
    try {
        return res.status(200).json({
            info: 'protected info for employees',
        })
    } catch (error) {
        console.log(error.message)
    }
}

//management
exports.registerManagers = async (req,res) => {
    const {email, password, first_name, last_name} = req.body
    try {
        const hashedPassword = await hash(password, 10)

        await db.query('insert into management(email, password_hash, first_name, last_name) values ($1, $2, $3, $4)', [email, hashedPassword, first_name, last_name])

        return res.status(201).json({
            success: true,
            message: 'A regisztráció sikeres volt'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.loginManagers = async (req,res) => {
    let management = req.management
    let payload = {
        id: management.manager_id,
        email: management.email
    }

    try {
        const token = await sign(payload, SECRET)

        return res.status(200).cookie('token', token, {httpOnly: true}).json ({
            succes: true,
            message: 'Logged in'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.protectedManager = async (req,res) => {
    try {
        return res.status(200).json({
            info: 'protected info for managers',
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.getEmployees = async (req, res) => {  
    try {
        const managerId = req.user.id;

        const { rows } = await db.query('SELECT employee_id, employee_level, first_name, last_name, email, image FROM employee WHERE manager_relation = $1', [managerId]);

        return res.status(200).json({
            success: true,
            employees: rows
        });
    } catch (error) {
        console.log(error.message)
    }
}

exports.promoteEmployee = async (req, res) => {
    const { employeeId, employee_level } = req.body
    try {

        await db.query('update employee set employee_level = $1 WHERE employee_id = $2;', [employee_level, employeeId])
        
        return res.status(201).json({
            success: true,
            message: 'Alkalmazott előléptetve'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.fireEmployee = async (req, res) => {
    const {employeeId} = req.params
    try {

        await db.query('delete from employee where employee_id = $1', [employeeId])

        return res.status(201).json({
            success: true,
            message: 'Alkalmazott szerződése megszűntetve'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}



exports.logout = async (req,res) => {
    try {
        return res.status(200).clearCookie('token', {httpOnly: true}).json ({
            succes: true,
            message: 'Logged out'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}