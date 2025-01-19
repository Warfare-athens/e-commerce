


// import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";




function UserCartWrapper({ combinedCartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  // const { user } = useSelector((state) => state.auth);
  // console.log("user in cart wrapper" , user)
  // const { cartItems } = useSelector((state) => state.shopCart);
  // const { localCartItems } = useSelector((state) => state.localCart); // Access localCartItems from Redux

  // React.useEffect(() => {
  //   dispatch(fetchCartItems(user?.id ));
  // }, [dispatch, user]);

  // console.log('Redux cartItems:', cartItems);
  // // console.log('Redux localCartItems:', localCartItems);




  // const combinedCartItems = cartItems.length > 0 ? [...cartItems] : localCartItems;
  // console.log('Redux combinedCartItems:::', combinedCartItems);

  // const totalCartAmount = combinedCartItems.reduce(
  //   (sum, currentItem) =>
  //     sum + ((currentItem?.Price > 0 ? currentItem?.Price : currentItem?.price) * currentItem?.quantity),
  //   0
  // );


console.log('combinedCart items in wrapper ---------------------',combinedCartItems);

  const totalCartAmount = 100

  const calculateProgress = (amount) => {
    if (amount > 1900) return 100;
    if (amount > 1400) return 100 * (amount / 1900);
    if (amount > 700) return 100 * (amount / 1900);
    return 100 * (amount / 1900);
  };
  const progress = calculateProgress(totalCartAmount);

  return (
    <SheetContent className="overflow-scroll overflow-x-hidden bg-gradient-to-br from-white via-neutral-100 to-neutral-50 text-black sm:max-w-md">
      <SheetHeader className="bg-black">
        <SheetTitle className="text-white mt-2 mb-4 font-satoshi-bold">Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-2">
        <div className="relative h-4 mx-2 mr-3 flex items-center font-satoshi">
          <Progress value={progress} className="mt-2 w-full" />
          <div
            className={`absolute top-0 left-[30%] transform -translate-x-1/2 h-6 w-6 text-black pl-[7px] text-[16px] rounded-full ${
              totalCartAmount > 700 ? 'bg-green-500 text-white' : 'bg-gray-300'
            }`}
          >
            {totalCartAmount > 700 ? '✓' : '1'}
          </div>
          <div
            className={`absolute top-0 left-[60%] transform -translate-x-1/2 h-6 w-6 text-black pl-[6px] pt-[1px] text-[16px] rounded-full ${
              totalCartAmount > 1400 ? 'bg-green-500 text-white' : 'bg-gray-300'
            }`}
          >
            {totalCartAmount > 1400 ? '✓' : '2'}
          </div>
          <div
            className={`absolute top-0 left-[100%] transform -translate-x-1/2 h-6 w-6 text-black pl-[6px] pt-[1px] text-[16px] rounded-full ${
              totalCartAmount > 1900 ? 'bg-green-500 text-white' : 'bg-gray-300'
            }`}
          >
            {totalCartAmount > 1900 ? '✓' : '3'}
          </div>
        </div>
      </div>

      <div className="mt-2 text-black space-y-4">
        
        
        {combinedCartItems > 0
          ? combinedCartItems.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
          : <p>Your cart is empty.</p>}


      </div>
      <div className="mx-3">
        <div className="flex justify-between px-2 border-t border-black pt-1 font-satoshi-medium">
          <span>Total</span>
          <span>₹{totalCartAmount}</span>
        </div>
        <Button
          onClick={() => {
            navigate("/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full mt-1 font-satoshi-medium"
        >
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
