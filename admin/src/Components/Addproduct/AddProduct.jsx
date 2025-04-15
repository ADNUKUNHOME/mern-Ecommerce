import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

  const [ image, setImage ] = useState(false);
  const [ productDetails, setProductDetails ]= useState({
    name: '',
    image: '',
    category: 'women',
    old_price: '',
    new_price: ''
  })

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails, [e.target.name]: e.target.value
    })
  }

  const add_product = async () => {
    console.log(productDetails);
    
    let product = { ...productDetails };

    let formData = new FormData();
    formData.append('product', image);

    try {
        // Upload Image
        const uploadResponse = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
            method: 'POST',
            headers: {
                accept: 'application/json'
            },
            body: formData
        });

        const responseData = await uploadResponse.json();

        if (responseData.success) {
            product.image = responseData.image_url;

            // Add Product
            const addProductResponse = await fetch(`${import.meta.env.VITE_API_URL}/addproduct`, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            const addProductData = await addProductResponse.json();

            if (addProductData.success) {
                alert('The product is added successfully');
            } else {
                alert('Denied to add the product.');
            }
        } else {
            alert('Image upload failed.');
        }
    } catch (error) {
        console.error("Error adding product:", error);
        alert("Something went wrong! Please try again.");
    }
};

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={changeHandler} type="number" name='old_price' placeholder='Type Here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input value={productDetails.new_price} onChange={changeHandler} type="number" name='new_price' placeholder='Type Here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select  value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kids</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor='file-input'>
            <img src={image ? URL.createObjectURL(image) :upload_area} className='addproduct-thumnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
       <button onClick={add_product} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
