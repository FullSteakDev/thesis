import { fetchEquipments } from "../../api/authApi"
import { useEffect, useState } from 'react'
import '../manager/style/manager.css'
import { NavLink } from 'react-router-dom'


const GetEquipments = () => {

    const [protectedEquipmentsManagement, setEquipmentManagement] = useState(null)
    const [loading, setLoading] = useState(true)

    const equipmentManagement = async () => {
        try {
          const { data } = await fetchEquipments();
          setEquipmentManagement(data.equipments)
          setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    equipmentManagement()
  }, []);

  return loading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
        <div className='manager'>
        {protectedEquipmentsManagement.map((equipments, index) => (
          <div key={index} className="manager-box">
            <h1 className="project-title">Felszerelés neve: {equipments.name}</h1>
            <p className="project-email">Felszerelés állapota: {equipments.state}</p>
            <p className="project-email">⬇️ Amortizáció ⬇️</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${equipments.amortisation}%`,
                }}
                data-progress={equipments.amortisation}
              >
                {equipments.amortisation}%
              </div>
            </div>
            <p className="project-emial">{equipments.age} éve használatban</p>
            <div className='managerprojects-links'>
              <button><NavLink to={`/edit-equipment-amortisation/${equipments.id}/${equipments.amortisation}`}>Amortizáció szerkesztése</NavLink></button>
              <button><NavLink to={`/delete-equipment/${equipments.id}/${equipments.name}`}>Felszerelés törlése</NavLink></button>
            </div>
          </div>
        ))}
        <div className='manager-box'>
          <NavLink to={'/protectedmanager'} className='manager-routes-style'>Vissza</NavLink>
        </div>
      </div>
    )
}

export default GetEquipments