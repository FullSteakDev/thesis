import { useState } from "react"
import { Link } from "react-router-dom"
import { editProgressEmployee } from "../../api/authApi"
import "../employee/style/employee.css"
import { useParams } from "react-router-dom";



const EditProgress = () => {
    const { projectId } = useParams();

    const [values, setValues] = useState({
        projectId: projectId,
        progress: Number
      })

      const [error, setError] = useState(false)
      const [succes, setSucces] = useState(false)
  
      const onChange = (e) => {
        const inputProgress = e.target.value;
      
        if (inputProgress === '') {
          setValues({ ...values, progress: '' });
          setError('');
        } else if (!isNaN(inputProgress)) {
          const progress = parseInt(inputProgress, 10);
      
          if (progress >= 0 && progress <= 100) {
            setValues({ ...values, progress });
            setError('');
          } else {
            setError('Az előrehaladás 0 és 100 közötti érték lehet.');
          }
        }
      }
      
  
      const onSubmit = async (e) => {
        e.preventDefault()
  
        try{
            const { data } = await editProgressEmployee({
                projectId: projectId,
                progress: values.progress
              });
          
          
          setError('')
          setSucces(data.message)
          setValues({ progress: ''})
        } catch (error) {
          setError(error.response.data.errors)
          setSucces('')
        }
      }
    return (
    <div className="employee-login">
      <form onSubmit={onSubmit} className="employee-box">
          <h1>Előrehaladás módosítása</h1>

          <div>
            <label htmlFor="progress">Előrehaladás</label>
            <input
              onChange={onChange}
              type="number"
              id="progress"
              name="progress"
              value={values.progress}
              placeholder="0 - 100%"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          {succes && <div className="error-message">{succes}</div>}

          <button type="submit">Módosítás</button>
            <button><Link to="/projectsemployee">Vissza a projektekhez</Link></button>
        </form>
    </div>
    )
}

export default EditProgress