import { Route, Routes } from 'react-router-dom'

import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Auth from './components/auth'
import Dashboard from './pages/Dashboard'
import AddUSer from './pages/AddUSer'
import AddCard from './pages/AddCard'
import Card from './pages/Card'
import Profile from './pages/Profile'
function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/auth' element={<Auth />}/>
        <Route path='/Profile' element={<Profile />}/>
        <Route path='/Dashboard' element={<Dashboard />}/>
        <Route path='/AddUser' element={<AddUSer />}/>
        <Route path='/AddCard' element={<AddCard />}/>
        <Route path='/card/:id' element={<Card />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </>
  )
}

export default App
