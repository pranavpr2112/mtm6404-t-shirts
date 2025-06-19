const initialTshirts = [
  { title: 'Blue T-Shirt', image: 'images/blue-t-shirt.jpg', price: 7.99, stock: 4, quantity: 1 },
  { title: 'Bright Purple T-Shirt', image: 'images/bright-purple-t-shirt.jpg', price: 5.99, stock: 1, quantity: 1 },
  { title: 'Cobalt Blue T-Shirt', image: 'images/cobalt-blue-t-shirt.jpg', price: 9.99, stock: 5, quantity: 1 },
  { title: 'Green T-Shirt', image: 'images/green-t-shirt.jpg', price: 6.99, stock: 0, quantity: 1 },
  { title: 'Grey T-Shirt', image: 'images/grey-t-shirt.jpg', price: 4.99, stock: 2, quantity: 1 },
  { title: 'Light Green T-Shirt', image: 'images/light-green-t-shirt.jpg', price: 7.99, stock: 4, quantity: 1 },
  { title: 'Purple T-Shirt', image: 'images/purple-t-shirt.jpg', price: 7.99, stock: 0, quantity: 1 },
  { title: 'Red T-Shirt', image: 'images/red-t-shirt.jpg', price: 6.99, stock: 3, quantity: 1 },
  { title: 'Teal T-Shirt', image: 'images/teal-t-shirt.jpg', price: 7.99, stock: 2, quantity: 1 }
];

function TShirtCard({ tshirt, onBuy, onQuantityChange }) {
  return (
    <div className="card">
      <img src={tshirt.image} alt={tshirt.title} />
      <h3>{tshirt.title}</h3>
      <p>Price: ${tshirt.price.toFixed(2)}</p>
      <p>
        {tshirt.stock === 0 ? (
          <span className="out-of-stock">Out of Stock</span>
        ) : (
          <>
            <span>{tshirt.stock} left!</span><br />
            <select
              value={tshirt.quantity}
              onChange={(e) => onQuantityChange(tshirt.title, parseInt(e.target.value))}
            >
              {Array.from({ length: tshirt.stock }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <br />
            <button onClick={() => onBuy(tshirt.title)}>Buy</button>
          </>
        )}
      </p>
    </div>
  );
}

function App() {
  const [tshirts, setTshirts] = React.useState(() => {
    const saved = localStorage.getItem('tshirts');
    return saved ? JSON.parse(saved) : initialTshirts;
  });

  React.useEffect(() => {
    localStorage.setItem('tshirts', JSON.stringify(tshirts));
  }, [tshirts]);

  const handleBuy = (title) => {
    setTshirts(prev =>
      prev.map(t =>
        t.title === title && t.stock >= t.quantity
          ? { ...t, stock: t.stock - t.quantity }
          : t
      )
    );
  };

  const handleQuantityChange = (title, qty) => {
    setTshirts(prev =>
      prev.map(t => (t.title === title ? { ...t, quantity: qty } : t))
    );
  };

  return (
    <div className="store-container">
      {tshirts.map(t => (
        <TShirtCard
          key={t.title}
          tshirt={t}
          onBuy={handleBuy}
          onQuantityChange={handleQuantityChange}
        />
      ))}
    </div>
  );
}

// ✅ React 17-compatible rendering (works with Babel in browser)
ReactDOM.render(<App />, document.getElementById('root'));
