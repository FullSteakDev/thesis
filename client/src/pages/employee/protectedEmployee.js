import { useEffect, useState, React } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedEmployee, onLogout } from '../../api/authApi'
import { unauthenticateCustomer } from '../../redux/slices/authSlice'
import { NavLink } from "react-router-dom";
import "../employee/style/employee.css";

const ProtectedEmployee = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedDataEmployee, setProtectedEmployee] = useState(null)

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateCustomer())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }

  const protectedEmployee = async () => {
    try {
      const { data } = await fetchProtectedEmployee()

      setProtectedEmployee(data.info)

      setLoading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    protectedEmployee()
  }, [])

  return loading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div className="employee-login">
      <div className="employee-links">
        <div className="employee-box">
          <div className="employee-routes">
            <NavLink to="/projectsemployee" className="employee-routes-style">
              <span>Projektek megtekintése</span>
            </NavLink>
          </div>
        </div>

        <div className="employee-box">
          <div className="employee-routes">
            <NavLink to="/" className="employee-routes-style">
              <span>Vissza a kezdőlapra</span>
            </NavLink>
          </div>
        </div>
        <div className="employee-routes">
          <NavLink onClick={() => logout()} className='employee-routes-style'>Kijelentkezés</NavLink>
        </div>
      </div>
    </div>
  )
}

export default ProtectedEmployee