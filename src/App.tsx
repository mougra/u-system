import './App.scss'

import { Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import NotFound from './pages/NotFound'
import Aside from './components/Aside'
import Other from './pages/Other'
import Graph from './pages/Graph'

function App() {
  return (
    <>
      <Header />
      <div className='app'>
        <Aside />
        <Routes>
          <Route path='/u-system/:url' element={<Graph />} />
          <Route path='/u-system' element={<Graph />} />
          <Route path='/other' element={<Other />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
