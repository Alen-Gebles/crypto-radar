import './App.css'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import ApiFetcherComponent from './components/ApiFetch'

function App() {
  return (
    <>
    <main className='w-screen h-screen flex'>
      <MainContent />
      <Sidebar />
    </main>
      
    </>
  )
}

export default App
