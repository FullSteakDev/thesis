const passport = require('passport')
const { Strategy } = require('passport-jwt')
const { SECRET } = require('../constants')
const db = require('../db')

const cookieExtractor = function (req) {
    let token = null
    if (req && req.cookies) token = req.cookies['token']
    return token
}

const opts = {
    secretOrKey: SECRET,
    jwtFromRequest: cookieExtractor
}

passport.use(
    'jwt-customer',
    new Strategy(opts, async ({ id }, done) => {
        try{
            const { rows } = await db.query(
                'SELECT customer_id, email FROM customers WHERE customer_id = $1',
                [id]
            )

            if (!rows.length) {
                throw new Error('Protected info for logged in customers only')
              }

            let customer = { id: rows[0].customer_id, email: rows[0].email }

            return await done(null, customer)
        } catch (error) {
            console.log(error.message)
            done(null, false)
        }
    })
)

passport.use(
    'jwt-employee',
    new Strategy(opts, async ({ id }, done) => {
        try{
            const { rows } = await db.query(
                'SELECT employee_id, email FROM employee WHERE employee_id = $1',
                [id]
            )

            if (!rows.length) {
                throw new Error('Protected info for logged in employees only')
              }

            let employee = { id: rows[0].employee_id, email: rows[0].email }

            return await done(null, employee)
        } catch (error) {
            console.log(error.message)
            done(null, false)
        }
    })
)

passport.use(
    'jwt-manager',
    new Strategy(opts, async ({ id }, done) => {
        try{
            const { rows } = await db.query(
                'SELECT manager_id, email FROM management WHERE manager_id = $1',
                [id]
            )

                if (!rows.length) {
                throw new Error('Protected info for logged in managers only')
              }

            let management = { id: rows[0].manager_id, email: rows[0].email }

            return await done(null, management)
        } catch (error) {
            console.log(error.message)
            done(null, false)
        }
    })
)