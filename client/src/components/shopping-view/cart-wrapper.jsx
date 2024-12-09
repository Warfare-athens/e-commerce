import * as React from "react";
import { Progress } from "@/components/ui/progress"
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  // const [progress, setProgress] = React.useState(1)
  
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   const timer = setTimeout(() => setProgress(30), 500)
  //   return () => clearTimeout(timer)
  // }, [])

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce( (sum, currentItem) =>
            sum + ((currentItem?.Price > 0 ? currentItem?.Price: currentItem?.price) * currentItem?.quantity),
          0
        )
      : 0;


  const calculateProgress = (amount) => {
    if (amount > 1900) return 100;
    if (amount > 1400) return 100 * (amount / 1900);
    if (amount > 700) return 100 * (amount / 1900);
    return 100 * (amount / 1900);
  };
  const progress = calculateProgress(totalCartAmount);

  return (
    <SheetContent className=" overflow-scroll overflow-x-hidden  bg-gradient-to-br from-white via-neutral-100  to-neutral-50 text-black sm:max-w-md">
      <SheetHeader className="bg-black">
        <SheetTitle className="text-white  mt-2 mb-4 font-satoshi-bold">Your Cart</SheetTitle>
      </SheetHeader>
      
      <div className=" mt-2">
        <div className="relative h-4 mx-2 mr-3 flex items-center font-satoshi ">
          <Progress value={progress} className=" mt-2 w-full" />
          <div
            className={`absolute top-0 left-[30%] transform -translate-x-1/2 h-6 w-6 text-black pl-[7px] text-[16px] rounded-full ${
              totalCartAmount > 700 ? 'bg-green-500 text-white ' : 'bg-gray-300'
            }`}
          >
            {totalCartAmount > 700 ? '✓' : '1'}
          </div>
          <div
            className={`absolute   top-0 left-[60%] transform -translate-x-1/2 h-6 w-6 text-black pl-[6px] pt-[1px] text-[16px] rounded-full ${
              totalCartAmount > 1400 ? 'bg-green-500 text-white' : 'bg-gray-300'
            }`}
          >
            {totalCartAmount > 1400 ? '✓' : '2'}
          </div>
          <div
            className={`absolute  top-0 left-[100%] transform -translate-x-1/2 h-6 w-6 text-black pl-[6px] pt-[1px] text-[16px] rounded-full ${
              totalCartAmount > 1900 ? 'bg-green-500 text-white' : 'bg-gray-300'
            }`}
          >
            {totalCartAmount > 1900 ? '✓' : '3'}
          </div>
        </div>
      </div>
      <div className="relative h-14 mt-2 flex items-center font-satoshi-light ">
        <div className="absolute leading-4 top-0 left-[20%] w-20 sm  text-black  text-[12px] ">
          <span > 
            Balancing Night  Cream 
          </span>
          <br /> 
          <span> at 
            <span className="text-[12px] font-satoshi-medium"> ₹799 
          </span> 
          </span>
        </div>
        <div className="absolute leading-4 top-0 left-[50%] sm:left-[55%] w-20  text-black  text-[12px] ">
          <span > 
            Brigntening SUnscreen 
          </span>
          <br /> 
          <span> at 
            <span className="text-[12px] font-satoshi-medium"> ₹1399 
          </span> 
          </span>
        </div>
        <div className="absolute leading-4 top-0 left-[82%] sm:left-[90%] w-20  text-black  text-[12px] ">
          <span > 
            Under Eye Cream 
          </span>
          <br /> 
          <span> at 
            <span className="text-[12px] font-satoshi-medium"> ₹1899
          </span> 
          </span>
        </div>
      </div>

      <div className="  mt-2  text-black space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent key={item.productId} cartItem={item} />)
          : null}
      </div>
      <div className="mx-3   ">
        <div className="flex justify-between px-2  border-t border-black pt-1 font-satoshi-medium">
          <span >Total</span>
          <span >₹{totalCartAmount}</span>
        </div>
        <Button variant=""
          onClick={() => {
            navigate("/shop/checkout");
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