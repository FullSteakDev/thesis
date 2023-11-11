import { useEffect, useState } from 'react'
import { fetchProjectsEmployee } from '../../api/authApi'
import './style/employee.css'
import { NavLink } from 'react-router-dom'

const ProjectsEmployee = () => {
  const [loading, setLoading] = useState(true)
  const [protectedprojectsEmployee, setProjectsEmployee] = useState(null)

  const projectEmployee = async () => {
    try {
      const { data } = await fetchProjectsEmployee();

      const sortedProjects = data.employees.sort((a, b) => {
        const deadlineA = new Date(a.deadline);
        const deadlineB = new Date(b.deadline);
        return deadlineA - deadlineB;
      });

      setProjectsEmployee(sortedProjects);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    projectEmployee()
  }, []);

  return loading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div className='employee'>
      {protectedprojectsEmployee.map((project, index) => (
        <div key={index} className="employee-box">
          <p className="project-title" style={{ textAlign: 'left' }}>{project.title}</p>
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
          <div className='projects-links'>
            <button><NavLink to={`/editprogress/${project.id}`}>Előrehaladás módosítása</NavLink></button>
          </div>
        </div>
      ))}
      <div className='employee-box'>
        <NavLink to={'/protectedemployee'} className='employee-routes-style'>Vissza</NavLink>
      </div>
    </div>
  );
}

export default ProjectsEmployee
