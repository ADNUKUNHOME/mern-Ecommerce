import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Review (120)</div>
      </div>
      <div className="descriptionbox-description">
        <p>E-commerce (electronic commerce) refers to commercial activities including the electronic buying or selling products and services which are conducted on online platforms or over the Internet.[1] E-commerce draws on technologies such as mobile commerce, electronic funds transfer, supply chain management, Internet marketing, online transaction processing, electronic data interchange (EDI), inventory management systems, and automated data collection systems. E-commerce is the largest sector of the electronics industry and is in turn driven by the technological advances of the semiconductor industry.</p>
        <p>An e-commerce website is an online store where customers can buy products and services from businesses. It's the virtual equivalent of a physical store, allowing customers to browse and purchase products without having to visit a store. </p>
      </div>
    </div>
  )
}

export default DescriptionBox;
