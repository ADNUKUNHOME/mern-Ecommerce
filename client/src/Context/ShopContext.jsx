import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {}
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product, setAll_product] = useState([])
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/allproducts`)
        .then((response) => response.json())
        .then((data) => setAll_product(data))

        if(localStorage.getItem('auth-token')) {
            fetch(`${import.meta.env.VITE_API_URL}/getcart`, {
                method: 'GET',
                headers: {
                    Accept: "application/form-data",
                    "auth-token" : `${localStorage.getItem('auth-token')}`,
                    "Content-Type": "application/json"
                },
                body:""
            }).then((response) => response.json())
            .then((data) => setCartItems(data));
        }
    }, [])

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}))
        if(localStorage.getItem('auth-token')) {
            fetch(`${import.meta.env.VITE_API_URL}/addtocart`, {
                method: 'POST',
                headers: {
                    Accept: "application/form-data",
                    "auth-token" : `${localStorage.getItem('auth-token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then((response) => response.json())
            .then((data) => console.log(data)
            )
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
        if(localStorage.getItem('auth-token')) {
            fetch(`${import.meta.env.VITE_API_URL}/removefromcart`, {
                method: 'POST',
                headers: {
                    Accept: "application/form-data",
                    "auth-token" : `${localStorage.getItem('auth-token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"itemId": itemId})
            })
            .then((response) => response.json())
            .then((data) => console.log(data)
            )
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems) {
            if(cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id=== Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount; 
    }

    const getTotalCartItem = () => {
        let totalItem = 0;
        for(const item in cartItems) {
            if(cartItems[item] > 0) {
                totalItem += cartItems[item]
            }
        }
        return totalItem;
    }


    const contextValue = { getTotalCartItem,    all_product, getTotalCartAmount, cartItems, addToCart, removeFromCart }

    console.log(cartItems);
    

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;  