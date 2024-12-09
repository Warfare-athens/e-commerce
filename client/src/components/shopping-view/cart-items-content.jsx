import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast"

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  
  function handleUpdateQuantity(getCartItem, typeOfAction) {
    
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }

  return (
    <div className="flex items-center mx-2 p-3  border border-neutral-300  rounded ">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className=" sm:w-24 sm:h-24  w-16 h-16 bg-neutral-200 mr-2 sm:mr-3 rounded object-cover"
      />

      <div className="flex flex-col justify-between h-full w-full">
        <div className=" flex justify-between items-center w-full ">
          <div><h3 className="font-satoshi text-sm sm:text-base">{cartItem?.title}</h3></div>
          <div><p className="font-satoshi-medium   text-sm sm:text-base ">₹{cartItem.price}</p></div>
        </div>
        <div className=" flex items-center justify-between w-full gap-2 mt-1">
          <div className=" flex rounded-md bg-white overflow-hidden items-center">
          <Button
            variant="outline"
            className=" h-6 w-6 sm:h-8 sm:w-8 rounded-md"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-satoshi-medium text-sm sm:text-base mx-2">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className=" h-6 w-6 sm:h-8 sm:w-8 rounded-md"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          </div>
          <div>
            <Trash
            onClick={() => handleCartItemDelete(cartItem)}
            className="cursor-pointer rounded border border-neutral-300 text-red-500 font-bold p-1 bg-white"
            size={24}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default UserCartItemsContent;