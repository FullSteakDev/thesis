import { useState } from "react";
import { Link } from "react-router-dom";
import { editAmortisation } from "../../api/authApi";
import { useParams } from "react-router-dom";
import '../manager/style/manager.css';

const EditToolAmortisation = () => {
  const { Id, amortisation } = useParams();

  const [values, setValues] = useState({
    Id: Id,
    amortisation: amortisation
  })

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onAmortisationChange = (e) => {
    const inputAmortisation = e.target.value;

    if (inputAmortisation === '') {
      setValues({ ...values, amortisation: '' });
      setError('');
    } else if (!isNaN(inputAmortisation)) {
      const amortisation = parseInt(inputAmortisation, 10);

      if (amortisation >= 0 && amortisation <= 100) {
        setValues({ ...values, amortisation });
        setError('');
      } else {
        setError('Az amortizáció 0 és 100 közötti érték lehet');
      }
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await editAmortisation({
        Id: Id,
        amortisation: values.amortisation
      })

      setError('');
      setSuccess(data.message);
      setValues({
        amortisation: ''
      })
    } catch (error) {
      setError(error.response.data.errors);
      setSuccess('');
    }
  };

  return (
    <div className="manager-login">
      <form onSubmit={onSubmit} className="manager-box">
        <h1>Amortizáció módosítása</h1>

        <div>
          <label htmlFor="amortisation">Amortizáció</label>
          <input
            onChange={onAmortisationChange}
            type="number"
            id="amortisation"
            name="amortisation"
            value={values.amortisation}
            placeholder="0 - 100%"
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        {success && <div className="error-message">{success}</div>}

        <button type="submit">Módosítás</button>
        <button><Link to="/gettools">Vissza az eszközökhöz</Link></button>
      </form>
    </div>
  );
};

export default EditToolAmortisation
