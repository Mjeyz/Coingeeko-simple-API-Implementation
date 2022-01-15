import React, { useState, useEffect }  from 'react';
const Home = () => {
const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [coins, setCoins] = useState([]);
    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setCoins(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
      }, [])
if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
          <>
            <div className="container">
              {coins.map(coin => (
                  <div key={coin.id} className="card">
                      <img src={coin.image} alt={coin.name} />
                      <h3>{coin.market_cap_change_percentage_24h}%</h3>
                      <p>{coin.name} <span>{coin.symbol}</span></p>
                      <button className="delegate">Delegate</button>
                  </div>
                ))}
            </div>
          </>
        );
    }
}
export default Home;