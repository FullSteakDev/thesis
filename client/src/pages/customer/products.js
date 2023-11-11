import { useEffect, useState } from 'react'
import { fetchProducts } from '../../api/authApi'
import './style/customer.css'
import { NavLink } from 'react-router-dom'

const GetProducts = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState(null)

  const product = async () => {
    try {
      const { data } = await fetchProducts();

      const sortedProducts = data.products.sort((a, b) => {
        const priceA = new Date(a.price);
        const priceB = new Date(b.price);
        return priceA - priceB;
      });

      setProducts(sortedProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    product()
  }, []);

  return loading ? (
    <div>
      <h1>Termékek hamarosan érkeznek</h1>
    </div>
  ) : (
    <div className='customer'>
      {products.map((product, index) => (
        <div key={index} className="customer-box">
          <p className="name">{product.name}</p>
          <p className="name">Leírás: {product.description}</p>
          <p className="name">Anyag: {product.material}</p>
          <p className="name">Ár: {product.price} huf</p>
            <button><NavLink to={`/reserve-product/${product.name}/${product.description}/${product.price}/${product.material}`}>Kosárba</NavLink></button>
        </div>
      ))}
      <div className='customer-box'>
        <NavLink to={'/protectedcustomer'} className='customer-routes-style'>Vissza</NavLink>
      </div>
    </div>
  );
}

export default GetProducts
