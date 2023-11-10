const { Router } = require('express')
const { registerCustomers, getEmployees, registerEmployees, registerManagers, loginCustomers, logout, loginEmployees, loginManagers, protectedCustomer, protectedEmployee, protectedManager, promoteEmployee, fireEmployee } = require('../controllers/auth')
const { loginValidationEmployee, loginValidationCustomer, loginValidationManager, registerValidation } = require('../validators/auth')
const { validationMiddleware } = require('../middlewares/validations-middlewares')
const { authCustomer, authEmployee, authManager } = require('../middlewares/auth-middleware')
const { getProjectEmployee, createProjects, deleteProjects, editProgressProjects, editProjects, getProjectManager } = require('../project/project')
const { getTools, getVehicles, getEquipments, deleteProperties, editAmortisation } = require('../properties/properties')
const { getProducts, getProductsCustomer, removeProducts, reserveProducts } = require('../products/products')
const { getTravels, getTravelsCustomer, removeTravels, reserveTravels } = require('../travels/travels')
const router = Router()

//customer routes
router.post('/register-customers', registerValidation, validationMiddleware, registerCustomers)
router.post('/login-customers', loginValidationCustomer, validationMiddleware, loginCustomers)
router.get('/protected-customers',authCustomer, protectedCustomer)
router.get('/products',authCustomer, getProducts)
router.get('/products-customer',authCustomer, getProductsCustomer)
router.post('/reserve-products/:name/:description/:price/:material', authCustomer, reserveProducts)
router.delete('/remove-product/:Id', authCustomer, removeProducts)
router.get('/travels',authCustomer, getTravels)
router.get('/travels-customer',authCustomer, getTravelsCustomer)
router.post('/reserve-travels/:name/:departure/:destination/:date/:price/:length', authCustomer, reserveTravels)
router.delete('/remove-travel/:Id', authCustomer, removeTravels)

//employee routes
router.post('/register-employees', registerValidation, validationMiddleware, registerEmployees)
router.post('/login-employees', loginValidationEmployee, validationMiddleware, loginEmployees)
router.get('/protected-employees',authEmployee, protectedEmployee)
router.get('/projects-employee', authEmployee, getProjectEmployee)
router.put('/progress-employee', authEmployee, editProgressProjects);

//management routes
router.post('/register-managers', registerValidation, validationMiddleware, registerManagers)
router.post('/login-managers', loginValidationManager, validationMiddleware, loginManagers)
router.get('/protected-managers',authManager, protectedManager)

//employee stuff
router.get('/get-employees', authManager, getEmployees)
router.put('/promote-employee', authManager, promoteEmployee)
router.delete('/fire-employee/:employeeId', authManager, fireEmployee)

//projects
router.get('/get-projects', authManager, getProjectManager)
router.post('/create-projects', authManager, createProjects)
router.put('/edit-projects', authManager, editProjects)
router.delete('/delete-projects/:projectId', authManager, deleteProjects)

//properties
router.get('/tools', authManager, getTools)
router.get('/equipments', authManager, getEquipments)
router.get('/vehicles', getVehicles)
router.put('/edit-amortisation', authManager, editAmortisation)
router.delete('/delete-properties/:Id', authManager, deleteProperties)


router.get('/logout', logout)

module.exports = router