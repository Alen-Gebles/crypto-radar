import ApiFetcherComponent from './ApiFetch';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';


function MainContent({ selectedCoin }){
  const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=CG-GuDAMUsCf3yFL8LqvPfPC28H';
  const { data, isLoading, error } = ApiFetcherComponent({ apiUrl });
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const fetchData = () => {
    ApiFetcherComponent({ apiUrl });
    setLastUpdated(Date.now());
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!selectedCoin) {
    return <div className='w-screen h-screen flex items-center justify-center'>
      <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
  }

  return(
  <>
  <section className="h-screen width_100vw lg:flexThree p-6 pt-12">
    <div>
      <div className='flex items-center justify-between flex-col gap-4 md:flex-row'>
        <div>
            <div className='flex items-center text-white'>
              <img className='w-14 h-auto' src={selectedCoin.image} alt={selectedCoin.name} />
              <h3 className='text-3xl font-semibold ml-4 mr-2'>{selectedCoin.name}</h3>
              <p className='text-lg text-gray-300'>({selectedCoin.symbol.toUpperCase()})</p>
            </div>
        </div>
        <div className='flex items-center gap-4 text-white'>
          <h3 className='text-3xl font-semibold'>${selectedCoin.current_price.toLocaleString()}</h3>
          <p className={`px-2 py-0.5 rounded-full bg-red-600 text-sm ${selectedCoin.price_change_percentage_24h >= 0 ? 'bg-green-600' : 'bg-red-600'}`}>
            {selectedCoin.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className='w-full h-auto grid-row gap-3 my-10'>
        <div className='w-full h-full text-white bg-gray-800  rounded-2xl  h-32 p-5'>
          <p className='text-left text-sm'>Market Cap</p>
          <p className='text-lg whitespace-nowrap my-3'><span className='text-slate-500 text-xl'>$</span> {selectedCoin.market_cap.toLocaleString()}</p>
          <p className={`w-fit rounded-full text-red-600 text-sm ${selectedCoin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {selectedCoin.market_cap_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
        <div className='w-full h-full text-white bg-gray-800  rounded-2xl  h-32 p-5'>
          <p className='text-left text-sm'>Volume</p>
          <p className='text-lg whitespace-nowrap my-3'><span className='text-slate-500 text-xl'>$</span> {selectedCoin.total_volume.toLocaleString()}</p>
          <p className={`w-fit rounded-full text-red-600 text-sm ${selectedCoin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {selectedCoin.market_cap_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
        <div className='w-full h-full text-white bg-gray-800  rounded-2xl  h-32 p-5'>
          <p className='text-left text-sm'>Max Supply</p>
          <p className='text-lg whitespace-nowrap my-3'>{selectedCoin.total_supply} {selectedCoin.symbol.toUpperCase()}</p>
        </div>
        <div className='w-full h-full text-white bg-gray-800  rounded-2xl h-32 p-5'>
          <p className='text-left text-sm'>Circulating Supply</p>
          <p className='text-lg whitespace-nowrap my-3'>{selectedCoin.circulating_supply} {selectedCoin.symbol.toUpperCase()}</p>
        </div>
      </div>
    </div>

    <div className='w-full h-4/6 border-full flex items-center justify-center text-white text-1xl mb-10'>FREE TRIAL EXPIRED, SORRY :(</div>
  </section>
  </>
  )
}

MainContent.propTypes = {
  selectedCoin: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    symbol: PropTypes.string,
    current_price: PropTypes.number,
    price_change_percentage_24h: PropTypes.number,
    market_cap: PropTypes.number,
    // Add other properties as needed
  }).isRequired,
};

export default MainContent
