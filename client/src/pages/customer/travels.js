import { useEffect, useState } from 'react'
import { fetchTravels } from '../../api/authApi'
import './style/customer.css'
import { NavLink } from 'react-router-dom'

const GetTravels = () => {
  const [loading, setLoading] = useState(true)
  const [travels, setTravels] = useState(null)

  const travel = async () => {
    try {
      const { data } = await fetchTravels();

      const sortedTravels = data.travels.sort((a, b) => {
        const priceA = new Date(a.price);
        const priceB = new Date(b.price);
        return priceA - priceB;
      });

      setTravels(sortedTravels);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    travel()
  }, []);

  return loading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div className='customer'>
      {travels.map((travel, index) => (
        <div key={index} className="customer-box">
          <p className="name">{travel.name}</p>
          <p className="name">Indulás: {travel.departure}</p>
          <p className="name">Érkezés: {travel.destination}</p>
          <p className="name">Időpont: {travel.date}</p>
          <p className="name">Ár: {travel.price} huf</p>
          <p className="name">Várható időtartam: {travel.length} óra</p>
            <button><NavLink to={`/reserve-travel/${travel.name}/${travel.departure}/${travel.destination}/${travel.date}/${travel.price}/${travel.length}`}>Bakancslistához</NavLink></button>
        </div>
      ))}
      <div className='customer-box'>
        <NavLink to={'/protectedcustomer'} className='customer-routes-style'>Vissza</NavLink>
      </div>
    </div>
  );
}

export default GetTravels
