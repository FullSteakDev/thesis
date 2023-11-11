import { useState } from "react"
import { Link } from "react-router-dom"
import { deleteProperties } from "../../api/authApi"
import { useParams } from "react-router-dom";
import '../manager/style/manager.css'

const DeleteVehicles = () => {
    const { Id, vehicleName } = useParams();

      const [error, setError] = useState(false)
      const [succes, setSucces] = useState(false)
  
      const onSubmit = async (e) => {
        e.preventDefault()
  
        try{
            const { data } = await deleteProperties(Id)         
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
            <h1>Jármű eltávolítása</h1>
            <p>Biztos törölni szeretné a(z)</p>
            <h3>{vehicleName}</h3>
            <p>járművet?</p>

            {error && <div className="error-message">{error}</div>}

            {succes && <div className="error-message">{succes}</div>}

            <button type="submit">Törlés</button>
                <button><Link to="/getvehicles">Vissza</Link></button>
            </form>
        </div>
    )
}

export default DeleteVehicles