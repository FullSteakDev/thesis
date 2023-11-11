import { useState } from "react";
import { Link } from "react-router-dom";
import { editProjects } from "../../api/authApi";
import { useParams } from "react-router-dom";
import '../manager/style/manager.css';

const EditProjectMan = () => {
  const { projectId, projectEmployee_email, projectProgress, projectTitle, projectDate, projectDeadline } = useParams();

  const [values, setValues] = useState({
    projectId: projectId,
    employee_email: projectEmployee_email,
    title: projectTitle,
    progress: projectProgress,
    date: projectDate,
    deadline: projectDeadline
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onEmailChange = (e) => {
    setValues({ ...values, employee_email: e.target.value });
  };

  const onTitleChange = (e) => {
    setValues({ ...values, title: e.target.value });
  };

  const onProgressChange = (e) => {
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
  };

  const onDateChange = (e) => {
    setValues({ ...values, date: e.target.value });
  };

  const onDeadlineChange = (e) => {
    setValues({ ...values, deadline: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await editProjects({
        projectId: projectId,
        employee_email: values.employee_email,
        title: values.title,
        progress: values.progress,
        date: values.date,
        deadline: values.deadline
      });

      setError('');
      setSuccess(data.message);
      setValues({
        employee_email: '',
        title: '',
        progress: '',
        date: '',
        deadline: ''
      });
    } catch (error) {
      setError(error.response.data.errors);
      setSuccess('');
    }
  };

  return (
    <div className="manager-login">
      <form onSubmit={onSubmit} className="manager-box">
        <h1>Projekt szerkesztése</h1>

        <div>
          <label htmlFor="employee_email">Email cím</label>
          <input
            onChange={onEmailChange}
            type="email"
            id="email"
            name="email"
            value={values.employee_email}
            placeholder="test@gmail.com"
            required
          />
        </div>

        <div>
          <label htmlFor="title">Projekt neve</label>
          <input
            onChange={onTitleChange}
            type="text"
            id="title"
            name="title"
            value={values.title}
            placeholder="Cím123"
            required
          />
        </div>

        <div>
          <label htmlFor="progress">Előrehaladás</label>
          <input
            onChange={onProgressChange}
            type="number"
            id="progress"
            name="progress"
            value={values.progress}
            placeholder="0 - 100%"
            required
          />
        </div>

        <div>
          <label htmlFor="date">Létrehozás dátuma</label>
          <input
            onChange={onDateChange}
            type="text"
            id="date"
            name="date"
            value={values.date}
            placeholder="2023.10.10."
            required
          />
        </div>

        <div>
          <label htmlFor="deadline">Határidő</label>
          <input
            onChange={onDeadlineChange}
            type="text"
            id="deadline"
            name="deadline"
            value={values.deadline}
            placeholder="2023.11.11."
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        {success && <div className="error-message">{success}</div>}

        <button type="submit">Módosítás</button>
        <button><Link to="/getprojects">Vissza a projektekhez</Link></button>
      </form>
    </div>
  );
};

export default EditProjectMan;
