import { useEffect, useState } from 'react'
import { fetchProductsCustomer } from '../../api/authApi'
import './style/customer.css'
import { NavLink } from 'react-router-dom'

const Basket = () => {
  const [loading, setLoading] = useState(true)
  const [customerProducts, setCustomerProducts] = useState(null)

  const customerProduct = async () => {
    try {
      const { data } = await fetchProductsCustomer();

      const sortedCustomerProducts = data.customerProducts.sort((a, b) => {
        const priceA = new Date(a.price);
        const priceB = new Date(b.price);
        return priceA - priceB;
      });

      setCustomerProducts(sortedCustomerProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    customerProduct()
  }, []);

  const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => total + product.price, 0);
  }

  return loading ? (
    <div>
      <h1>Termékek hamarosan érkeznek</h1>
    </div>
  ) : (
    <div className='customer'>
      {customerProducts.map((customerProducts, index) => (
        <div key={index} className="customer-box">
          <p className="name">{customerProducts.name}</p>
          <p className="name">Leírás: {customerProducts.description}</p>
          <p className="name">Anyag: {customerProducts.material}</p>
          <p className="name">Ár: {customerProducts.price} huf</p>
            <button><NavLink to={`/delete-product/${customerProducts.id}/${customerProducts.name}`}>Eltávolítás</NavLink></button>
        </div>
      ))}
      <div className='customer-box'>
        <NavLink to={'/pay'} className='customer-routes-style'>Fizetés</NavLink>
        <p className="name">Teljes ár: {calculateTotalPrice(customerProducts)} HUF</p>
        <NavLink to={'/protectedcustomer'} className='customer-routes-style'>Vissza</NavLink>
      </div>
    </div>
  );
}

export default Basket
