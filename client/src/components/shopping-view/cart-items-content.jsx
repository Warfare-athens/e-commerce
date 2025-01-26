import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { removeLocalCartItem, setLocalCartItems, updateLocalCartItem } from "@/store/shop/localcart-slice";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();



  // console.log('cartitems in cart content ----' , cartItem)


 
  const handleUpdateQuantity = (typeOfAction) => {
    if (user) {
      dispatch(
        updateCartQuantity({
          userId: user.id,
          productId: cartItem?.productId,
          quantity: typeOfAction === "plus" ? cartItem?.quantity + 1 : cartItem?.quantity - 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Cart item is updated successfully",
          });
        }
      });
    } else {
      // Use Redux action to update localCartItems
      const newQuantity = typeOfAction === "plus" ? cartItem?.quantity + 1 : cartItem?.quantity - 1;
      dispatch(updateLocalCartItem({ productId: cartItem?.productId, quantity: newQuantity }));
  
      toast({
        title: "Cart item is updated successfully",
      });
    }
  };
  

  const handleDeleteCartItem = () => {
    if (user) {
      dispatch(deleteCartItem({ userId: user.id, productId: cartItem?.productId })).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Item removed from cart",
          });
        }
      });
    } else {
      dispatch(removeLocalCartItem({ productId: cartItem?.productId}));
      setLocalCartItems(updatedItems);
      toast({
        title: "Item removed from cart",
      });
    }
  };

  return (
    <div className="flex items-center mx-2  p-2 border border-neutral-300 rounded">
      <img
        src={cartItem?.images?.[0] }
        alt={cartItem?.title}
        className="sm:min-w-24 sm:h-24 w-16 h-16 bg-neutral-200 mr-2 sm:mr-3 rounded object-cover"
      />

      <div className="flex flex-col justify-between h-full w-full">
        <div className="flex justify-between items-center w-full">
          <div>
            <h3 className="font-satoshi text-sm sm:text-base">{cartItem?.title}</h3>
          </div>
          <div>
            <p className="font-satoshi-medium text-sm sm:text-base">₹{cartItem?.price}</p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-2 mt-1">
          <div className="flex rounded-md bg-white overflow-hidden items-center">
            <Button
              variant="outline"
              className="h-6 w-6 sm:h-8 sm:w-8 rounded-md"
              size="icon"
              disabled={cartItem?.quantity === 1}
              onClick={() => handleUpdateQuantity("minus")}
            >
              -
            </Button>
            <span className="font-satoshi-medium text-sm sm:text-base mx-2">{cartItem?.quantity}</span>
            <Button
              variant="outline"
              className="h-6 w-6 sm:h-8 sm:w-8 rounded-md"
              size="icon"
              onClick={() => handleUpdateQuantity("plus")}
            >
              +
            </Button>
          </div>
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDeleteCartItem}
              className=" h-8 w-8"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"  className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>

            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
