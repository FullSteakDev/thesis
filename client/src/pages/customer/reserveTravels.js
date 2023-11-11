import { useState } from "react";
import { Link } from "react-router-dom";
import { reserveTravelsCustomer } from "../../api/authApi";
import { useParams } from "react-router-dom";
import './style/customer.css'

const ReserveTravels = () => {
  const { name, departure, destination, date, price, length } = useParams();


  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await reserveTravelsCustomer(name, departure, destination, date, price, length)

      setError('');
      setSuccess(data.message)

    } catch (error) {
      setError(error.response.data.errors);
      setSuccess('');
    }
  };

  return (
    <div className="customer-login">
      <form onSubmit={onSubmit} className="customer-box">
        <h1>Bakacslistához adás</h1>
        <h3>Hozzá szeretné adni a bakancslistához a</h3>
        <h2>{name}</h2>
        <h3>nevű járatot?</h3>

        {error && <div className="error-message">{error}</div>}

        {success && <div className="error-message">{success}</div>}

        <button type="submit">Hozzáadás</button>
        <button><Link to="/travels">Vissza az utazásokhoz</Link></button>
      </form>
    </div>
  );
};

export default ReserveTravels
