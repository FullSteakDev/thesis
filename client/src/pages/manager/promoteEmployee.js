import { useState } from "react"
import { Link } from "react-router-dom"
import { promoteEmployee } from "../../api/authApi"
import { useParams } from "react-router-dom";
import '../manager/style/manager.css'

const PromoteEmployee = () => {
    const { employeeId, employeeLast, employee_level } = useParams();

    const [values, setValues] = useState({
        employeeId: employeeId,
        employee_level: employee_level
      })

      const [error, setError] = useState(false)
      const [succes, setSucces] = useState(false)
  
      const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
      }
  
      const onSubmit = async (e) => {
        e.preventDefault()
  
        try{
            const { data } = await promoteEmployee({
                employeeId: employeeId,
                employee_level: values.employee_level
              })          
          
          setError('')
          setSucces(data.message)
          setValues({ employee_level:''})
        } catch (error) {
          setError(error.response.data.errors)
          setSucces('')
        }
      }
    return (
        <div className="manager-login">
        <form onSubmit={onSubmit} className="manager-box">
            <h1>Alkalmazott előléptetése</h1>

            <div>
                <label htmlFor="employee_level">Alkalmazott jövőbeli pozíciója</label>
                <input
                onChange={onChange}
                type="string"
                id="employee_level"
                name="employee_level"
                value={values.employee_level}
                placeholder="2nd level"
                required
                />
            </div>

            {error && <div className="error-message">{error}</div>}

            {succes && <div className="error-message">{succes}</div>}

            <button type="submit">{employeeLast} előléptetése</button>
            <button><Link to="/getemployees">Vissza az alkalmazottakhoz</Link></button>
            </form>
        </div>
    )
}

export default PromoteEmployee