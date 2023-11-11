import { fetchProjectstoManagement } from "../../api/authApi"
import { useEffect, useState } from 'react'
import '../manager/style/manager.css'
import { NavLink } from 'react-router-dom'


const GetProjects = () => {

    const [protectedprojectsManagement, setProjectsManagement] = useState(null)
    const [loading, setLoading] = useState(true)

    const projectManagement = async () => {
        try {
          const { data } = await fetchProjectstoManagement();
          const sortedProjects = data.project.sort((a, b) => {
            const deadlineA = new Date(a.deadline);
            const deadlineB = new Date(b.deadline);
            return deadlineA - deadlineB;
          })

          setProjectsManagement(sortedProjects);
          setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    projectManagement()
  }, []);

  return loading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
        <div className='manager'>
        {protectedprojectsManagement.map((project, index) => (
          <div key={index} className="manager-box">
            <h1 className="project-title">{project.title}</h1>
            <p className="project-email">{project.employee_email}</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${project.progress}%`,
                }}
                data-progress={project.progress}
              >
                {project.progress}%
              </div>
            </div>
            <p className="project-deadline">{project.deadline}</p>
            <div className='managerprojects-links'>
              <button><NavLink to={`/editproject/${project.id}/${project.employee_email}/${project.progress}/${project.title}/${project.date}/${project.deadline}`}>Projekt szerkesztése</NavLink></button>
              <button><NavLink to={`/deleteproject/${project.id}/${project.title}`}>Projekt törlése</NavLink></button>
            </div>
          </div>
        ))}
        <div className='manager-box'>
          <NavLink to={'/protectedmanager'} className='manager-routes-style'>Vissza</NavLink>
        </div>
      </div>
    )
}

export default GetProjects