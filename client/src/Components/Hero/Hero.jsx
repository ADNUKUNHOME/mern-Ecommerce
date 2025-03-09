import React from 'react'
import './Hero.css'
import handIcon from '../Assets/Frontend_Assets/hand_icon.png'
import arrowIcon from '../Assets/Frontend_Assets/arrow.png'
import heroImage from '../Assets/Frontend_Assets/hero_image.png'



const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h3>NEW ARRIVALS ONLY</h3>
        <div>
            <div className="hero-hand-icon">
            <p>new</p>
                <img src={handIcon} alt="" />
            </div>
            <p>Collenctions</p>
            <p>For Everyone</p>
        </div>
        <div className="hero-latest-btn">
            <div>Hero Latest Collection</div>
            <img src={arrowIcon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={heroImage} alt="" />
      </div>
    </div>
  )
}

export default Hero
