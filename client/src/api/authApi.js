import axios from 'axios'
axios.defaults.withCredentials = true


// customer
export async function onRegistrationCustomer(registrationDataCustomer) {
    return await axios.post('http://localhost:8000/api/register-customers', registrationDataCustomer)
}

export async function onLoginCustomer(LoginDataCustomer) {
    return await axios.post('http://localhost:8000/api/login-customers', LoginDataCustomer)
}

export async function fetchProtectedCustomer() {
    return await axios.get('http://localhost:8000/api/protected-customers')
}

export async function fetchProducts() {
    return await axios.get('http://localhost:8000/api/products')
}

export async function fetchProductsCustomer() {
    return await axios.get('http://localhost:8000/api/products-customer')
}

export async function reserveProductsCustomer(name, description, price, material) {
    return await axios.post(`http://localhost:8000/api/reserve-products/${name}/${description}/${price}/${material}`)
}

export async function removeProduct(Id) {
    return await axios.delete(`http://localhost:8000/api/remove-product/${Id}`)
}

export async function fetchTravels() {
    return await axios.get('http://localhost:8000/api/travels')
}

export async function fetchTravelsCustomer() {
    return await axios.get('http://localhost:8000/api/travels-customer')
}

export async function reserveTravelsCustomer(name, departure, destination, date, price, length) {
    return await axios.post(`http://localhost:8000/api/reserve-travels/${name}/${departure}/${destination}/${date}/${price}/${length}`)
}

export async function removeTravel(Id) {
    return await axios.delete(`http://localhost:8000/api/remove-travel/${Id}`)
}


// employee
export async function onLoginEmployee(LoginDataEmployee) {
    return await axios.post('http://localhost:8000/api/login-employees', LoginDataEmployee)
}

export async function fetchProtectedEmployee() {
    return await axios.get('http://localhost:8000/api/protected-employees')
}

export async function fetchProjectsEmployee() {
    return await axios.get('http://localhost:8000/api/projects-employee')
}

export async function editProgressEmployee(ProgressEmployee) {
    return await axios.put('http://localhost:8000/api/progress-employee', ProgressEmployee);
}
  

// management
export async function onLoginManager(LoginDataManager) {
    return await axios.post('http://localhost:8000/api/login-managers', LoginDataManager)
}

export async function fetchProtectedManager() {
    return await axios.get('http://localhost:8000/api/protected-managers')
}

export async function fetchEmployeestoManagement() {
    return await axios.get('http://localhost:8000/api/get-employees')
}

export async function promoteEmployee(PromoteEmployee) {
    return await axios.put('http://localhost:8000/api/promote-employee', PromoteEmployee)
}

export async function fireEmployee(employeeId) {
    return await axios.delete(`http://localhost:8000/api/fire-employee/${employeeId}`)
}

export async function fetchTools() {
    return await axios.get('http://localhost:8000/api/tools')
}

export async function fetchEquipments() {
    return await axios.get('http://localhost:8000/api/equipments')
}

export async function fetchVehicles() {
    return await axios.get('http://localhost:8000/api/vehicles')
}

export async function editAmortisation(EditAmortisation) {
    return await axios.put('http://localhost:8000/api/edit-amortisation', EditAmortisation)
}

export async function deleteProperties(Id) {
    return await axios.delete(`http://localhost:8000/api/delete-properties/${Id}`)
}

export async function fetchProjectstoManagement() {
    return await axios.get('http://localhost:8000/api/get-projects')
}

export async function createProjectstoEmployee(CreateEmployeeProjects) {
    return await axios.post('http://localhost:8000/api/create-projects', CreateEmployeeProjects)
}

export async function editProjects(EditProjects) {
    return await axios.put('http://localhost:8000/api/edit-projects', EditProjects)
}

export async function deleteProjectsMan(projectId) {
    return await axios.delete(`http://localhost:8000/api/delete-projects/${projectId}`)
}


// all
export async function onLogout() {
    return await axios.get('http://localhost:8000/api/logout')
}