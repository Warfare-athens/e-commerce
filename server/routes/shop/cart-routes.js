// const express = require("express");
// const {
//   addToCart,
//   fetchCartItems,
//   deleteCartItem,
//   updateCartItemQty,
// } = require("../../controllers/shop/cart-controller");

// const router = express.Router();

// router.post("/add", addToCart);
// router.get("/get/:id", fetchCartItems);
// router.put("/update-cart", updateCartItemQty);
// router.delete("/:userId/:productId", deleteCartItem);

// module.exports = router;



const express = require("express");

const {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
} = require("../../controllers/shop/cart-controller");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get", fetchCartItems); // Change to use query parameters
router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;