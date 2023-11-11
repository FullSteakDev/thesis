import { useState } from "react"
import{ onRegistrationCustomer } from '../../api/authApi'
import '../customer/style/customer.css'
import { Link } from "react-router-dom"

const RegisterCustomer = () => {
    const [values, setValues] = useState({
      email:'',
      password: '',
      first_name: '',
      last_name: ''
    })
    const [error, setError] = useState(false)
    const [succes, setSucces] = useState(false)

    const onChange = (e) => {
      setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
      e.preventDefault()

      try{
        const {data} = await onRegistrationCustomer(values)
        
        
        setError('')
        setSucces(data.message)
        setValues({ email: '', password: '', first_name: '', last_name: '' })
      } catch (error) {
        setError(error.response.data.errors[0].msg)
        setSucces('')
      }
    }

    return (
      <div className="customer-login">
        <form onSubmit={(e) => onSubmit(e)} className="customer-box">
          <h1>Felhasználó regisztrálása</h1>

          <div>
            <label htmlFor="email">Email cím</label>
            <input 
              onChange={(e) => onChange(e)}
              type='email'
              id='email'
              name='email'
              value={values.email}
              placeholder= 'test@gmail.com'
              required
            />
          </div>

          <div>
            <label htmlFor="password">Jelszó</label>
            <input 
              onChange={(e) => onChange(e)}
              type='password'
              id='password'
              name='password'
              value={values.password}
              placeholder= 'Jelszó123'
              required
            />
          </div>

          <div>
            <label htmlFor="first_name">Vezeték név</label>
            <input 
              onChange={(e) => onChange(e)}
              type='name'
              id='first_name'
              name='first_name'
              value={values.first_name}
              placeholder= 'Vezetéknév'
              required
            />
          </div>

          <div>
            <label htmlFor="last_name">Kereszt név</label>
            <input 
              onChange={(e) => onChange(e)}
              type='name'
              id='last_name'
              name='last_name'
              value={values.last_name}
              placeholder= 'Keresztnév'
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {succes && <div className="error-message">{succes}</div>}

          <button type="submit">Tovább</button>
          <button><Link to="/">Vissza a kezdőlapra</Link></button>    
          </form>
      </div>
    )
  }
  
  export default RegisterCustomer