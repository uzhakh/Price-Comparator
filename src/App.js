import React, { useState } from 'react';
import './App.css';

function App() {
 const [products, setProducts] = useState([]);
 const [productName, setProductName] = useState('');
 const [weight, setWeight] = useState('');
 const [price, setPrice] = useState('');
 const [error, setError] = useState('');

 const handleAddProduct = () => {
  //Check all data is correct
  if (!weight || !price) {
    setError('Введите вес и цену');
    return;
  }
  const weightNum = Number(weight);
  const priceNum = Number(price);
  if (weightNum <= 0 || priceNum <= 0) {
    setError('Вес и цена должны быть больше 0');
    return;
  }

  //Adding a product
  const pricePerGram = priceNum / weightNum;
  const newProduct = {
    id: Date.now(),
    name: productName || `Продукт ${products.length + 1}`,
    weight: weightNum,
    price: priceNum,
    pricePerGram,
  };
  setProducts([...products, newProduct]);
  setError('');
  setProductName('');
  setWeight('');
  setPrice('');
 };

 //Min price
 const minPricePerGram = products.length > 0
 ? Math.min(...products.map(p => p.pricePerGram))
 : null;

 return (
  <div className="App">
    <h2> Price Comparator</h2>
    <div> 
      <input type="text"
      placeholder="Product name"
      value={productName}
      onChange={(e) => setProductName(e.target.value)}
      /> 
      <input 
      type="number"
      placeholder="Weight (g)"
      value={weight}
      onChange={(e) => setWeight(e.target.value)}
      />
      <input 
      type="number"
      placeholder="Price (DKK)"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleAddProduct}> Add </button>
    </div>
    {error && <p style={{ color : 'red'}}>{error}</p>}
    {products.length === 0 ? (
      <p>No products added</p>
    ) : (
      <ul> 
        {products.map((product) => (
          <li 
          key={product.id}
          style={{
            backgroundColor:
            product.pricePerGram === minPricePerGram ? 'lightgreen' : 'transparent',
          }}
          >
            {product.name} : {product.weight}g, {product.price}DKK, {product.pricePerGram.toFixed(3)} DKK/g
          </li>
        ))}
      </ul>
    )}
  </div>
 );
}

export default App;
