import { useState } from "react"
import{ onLoginEmployee } from '../../api/authApi'
import { useDispatch } from 'react-redux'
import { authenticateCustomer } from "../../redux/slices/authSlice"
import { Link } from "react-router-dom"
import '../employee/style/employee.css'

const LoginEmployee = () => {
    const [values, setValues] = useState({
      email:'',
      password: ''
    })
    const [error, setError] = useState(false)

    const onChange = (e) => {
      setValues({...values, [e.target.name]: e.target.value})
    }

    const dispatch = useDispatch()
    const onSubmit = async (e) => {
      e.preventDefault()

      try{
        await onLoginEmployee(values)
        dispatch(authenticateCustomer())

        localStorage.setItem('isAuth', true)
      }catch (error) {
        console.log(error.response.data.errors[0].msg)
        setError(error.response.data.errors[0].msg)
      }
    }

    return (
      <div className="employee-login">
      <form onSubmit={onSubmit} className="employee-box">
          <h1>Alkalmazott bejelentkezés</h1>

          <div>
            <label htmlFor="email">Email cím</label>
            <input
              onChange={onChange}
              type="email"
              id="email"
              name="email"
              value={values.email}
              placeholder="test@gmail.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Jelszó</label>
            <input
              onChange={onChange}
              type="password"
              id="password"
              name="password"
              value={values.password}
              placeholder="Jelszó123"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit">Tovább</button>
          <button><Link to="/">Vissza a kezdőlapra</Link></button>
        </form>
        </div>
    )
  }
  
  export default LoginEmployee