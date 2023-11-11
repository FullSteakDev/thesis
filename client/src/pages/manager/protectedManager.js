import { useEffect, useState, React } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedManager, onLogout } from '../../api/authApi'
import { unauthenticateCustomer } from '../../redux/slices/authSlice'
import { NavLink } from "react-router-dom"
import "../../style/loginroutes.css"

const ProtectedManager = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedDataManager, setProtectedManager] = useState(null)

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateCustomer())
    } catch (error) {
      console.log(error.response)
    }
  }

  const protectedManager = async () => {
    try {
      const { data } = await fetchProtectedManager()

      setProtectedManager(data.info)

      setLoading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    protectedManager()
  }, [])

  return loading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div className="manager">
      <div className="manager-links">
        <div className="manager-box">
          <div className="manager-routes">
            <NavLink to="/getemployees" className="manager-routes-style">
              <span>Alkalmazottak</span>
            </NavLink>
          </div>
        </div>

        <div className="manager-box">
          <div className="manager-routes">
            <NavLink to="/getequipments" className="manager-routes-style">
              <span>Felszerelések</span>
            </NavLink>
          </div>
        </div>

        <div className="manager-box">
          <div className="manager-routes">
            <NavLink to="/getvehicles" className="manager-routes-style">
              <span>Járművek</span>
            </NavLink>
          </div>
        </div>

        <div className="manager-box">
          <div className="manager-routes">
            <NavLink to="/gettools" className="manager-routes-style">
              <span>Eszközök</span>
            </NavLink>
          </div>
        </div>

        <div className="manager-box">
          <div className="manager-routes">
            <NavLink to="/getprojects" className="manager-routes-style">
              <span>Projektek</span>
            </NavLink>
          </div>
        </div>

        <div className="manager-box">
          <div className="manager-routes">
            <NavLink to="/" className="manager-routes-style">
              <span>Vissza a kezdőlapra</span>
            </NavLink>
          </div>
        </div>
        <div className="">
          <div className="manager-routes">
            <NavLink onClick={() => logout()} className='manager-routes-style'>Kijelentkezés</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProtectedManager