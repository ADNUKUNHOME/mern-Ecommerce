import React, { useState } from 'react'
import './Navbar.css'

import logo from '../Assets/Frontend_Assets/logo.png';
import carticon from '../Assets/Frontend_Assets/cart_icon.png';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [menu, setMenu] = useState("shop")

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo}  alt=''/>
        <p>SHOPPING</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={() => {setMenu("shop")}}><Link style={{ textDecoration: 'none'}} to='/'>SHOP</Link>{menu === "shop" ? <hr/> : <></>}</li>
        <li onClick={() => {setMenu("women")}}><Link style={{ textDecoration: 'none'}} to='/women'>WOMEN</Link>{menu === "women" ? <hr/> : <></>}</li>
        <li onClick={() => {setMenu("men")}}><Link style={{ textDecoration: 'none'}} to='/men'>MEN</Link>{menu === "men" ? <hr/> : <></>}</li>
        <li onClick={() => {setMenu("kids")}}><Link style={{ textDecoration: 'none'}} to='/kids'>KIDS</Link>{menu === "kids" ? <hr/> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
      <Link to='/login'><button>LOGIN</button></Link>
      <Link to='/cart'><img src={carticon}/></Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  )
}

export default Navbar
