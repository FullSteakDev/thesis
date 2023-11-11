import { useEffect, useState, React } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedCustomer, onLogout } from '../../api/authApi'
import { unauthenticateCustomer } from '../../redux/slices/authSlice'
import { NavLink } from "react-router-dom"
import "../customer/style/customer.css"

const ProtectedCustomer = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedCustomer] = useState(null)

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateCustomer())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }

  const protectedCustomer = async () => {
    try {
      const { data } = await fetchProtectedCustomer()

      setProtectedCustomer(data.info)

      setLoading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    protectedCustomer()
  }, [])

  return loading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div className="customer-login">
      <div className="customer-links">
        <div className="customer-box">
          <div className="customer-routes">
            <NavLink to="/travels" className="customer-routes-style">
              <span>Utazási lehetőségek</span>
            </NavLink>
          </div>
        </div>

        <div className="customer-box">
          <div className="customer-routes">
            <NavLink to="/products" className="customer-routes-style">
              <span>Termékek vásárlása</span>
            </NavLink>
          </div>
        </div>

        <div className="customer-box">
          <div className="customer-routes">
            <NavLink to="/reservedtravels" className="customer-routes-style">
              <span>Bakancslista</span>
            </NavLink>
          </div>
        </div>

        <div className="customer-box">
          <div className="customer-routes">
            <NavLink to="/reservedproducts" className="customer-routes-style">
              <span>Kosár</span>
            </NavLink>
          </div>
        </div>


          <div className="customer-routes">
            <NavLink to="/" className="customer-routes-style">
              <span>Vissza a kezdőlapra</span>
            </NavLink>
          </div>

        <div className="customer-routes">
          <NavLink onClick={() => logout()} className='customer-routes-style'>Kijelentkezés</NavLink>
        </div>
      </div>
    </div>
  )
}

export default ProtectedCustomer