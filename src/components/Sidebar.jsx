import React, { useState, useEffect } from 'react';
import ApiFetcherComponent from './ApiFetch'; // Adjust the path as per your project structure

function Sidebar() {
  const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=CG-GuDAMUsCf3yFL8LqvPfPC28H';

  // State to store fetched data, loading state, and error
  const { data, isLoading, error } = ApiFetcherComponent({ apiUrl });

  // State to track last updated time
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Function to fetch data
  const fetchData = () => {
    ApiFetcherComponent({ apiUrl });
    setLastUpdated(Date.now());
  };

  // Effect to refresh data every 60 seconds
  useEffect(() => {
    const interval = setInterval(fetchData, 60000); // 60000 milliseconds = 60 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <>
      <aside className="h-screen flexOne overflow-y-scroll">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && (
            <div className='w-full h-auto flex flex-col gap-4 mx-auto mt-4'>
              {data.map(coin => (
                <div key={coin.id} className='text-white w-11/12 mx-auto p-2 bg-slate-800 rounded-lg'>
                  <p>Name: {coin.name}</p>
                  <p>Symbol: {coin.symbol}</p>
                  <p>Price: ${coin.current_price}</p>
                </div>
              ))}
            </div>
          )}
        
      </aside>
    </>
  );
}

export default Sidebar;
