import { BrowserRouter, Navigate, Routes, Route, Outlet } from 'react-router-dom'
import RegisterCustomer from './pages/customer/registerCustomer'
import LoginCustomer from './pages/customer/loginCustomer'
import { useSelector } from 'react-redux'
import ProtectedCustomer from './pages/customer/protectedCustomer'
import LoginManager from './pages/manager/loginManager'
import LoginEmployee from './pages/employee/loginEmployee'
import ProtectedEmployee from './pages/employee/protectedEmployee'
import ProtectedManager from './pages/manager/protectedManager'
import React from 'react'
import Login from './pages/login'
import Home from './pages/home'
import ProjectsEmployee from './pages/employee/projectEmp'
import EditProgress from './pages/employee/editProgress'
import GetEmployees from './pages/manager/getEmployees'
import CreateEmpProjects from './pages/manager/createEmpProjects'
import GetProjects from './pages/manager/getProjects'
import EditProjectMan from './pages/manager/editProject'
import DeleteProject from './pages/manager/deleteProjects'
import FireEmployee from './pages/manager/fireEmployee'
import PromoteEmployee from './pages/manager/promoteEmployee'
import GetTools from './pages/manager/getTools'
import EditToolAmortisation from './pages/manager/editTool'
import DeleteTool from './pages/manager/deleteTools'
import GetEquipments from './pages/manager/getEquipments'
import EditEquipmentAmortisation from './pages/manager/editEquipment'
import DeleteEquipments from './pages/manager/deleteEquipment'
import GetVehicles from './pages/manager/getVehicles'
import DeleteVehicles from './pages/manager/deleteVehicles'
import EditVehicleAmortisation from './pages/manager/editVehicle'
import GetTravels from './pages/customer/travels'
import GetProducts from './pages/customer/products'
import ReserveTravels from './pages/customer/reserveTravels'
import ReserveProducts from './pages/customer/reserveProducts'
import Basket from './pages/customer/basket'
import BucketList from './pages/customer/bucketList'
import RemoveTravel from './pages/customer/deleteTravel'
import RemoveProduct from './pages/customer/deleteProduct'
import Pay from './pages/customer/pay'


const PrivateRoutesCustomer = () => {
  const {isAuth} = useSelector(state => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/logincustomer' />} </>
}

const PrivateRoutesEmployee = () => {
  const {isAuth} = useSelector(state => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/loginemployee' />} </>
}

const PrivateRoutesManager = () => {
  const {isAuth} = useSelector(state => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/loginmanager' />} </>
}

const RestrictedRoutesCustomer = () => {
  const {isAuth} = useSelector(state => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/protectedcustomer' />} </>
}

const RestrictedRoutesEmployee = () => {
  const {isAuth} = useSelector(state => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/protectedemployee' />} </>
}

const RestrictedRoutesManager = () => {
  const {isAuth} = useSelector(state => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/protectedmanager' />} </>
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loginroutes' element={<Login />} />

        <Route element ={<PrivateRoutesCustomer />} >
          <Route path='/protectedcustomer' element={<ProtectedCustomer />} />
          <Route path='/travels' element={<GetTravels />} />
          <Route path='/products' element={<GetProducts />} />
          <Route path='/reservedproducts' element={<Basket />} />
          <Route path='/reservedtravels' element={<BucketList />} />
          <Route path='/reserve-travel/:name/:departure/:destination/:date/:price/:length' element={<ReserveTravels />} />
          <Route path='/reserve-product/:name/:description/:price/:material' element={<ReserveProducts />} />
          <Route path='/delete-travel/:Id/:name' element={<RemoveTravel />} />
          <Route path='/delete-product/:Id/:name' element={<RemoveProduct />} />
          <Route path='/pay' element={<Pay />} />
        </Route>

        <Route element ={<RestrictedRoutesCustomer />} >
          <Route path='/registercustomer' element={<RegisterCustomer />} />
          <Route path='/logincustomer' element={<LoginCustomer />} />
        </Route>

        <Route element ={<PrivateRoutesEmployee />} >
          <Route path='/protectedemployee' element={<ProtectedEmployee/>} />
          <Route path='/projectsemployee' element={<ProjectsEmployee />} />
          <Route path="/editprogress/:projectId" element={<EditProgress />} />
        </Route>

        <Route element ={<RestrictedRoutesEmployee />} >
          <Route path='/loginemployee' element={<LoginEmployee />} />
        </Route>

        <Route element ={<PrivateRoutesManager />} >
          <Route path='/protectedmanager' element={<ProtectedManager/>} />
          <Route path='/getemployees' element={<GetEmployees/>} />
          <Route path='/promoteemployee/:employeeId/:employeeLast/:employee_level' element={<PromoteEmployee/>} />
          <Route path='/fireemployee/:employeeId/:employeeLast' element={<FireEmployee/>} />
          <Route path='/createprojects/:employeeEmail' element={<CreateEmpProjects/>} />
          <Route path='/getprojects' element={<GetProjects/>} />
          <Route path='/editproject/:projectId/:projectEmployee_email/:projectProgress/:projectTitle/:projectDate/:projectDeadline' element={<EditProjectMan/>} />
          <Route path='/deleteproject/:projectId/:projectTitle' element={<DeleteProject/>} />
          <Route path='/gettools' element={<GetTools/>} />
          <Route path='/edit-tool-amortisation/:Id/:amortisation' element={<EditToolAmortisation/>} />
          <Route path='/delete-tool/:Id/:toolName' element={<DeleteTool/>} />



          <Route path='/getequipments' element={<GetEquipments/>} />
          <Route path='/edit-equipment-amortisation/:Id/:amortisation' element={<EditEquipmentAmortisation/>} />
          <Route path='/delete-equipment/:Id/:equipmentName' element={<DeleteEquipments/>} />



          <Route path='/getvehicles' element={<GetVehicles/>} />
          <Route path='/edit-vehicle-amortisation/:Id/:amortisation' element={<EditVehicleAmortisation/>} />
          <Route path='/delete-vehicle/:Id/:vehicleName' element={<DeleteVehicles/>} />
        </Route>

        <Route element ={<RestrictedRoutesManager />} >
          <Route path='/loginmanager' element={<LoginManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App