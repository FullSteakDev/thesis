import { useEffect, useState, React } from 'react'
import { useDispatch } from 'react-redux'
import { fetchEmployeestoManagement, onLogout } from '../../api/authApi'
import { unauthenticateCustomer } from '../../redux/slices/authSlice'
import { NavLink } from "react-router-dom"
import "../manager/style/manager.css"


const GetEmployees = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedGetEmployees, setProtectedGetEmployees] = useState(null)

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateCustomer())
    } catch (error) {
      console.log(error.response)
    }
  }

  const protectedgetemployeees = async () => {
    try {
      const { data } = await fetchEmployeestoManagement()

      setProtectedGetEmployees(data.employees)

      setLoading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    protectedgetemployeees()
  }, [])

  return loading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div className='manager'>
    {protectedGetEmployees.map((employees, index) => (
        <div key={index} className="manager-box">
           <img src={require(`../../images/${employees.image}`)} alt="employee" />
          <h1 className="project-title">{employees.first_name}</h1>
          <h1 className="project-title">{employees.last_name}</h1>
          <p className="project-title">{employees.email}</p>
          <button><NavLink to={`/createprojects/${employees.email}`}>Projekt kiosztása</NavLink></button>
          <button><NavLink to={`/promoteemployee/${employees.employee_id}/${employees.last_name}/${employees.employee_level}`}>{employees.last_name} előléptetése</NavLink></button>
          <button><NavLink to={`/fireemployee/${employees.employee_id}/${employees.last_name}`}>{employees.last_name} kirúgása</NavLink></button>
        </div>
    ))}
    <div className='manager-box'>
      <NavLink to={'/protectedmanager'} className='manager-routes-style'>Vissza</NavLink>
    </div>
    </div>
  )
}

export default GetEmployees