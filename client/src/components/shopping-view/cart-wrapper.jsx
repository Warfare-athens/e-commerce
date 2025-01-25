


// import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";
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

  const totalCartAmount = combinedCartItems?.reduce(
    (sum, currentItem) =>
      sum + ((currentItem?.Price > 0 ? currentItem?.Price : currentItem?.price) * currentItem?.quantity),
    0
  );

console.log('combinedCart items in wrapper ---------------------',combinedCartItems);



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
        <SheetTitle className="text-white text-center mt-3 mb-4 font-satoshi-bold">Your Cart</SheetTitle>
      </SheetHeader>

  {/* <div className=" relative  overflow-hidden"> */}


      <div className="mt-2">
        <div className="relative h-4 mx-2 mr-3 flex items-center font-satoshi">
          <Progress value={progress} className="mt-2 w-full" />
          <div
            className={`absolute top-0 left-[30%] flex justify-center items-center w-6 text-black   rounded-full ${
              totalCartAmount > 700 ? 'bg-green-500 text-white' : 'bg-gray-300'
            }`}
          >
            {totalCartAmount > 700 ? '✓' : '1'}
          </div>
          <div
            className={`absolute top-0 left-[60%] flex justify-center items-center w-6  text-black   rounded-full ${
              totalCartAmount > 1400 ? 'bg-green-500 text-white' : 'bg-gray-300'
            }`}
          >
            {totalCartAmount > 1400 ? '✓' : '2'}
          </div>
          <div
            className={`absolute top-0 left-[95%] flex justify-center items-center w-6   text-black  rounded-full ${
              totalCartAmount > 1900 ? 'bg-green-500 text-white' : 'bg-gray-300'
            }`}
          >
            {totalCartAmount > 1900 ? '✓' : '3'}
          </div>
        </div>
        <div className=" relative w-full mt-2 font-satoshi-light text-sm ">
            <div className=" absolute left-[29%]">
              Gift 1
            </div>
            <div className=" absolute left-[58%]">
              Gift 2
            </div>
            <div className=" absolute left-[90%]">
              Gift 3
            </div>
          </div>
      </div>

      <div className="mt-8 text-black  space-y-4">
        {combinedCartItems
            ? combinedCartItems.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
          : <p>Your cart is empty.</p>}
      </div>


      <SheetFooter className=" flex flex-col absolute bottom-0 mb-2 px-2 mt-1 w-full">
        <div className="flex justify-between px-2 border-t border-black  pt-[2px]  font-satoshi-medium">
          <span>Total</span>
          <span >₹{totalCartAmount}</span>
        </div>
        <Button
          onClick={() => {
            navigate("/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full h-[45px]  font-satoshi-medium"
        >
          Checkout
        </Button>
      </SheetFooter>


  {/* </div> */}

    </SheetContent>
  );
}

export default UserCartWrapper;
