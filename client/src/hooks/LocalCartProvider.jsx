import React, { createContext, useContext, useState } from 'react';

const LocalCartContext = createContext();

export const useLocalCart = () => useContext(LocalCartContext);

export const LocalCartProvider = ({ children }) => {
  const [localCartItems, setLocalCartItems] = useState([]);

  return (
    <LocalCartContext.Provider value={{ localCartItems, setLocalCartItems }}>
      {children}
    </LocalCartContext.Provider>
  );
};





// import { createContext , react, useContext } from "react";

// export const ShopContext = createContext()

// const shopContextProvider = (props) =>{


//     const currency = '₹';
//     const delivery_fee = 10;
//     const [cartItems, setCartItems] = useState({})

//     const addToCart = (itemId , quantity)  => {
//         let cartData = structuredClone(cartItems);

//         if (cartData[itemId]){
//             if (cartData[itemId][size]){
//                 cartData[itemId][size] += 1;
//             } else {
//                 cartData[itemId][size] = 1;
//             }
//         }
//         else {
//             cartData[itemId] = {};
//             cartData[itemId][size] = 1;
//         }
//         setCartItems(cartData);
//     }


//     const value = {
//         currency, delivery_fee, cartItems
//     }


//     return(
//         <>
//         </>
//     )


// }