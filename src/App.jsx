import './App.css'
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import ApiFetcherComponent from './components/ApiFetch'

function App() {

  const [selectedCoin, setSelectedCoin] = useState(null);

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
  };

  return (
    <>
    <main className='w-screen h-screen flex'>
      <MainContent selectedCoin={selectedCoin} />
      <Sidebar onCoinClick={handleCoinClick} />
    </main>
      
    </>
  )
}

export default App
