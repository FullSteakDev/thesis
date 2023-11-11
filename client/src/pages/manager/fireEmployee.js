import { useState } from "react"
import { Link } from "react-router-dom"
import { fireEmployee } from "../../api/authApi"
import { useParams } from "react-router-dom";
import '../manager/style/manager.css'

const FireEmployee = () => {
    const { employeeId, employeeLast } = useParams();

      const [error, setError] = useState(false)
      const [succes, setSucces] = useState(false)
  
      const onSubmit = async (e) => {
        e.preventDefault()
  
        try{
            const { data } = await fireEmployee(employeeId)         
          setError('')
          setSucces(data.message)
        } catch (error) {
          setError(error.response.data.errors)
          setSucces('')
        }
      }
    return (
        <div className="manager-login">
        <form onSubmit={onSubmit} className="manager-box">
            <h2>Alkalmazott kirúgása</h2>
            <p>Biztos megszűnteti</p>
            <h3>{employeeLast}</h3>
            <p>szerződését?</p>

            {error && <div className="error-message">{error}</div>}

            {succes && <div className="error-message">{succes}</div>}

            <button type="submit">Megszűntetés</button>
                <button><Link to="/getemployees">Vissza</Link></button>
            </form>
        </div>
    )
}

export default FireEmployee