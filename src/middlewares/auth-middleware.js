const passport = require('passport')

exports.authCustomer = passport.authenticate('jwt-customer', { session: false })
exports.authEmployee = passport.authenticate('jwt-employee', { session: false })
exports.authManager = passport.authenticate('jwt-manager', { session: false })