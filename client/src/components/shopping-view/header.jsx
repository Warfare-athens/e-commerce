
import { LogOut, ShoppingBag, UserCog } from "lucide-react";
import { CgMenuLeft } from "react-icons/cg";
// import { IoBagHandleOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { motion , useMotionValueEvent, useScroll } from "framer-motion";
import { array } from "zod";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }
  return (
    <nav className="font-satoshi flex flex-col text-white mb-3 lg:mb-0 lg:items-center  lg:flex-row">
      <Link to="/" className="lg:hidden flex flex-col justify-center items-center mt-8 mb-16">
        <span className="font-dior text-white font-medium text-4xl">HUME</span>
      </Link>
      {shoppingViewHeaderMenuItems.map((menuItem, index) => (
        <div className="flex items-center  " key={menuItem.id}>
          <Label
            onClick={() => handleNavigate(menuItem)}
            className="hover:bg-white/10 px-4 py-2 flex justify-center text-sm cursor-pointer"
          >
            {menuItem.label}
          </Label>
          {index < shoppingViewHeaderMenuItems.length - 1 && (
            <span className="text-white/50 ">|</span>
          )}
        </div>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }
  return (
    <div className="font-satoshi md:border-0 md:pt-0  flex lg:items-center lg:flex-row flex-col gap-4">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-center md:pt-0 pt-5 items-center gap-1 font-light cursor-pointer">
              <FiUser className="text-white h-6 w-6 cursor-pointer" />
              <span className="text-white  lg:hidden lg:text-base text-lg">Profile</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" className="w-56">
            <DropdownMenuLabel>Logged in as {user.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/account")}>
              <UserCog className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-center md:pt-0   items-center gap-1 font-light cursor-pointer">
              <FiUser className="text-white h-8 w-8 cursor-pointer" />
              <span className="text-white font-satoshi-medium lg:hidden lg:text-base text-xl">Profile</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" className="w-56">
            <DropdownMenuItem onClick={() => navigate("/auth/login")}>
              <LogOut className="mr-2 h-4 w-4" />
              Login / Register
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

function ShoppingHeader() {

  // ___________________________FRAMER MOTION ANIMATION FOR NAVBAR______________________________
  const {scrollY} = useScroll()
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();
    if (latest > prev && latest > 100) {
      setHidden(true)
    } else {  
      setHidden(false)
    }
  })
  // ___________________________FRAMER ANIMATION END______________________________

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [openCartSheet, setOpenCartSheet] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [dispatch, user]);


  const { cartItems } = useSelector((state) => state.shopCart);
  const { localCartItems } = useSelector((state) => state.localCart);
  const combinedCartItems = cartItems?.items?.length > 0 ? [...cartItems?.items] : localCartItems;
  // console.log('combinedCartItems in header', combinedCartItems)




  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }


  return (
    <div 
    className="navbar sticky top-0 z-40 w-full bg-background">
      <div className="bg-neutral-900 hidden lg:flex h-16 items-center justify-between px-4 md:px-12 lg:px-16">
        <HeaderRightContent />
        <Link to="/" className="flex flex-col justify-center items-center">
          <span className="font-dior text-white font-medium text-3xl">HUME</span>
        </Link>
        <div className="font-satoshi flex items-center lg:flex-row gap-4">
          <Sheet className="bg-red-400" open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
            <div className="relative cursor-pointer flex items-center justify-center h-10 w-10">
              <ShoppingBag strokeWidth={1.25} className="text-white w-7 h-7" onClick={() => setOpenCartSheet(true)} />
              <div className="h-[18px] w-[18px] rounded-full bg-white absolute flex items-center justify-center top-[0px] right-[-6px]">
                <span className="font-satoshi-bold text-sm">
                  {cartItems?.items?.length > 0
                    ? cartItems.items.reduce((total, item) => total + item.quantity, 0)
                    : localCartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>
              <span className="sr-only">User cart</span>
            </div>



            <UserCartWrapper
              setOpenCartSheet={setOpenCartSheet}
              cartItems={
                  combinedCartItems?.length > 0
                  ? combinedCartItems
                  : []
              }
            />

            

          </Sheet>
        </div>
      </div>

      <div className="bg-black flex h-16 lg:h-10 items-center justify-between lg:justify-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <CgMenuLeft className="lg:hidden p-0 m-0 bg-transparent cursor-pointer text-white text-[27px]" />
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col   bg-gradient-to-l from-black to-neutral-900 w-full max-w-xs">
            <nav className="flex flex-col text-white mb-16 lg:mb-0 lg:items-center gap-6 lg:flex-row">
              <Link to="/" className="lg:hidden flex flex-col justify-center items-center mt-6 mb-10 pb-6">
                <span className="font-dior text-white font-medium text-4xl">HUME</span>
              </Link>
              {shoppingViewHeaderMenuItems.map((menuItem) => (
                <Label
                  onClick={() => handleNavigate(menuItem)}
                  className="font-satoshi-light flex justify-center hover:bg-white/30 text-2xl cursor-pointer"
                >
                  {menuItem.label}
                </Label>
              ))}
            </nav>
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <Link to="/" className="lg:hidden md:flex flex-col justify-center items-center">
          <span className="font-dior text-white font-medium text-3xl">HUME</span>
        </Link>

        <div className="lg:hidden font-satoshi flex items-center lg:flex-row gap-4">
          <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
            <div className="relative cursor-pointer flex items-center justify-center h-10 w-10">
              <ShoppingBag strokeWidth={1.25}  className="text-white w-7 h-7" onClick={() => setOpenCartSheet(true)} />
              <div className="h-5 w-5 rounded-full bg-white absolute flex items-center justify-center top-[0px] right-[-6px]">
                <span className="font-satoshi-medium text-sm">
                  {cartItems?.items?.length > 0
                    ? cartItems.items.reduce((total, item) => total + item.quantity, 0)
                    : localCartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>
              <span className="sr-only">User cart</span>
            </div>


            <UserCartWrapper
              setOpenCartSheet={setOpenCartSheet}
              combinedCartItems={
                 combinedCartItems?.length > 0
                  ? combinedCartItems
                  : []
              }
            />



          </Sheet>
        </div>

        <div className="hidden lg:block">
          <MenuItems />
        </div>
      </div>
    </div>
  );
}

export default ShoppingHeader;
