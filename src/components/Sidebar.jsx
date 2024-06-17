import React, { useState, useEffect } from 'react';
import ApiFetcherComponent from './ApiFetch'; 
import PropTypes from 'prop-types';

function Sidebar({ onCoinClick }) {
  const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=CG-GuDAMUsCf3yFL8LqvPfPC28H';
  const { data, isLoading, error } = ApiFetcherComponent({ apiUrl });
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedCoin(data[0]); 
      onCoinClick(data[0]);
    }
  }, [data]);

  const fetchData = () => {
    ApiFetcherComponent({ apiUrl });
    setLastUpdated(Date.now());
    
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
    onCoinClick(coin); 
  };

  function navSlide() {
    const sideNav = document.getElementById("sideNav");
    const hamburger = document.getElementById("hamburger");

    if (window.innerWidth < 1024) {
      if (sideNav.style.transform === "translateX(100%)" || !sideNav.style.transform) {
        sideNav.style.transform = "translateX(0%)";
        hamburger.style.transform = "translateX(-350px)";
      } else {
        sideNav.style.transform = "translateX(100%)";
        hamburger.style.transform = "translateX(0%)";
      }
    }
  }

  return (
    <>
      <div id='hamburger' className='absolute right-2 top-2 z-10 w-auto h-auto cursor-pointer lg:hidden transition_main' onClick={navSlide}>
        <svg width="45px" height="45px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.5 11.75C5.08579 11.75 4.75 12.0858 4.75 12.5C4.75 12.9142 5.08579 13.25 5.5 13.25V11.75ZM19.5 13.25C19.9142 13.25 20.25 12.9142 20.25 12.5C20.25 12.0858 19.9142 11.75 19.5 11.75V13.25ZM5.5 7.75C5.08579 7.75 4.75 8.08579 4.75 8.5C4.75 8.91421 5.08579 9.25 5.5 9.25V7.75ZM14.833 9.25C15.2472 9.25 15.583 8.91421 15.583 8.5C15.583 8.08579 15.2472 7.75 14.833 7.75V9.25ZM5.5 15.75C5.08579 15.75 4.75 16.0858 4.75 16.5C4.75 16.9142 5.08579 17.25 5.5 17.25V15.75ZM14.833 17.25C15.2472 17.25 15.583 16.9142 15.583 16.5C15.583 16.0858 15.2472 15.75 14.833 15.75V17.25ZM5.5 13.25H19.5V11.75H5.5V13.25ZM5.5 9.25H14.833V7.75H5.5V9.25ZM5.5 17.25H14.833V15.75H5.5V17.25Z" fill="#ffffff"></path></g></svg>
      </div>
      <aside id='sideNav' className="h-screen border_left overflow-y-scroll absolute side_width bg_clr right-0 translate-x-full lg:translate-x-0 lg:flexOne transition_main">
      <p className='w-full pt-4 pl-5 text-white text-xl'>Capitalization</p>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className='w-full h-auto flex flex-col gap-2 mx-auto mt-4'>
          {data.map(coin => (
            <div key={coin.id} className='flex items-center text-white w-11/12 mx-auto p-3 bg-transparent transition cursor-pointer rounded-lg hover:bg-slate-800' onClick={() => handleCoinClick(coin)}>
              <img className='w-9 h-9 bg-transparent' src={coin.image} id={coin.name} alt={coin.name} />
              <div className='w-full ml-4'>
                <p className=' text-sm'>{coin.name}</p>
                <div className='flex w-full items-center justify-between text-sm'>
                  <p>${coin.market_cap.toLocaleString()}</p>
                  <p>${coin.current_price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
    </>
  );
}

Sidebar.propTypes = {
  onCoinClick: PropTypes.func.isRequired,
  data: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    symbol: PropTypes.string,
    current_price: PropTypes.number,
    price_change_percentage_24h: PropTypes.number,
    market_cap: PropTypes.number,
    onCoinClick: PropTypes.string,
    // Add other properties as needed
  }).isRequired,
};

export default Sidebar;
