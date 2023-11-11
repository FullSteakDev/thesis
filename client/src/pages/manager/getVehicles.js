import { fetchVehicles } from "../../api/authApi"
import { useEffect, useState } from 'react'
import '../manager/style/manager.css'
import { NavLink } from 'react-router-dom'


const GetVehicles = () => {

    const [protectedVehiclesManagement, setVehicleManagement] = useState(null)
    const [loading, setLoading] = useState(true)

    const vehicleManagement = async () => {
        try {
          const { data } = await fetchVehicles();
          setVehicleManagement(data.vehicles)
          setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    vehicleManagement()
  }, []);

  return loading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
        <div className='manager'>
        {protectedVehiclesManagement.map((vehicles, index) => (
          <div key={index} className="manager-box">
            <h1 className="project-title">Jármű neve: {vehicles.name}</h1>
            <p className="project-email">Jármű állapota: {vehicles.state}</p>
            <p className="project-email">⬇️ Amortizáció ⬇️</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${vehicles.amortisation}%`,
                }}
                data-progress={vehicles.amortisation}
              >
                {vehicles.amortisation}%
              </div>
            </div>
            <p className="project-emial">{vehicles.age} éve használatban</p>
            <div className='managerprojects-links'>
              <button><NavLink to={`/edit-vehicle-amortisation/${vehicles.id}/${vehicles.amortisation}`}>Amortizáció szerkesztése</NavLink></button>
              <button><NavLink to={`/delete-vehicle/${vehicles.id}/${vehicles.name}`}>Jármű törlése</NavLink></button>
            </div>
          </div>
        ))}
        <div className='manager-box'>
          <NavLink to={'/protectedmanager'} className='manager-routes-style'>Vissza</NavLink>
        </div>
      </div>
    )
}

export default GetVehicles