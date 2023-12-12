import React from 'react'
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Home from '../pages/home'
import Pokemon from '../pages/pokemon'
import { NavLink } from 'react-router-dom/dist';



function NavBar() {
  
  const getLinkClass = ({ isActive }) => isActive ? 'text-blue-200' : 'text-white';
  console.log(getLinkClass);
  
  return (
    <>
      <Router>
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className='flex '>
              <NavLink to="/accueil" className="text-white text-lg font-bold">Pokemon</NavLink>
              <img src="/clip-art.png" alt="logo" width='30' height='20' />
            </div>
            <div className="space-x-4">
              <NavLink to="/accueil" className={getLinkClass} >Accueil</NavLink>
              <NavLink to="/pokemon" className={getLinkClass} >Pokemon</NavLink>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/accueil" element={<Home/>} />
          <Route path="/pokemon" element={<Pokemon/>} />
        </Routes>
      </Router>
    </>
    
    
  )
}

export default NavBar