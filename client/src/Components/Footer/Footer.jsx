import React from 'react'
import './Footer.css';
import footer_logo from '../Assets/Frontend_Assets/logo_big.png';
import instagram_logo from '../Assets/Frontend_Assets/instagram_icon.png'
import pintester_logo from '../Assets/Frontend_Assets/pintester_icon.png'
import whatsapp_logo from '../Assets/Frontend_Assets/whatsapp_icon.png'


const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SHOPPING</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
            <img src={instagram_logo} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={pintester_logo} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={whatsapp_logo} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>copyright @ 2025 | All Right reserved.</p>
      </div>
    </div>
  )
}

export default Footer
