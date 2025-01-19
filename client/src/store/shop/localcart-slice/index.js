// // store/shop/localcart-slice/index.js

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cartItems: [],
//   localCartItems: [],
//   isLoading: false,
// };

// const shoppingCartSlice = createSlice({
//   name: 'shoppingCart',
//   initialState,
//   reducers: {
//     setLocalCartItems: (state, action) => {
//       state.localCartItems = action.payload;
//     },
//     addLocalCartItem: (state, action) => {
//       const existingItemIndex = state.localCartItems.findIndex(
//         item => item.productId === action.payload.productId
//       );

//       if (existingItemIndex >= 0) {
//         // Update quantity if item already exists
//         state.localCartItems[existingItemIndex].quantity += action.payload.quantity;
//       } else {
//         // Add new item to the cart
//         state.localCartItems.push(action.payload);
//       }
//     },
//     updateLocalCartItem: (state, action) => {
//       const { productId, quantity } = action.payload;
//       const itemIndex = state.localCartItems.findIndex(item => item.productId === productId);

//       if (itemIndex >= 0) {
//         state.localCartItems[itemIndex].quantity = quantity;
//       }
//     },
//     removeLocalCartItem: (state, action) => {
//       state.localCartItems = state.localCartItems.filter(
//         item => item.productId !== action.payload.productId
//       );
//     },
//   },
//   // ... other reducers and extraReducers
// });

// export const { setLocalCartItems, addLocalCartItem, updateLocalCartItem, removeLocalCartItem } = shoppingCartSlice.actions;

// export default shoppingCartSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  localCartItems: [],
  isLoading: false,
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    setLocalCartItems: (state, action) => {
      state.localCartItems = action.payload;
    },
    addLocalCartItem: (state, action) => {
      const existingItemIndex = state.localCartItems.findIndex(
        item => item.productId === action.payload.productId
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        state.localCartItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        // Add new item to the cart
        state.localCartItems.push(action.payload);
      }
    },
    updateLocalCartItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.localCartItems.findIndex(item => item.productId === productId);

      if (itemIndex >= 0) {
        state.localCartItems[itemIndex].quantity = quantity;
      }
    },
    removeLocalCartItem: (state, action) => {
      state.localCartItems = state.localCartItems.filter(
        item => item.productId !== action.payload.productId
      );
    },
  },
});

export const { setLocalCartItems, addLocalCartItem, updateLocalCartItem, removeLocalCartItem } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
