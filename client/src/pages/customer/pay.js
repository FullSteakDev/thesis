import '../customer/style/customer.css'
import { Link } from 'react-router-dom';
import React from "react"

const Pay = () => {

    return (
      <div className="customer-login">
        <form className="customer-box">
          <h1>Fizetés</h1>

          <div>
            <label htmlFor="card">Kártyaszám</label>
            <input
              type="number"
              id="card"
              name="card"
              placeholder="43451454542662"
              required
            />
          </div>

          <div>
            <label htmlFor="date">Lejárati dátum</label>
            <input
              type="string"
              id="date"
              name="date"
              placeholder="00/00"
              required
            />
          </div>

          <div>
            <label htmlFor="cvc">cvc kód</label>
            <input
              type="number"
              id="cvc"
              name="cvc"
              placeholder="000"
              required
            />
          </div>

          <button><Link to="/protectedcustomer">Fizetés</Link></button>
          <button><Link to="/protectedcustomer">Vissza</Link></button>
        </form>
      </div>
  );
};
  
  export default Pay