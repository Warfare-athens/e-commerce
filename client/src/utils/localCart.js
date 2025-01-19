
// // Utility function to get local cart items
// export const getLocalCartItems = () => {
//     return JSON.parse(localStorage.getItem('localCartItems')) || [];
//   };
  
//   // Utility function to save local cart items
//   export const saveLocalCartItems = (items) => {
//     localStorage.setItem('localCartItems', JSON.stringify(items));
//   };
  
  
//   // Utility function to add an item to the local cart
// export  const addToLocalCart = (product) => {
//     const storedCart = JSON.parse(localStorage.getItem('localCartItems')) || [];
//     const existingItemIndex = storedCart.findIndex(item => item.productId === product.productId);
  
//     if (existingItemIndex > -1) {
//       // Update quantity if the product already exists in the cart
//       storedCart[existingItemIndex].quantity += product.quantity;
//     } else {
//       // Add new product with all necessary details
//       storedCart.push({
//         productId: product.productId,
//         title: product.title,
//         image: product.images[0], // Assuming you want the first image
//         price: product.price,
//         quantity: product.quantity,
//       });
//     }
  
//     localStorage.setItem('localCartItems', JSON.stringify(storedCart));
//   };
  
  
//   // Utility function to remove an item from the local cart
//   export const removeFromLocalCart = (productId) => {
//     const localCartItems = getLocalCartItems().filter(item => item.productId !== productId);
//     saveLocalCartItems(localCartItems);
//   };
  
//   // Utility function to update item quantity in the local cart
//   export const updateLocalCartItemQuantity = (productId, quantity) => {
//     const localCartItems = getLocalCartItems();
//     const itemIndex = localCartItems.findIndex(item => item.productId === productId);
  
//     if (itemIndex > -1) {
//       localCartItems[itemIndex].quantity = quantity;
//       saveLocalCartItems(localCartItems);
//     }
//   };


  