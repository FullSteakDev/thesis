import { fetchTools } from "../../api/authApi"
import { useEffect, useState } from 'react'
import '../manager/style/manager.css'
import { NavLink } from 'react-router-dom'


const GetTools = () => {

    const [protectedToolsManagement, setToolsManagement] = useState(null)
    const [loading, setLoading] = useState(true)

    const toolManagement = async () => {
        try {
          const { data } = await fetchTools();
          setToolsManagement(data.tools)
          setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    toolManagement()
  }, []);

  return loading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
        <div className='manager'>
        {protectedToolsManagement.map((tools, index) => (
          <div key={index} className="manager-box">
            <h1 className="project-title">Eszköz neve: {tools.name}</h1>
            <p className="project-email">Eszköz állapota: {tools.state}</p>
            <p className="project-email">⬇️ Amortizáció ⬇️</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${tools.amortisation}%`,
                }}
                data-progress={tools.amortisation}
              >
                {tools.amortisation}%
              </div>
            </div>
            <p className="project-emial">{tools.age} éve használatban</p>
            <div className='managerprojects-links'>
              <button><NavLink to={`/edit-tool-amortisation/${tools.id}/${tools.amortisation}`}>Amortizáció szerkesztése</NavLink></button>
              <button><NavLink to={`/delete-tool/${tools.id}/${tools.name}`}>Eszköz törlése</NavLink></button>
            </div>
          </div>
        ))}
        <div className='manager-box'>
          <NavLink to={'/protectedmanager'} className='manager-routes-style'>Vissza</NavLink>
        </div>
      </div>
    )
}

export default GetTools