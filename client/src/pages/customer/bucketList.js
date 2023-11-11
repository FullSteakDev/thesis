import { useEffect, useState } from 'react'
import { fetchTravelsCustomer } from '../../api/authApi'
import './style/customer.css'
import { NavLink } from 'react-router-dom'

const BucketList = () => {
  const [loading, setLoading] = useState(true)
  const [customerTravels, setCustomerTravels] = useState(null)

  const customerTravel = async () => {
    try {
      const { data } = await fetchTravelsCustomer();

      const sortedCustomerTravels = data.customerTravels.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      })

      setCustomerTravels(sortedCustomerTravels);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    customerTravel()
  }, []);

  const calculateTotalPrice = (travels) => {
    return travels.reduce((total, travel) => total + travel.price, 0);
  }

  return loading ? (
    <div>
      <h1>Utazások hamarosan érkeznek</h1>
    </div>
  ) : (
    <div className='customer'>
      {customerTravels.map((customerTravels, index) => (
        <div key={index} className="customer-box">
          <p className="name">{customerTravels.name}</p>
          <p className="name">Indulás: {customerTravels.departure}</p>
          <p className="name">Érkezés: {customerTravels.destination}</p>
          <p className="name">Indulási időpont: {customerTravels.date}</p>
          <p className="name">Ár: {customerTravels.price} huf</p>
          <p className="name">Várható időtartam: {customerTravels.length} óra</p>
            <button><NavLink to={`/delete-travel/${customerTravels.id}/${customerTravels.name}`}>Eltávolítás</NavLink></button>
        </div>
      ))}
      <div className='customer-box'>
        <NavLink to={'/pay'} className='customer-routes-style'>Fizetés</NavLink>
        <p className="name">Teljes ár: {calculateTotalPrice(customerTravels)} HUF</p>

        <NavLink to={'/protectedcustomer'} className='customer-routes-style'>Vissza</NavLink>
      </div>
    </div>
  );
}

export default BucketList
