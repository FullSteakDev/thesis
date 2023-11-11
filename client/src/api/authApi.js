import axios from 'axios'
axios.defaults.withCredentials = true


// customer
export async function onRegistrationCustomer(registrationDataCustomer) {
    return await axios.post('/register-customers', registrationDataCustomer)
}

export async function onLoginCustomer(LoginDataCustomer) {
    return await axios.post('/login-customers', LoginDataCustomer)
}

export async function fetchProtectedCustomer() {
    return await axios.get('/protected-customers')
}

export async function fetchProducts() {
    return await axios.get('/products')
}

export async function fetchProductsCustomer() {
    return await axios.get('/products-customer')
}

export async function reserveProductsCustomer(name, description, price, material) {
    return await axios.post(`/reserve-products/${name}/${description}/${price}/${material}`)
}

export async function removeProduct(Id) {
    return await axios.delete(`/remove-product/${Id}`)
}

export async function fetchTravels() {
    return await axios.get('/travels')
}

export async function fetchTravelsCustomer() {
    return await axios.get('/travels-customer')
}

export async function reserveTravelsCustomer(name, departure, destination, date, price, length) {
    return await axios.post(`/reserve-travels/${name}/${departure}/${destination}/${date}/${price}/${length}`)
}

export async function removeTravel(Id) {
    return await axios.delete(`/remove-travel/${Id}`)
}


// employee
export async function onLoginEmployee(LoginDataEmployee) {
    return await axios.post('login-employees', LoginDataEmployee)
}

export async function fetchProtectedEmployee() {
    return await axios.get('/protected-employees')
}

export async function fetchProjectsEmployee() {
    return await axios.get('/projects-employee')
}

export async function editProgressEmployee(ProgressEmployee) {
    return await axios.put('/progress-employee', ProgressEmployee);
}
  

// management
export async function onLoginManager(LoginDataManager) {
    return await axios.post('/login-managers', LoginDataManager)
}

export async function fetchProtectedManager() {
    return await axios.get('/protected-managers')
}

export async function fetchEmployeestoManagement() {
    return await axios.get('/get-employees')
}

export async function promoteEmployee(PromoteEmployee) {
    return await axios.put('/promote-employee', PromoteEmployee)
}

export async function fireEmployee(employeeId) {
    return await axios.delete(`/fire-employee/${employeeId}`)
}

export async function fetchTools() {
    return await axios.get('/tools')
}

export async function fetchEquipments() {
    return await axios.get('/equipments')
}

export async function fetchVehicles() {
    return await axios.get('/vehicles')
}

export async function editAmortisation(EditAmortisation) {
    return await axios.put('/edit-amortisation', EditAmortisation)
}

export async function deleteProperties(Id) {
    return await axios.delete(`/delete-properties/${Id}`)
}

export async function fetchProjectstoManagement() {
    return await axios.get('/get-projects')
}

export async function createProjectstoEmployee(CreateEmployeeProjects) {
    return await axios.post('/create-projects', CreateEmployeeProjects)
}

export async function editProjects(EditProjects) {
    return await axios.put('/edit-projects', EditProjects)
}

export async function deleteProjectsMan(projectId) {
    return await axios.delete(`/delete-projects/${projectId}`)
}


// all
export async function onLogout() {
    return await axios.get('/logout')
}