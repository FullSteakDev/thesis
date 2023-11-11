import { useState } from "react";
import { Link } from "react-router-dom";
import { reserveProductsCustomer } from "../../api/authApi";
import { useParams } from "react-router-dom";
import './style/customer.css'

const ReserveProducts = () => {
  const { name, description, price, material } = useParams();


  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await reserveProductsCustomer(name, description, price, material)

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
        <h1>Kosárba rakás</h1>
        <h3>Hozzá szeretné adni a kosarához a</h3>
        <h2>{name}</h2>
        <h3>nevű terméket?</h3>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="error-message">{success}</div>}

        <button type="submit">Hozzáadás</button>
        <button><Link to="/products">Vissza a termékekhez</Link></button>
      </form>
    </div>
  );
};

export default ReserveProducts
