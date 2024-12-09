

import {  HousePlug, LogOut, Menu, ShoppingCart , UserCog } from "lucide-react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FiShoppingBag } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import {Link,useLocation,useNavigate,
useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,
  DropdownMenuSeparator,DropdownMenuTrigger,} from "../ui/dropdown-menu";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import getSessionId from "../common/session";

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
    // ---------------------------- Menu Items for Mobile nav when open menu button   ----------------------------
    <nav className="  font-satoshi flex flex-col   text-white mb-3  lg:mb-0 lg:items-center gap-5 lg:flex-row">
      <Link to="/shop/home" className="lg:hidden flex flex-col justify-center items-center mt-8 mb-16">
          <span className=" font-dior text-white font-medium text-4xl"> HUME </span>
      </Link>
      {shoppingViewHeaderMenuItems.map((menuItem, index) => (
        <div className=" flex items-center" key={menuItem.id}>
          <Label
            onClick={() => handleNavigate(menuItem)}
            className="hover:bg-slate-700 flex justify-center text-sm cursor-pointer"
          >
            {menuItem.label}
          </Label>
          {index < shoppingViewHeaderMenuItems.length - 1 && (
            // <div className=" h-[6px] w-[6px] ml-4 bg-[#D8ABB1] rounded-full"> </div>
            <span className="text-white/50 ml-4  ">|</span>
          )}
        </div>
      ))}
    </nav>
  );
}

function HeaderRightContent() {


  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = getSessionId();


  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    const sessionId = getSessionId();
    dispatch(fetchCartItems({ userId: user?.id || null, sessionId: user ? null : sessionId }));
  }, [dispatch, user]);

  console.log(cartItems, "Cart Items");
  

  return (
    // ---------------------------------- user profile button in navbar  ----------------
    // <div className=" font-satoshi md:border-0 md:pt-0 border-t-[1px] border-gray-400  flex lg:items-center lg:flex-row  flex-col gap-4">
    //   <DropdownMenu>
    //     <DropdownMenuTrigger asChild>
    //     <div className="  flex justify-center md:pt-0 pt-5 items-center gap-1 font-light cursor-pointer"> <FiUser className=" text-white  h-6 w-6 cursor-pointer" /> <span className=" text-white lg:hidden  lg:text-base text-lg ">Profile</span>  </div>
    //     </DropdownMenuTrigger>
    //     <DropdownMenuContent side="bottom" className="w-56">
    //       <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
    //       <DropdownMenuSeparator />
    //       <DropdownMenuItem onClick={() => navigate("/shop/account")}>
    //         <UserCog className="mr-2 h-4 w-4" />
    //         Profile
    //       </DropdownMenuItem>
    //       <DropdownMenuSeparator />
    //       <DropdownMenuItem onClick={handleLogout}>
    //         <LogOut className="mr-2 h-4 w-4" />
    //         {user ? "Logout" : "Login"}
    //       </DropdownMenuItem>
    //     </DropdownMenuContent>
    //   </DropdownMenu>
    // </div>
    <div className="font-satoshi md:border-0 md:pt-0 border-t-[1px] border-gray-400 flex lg:items-center lg:flex-row flex-col gap-4">
  {user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-center md:pt-0 pt-5 items-center gap-1 font-light cursor-pointer">
          <FiUser className="text-white h-6 w-6 cursor-pointer" />
          <span className="text-white lg:hidden lg:text-base text-lg">Profile</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" className="w-56">
        <DropdownMenuLabel>Logged in as {user.userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/shop/account")}>
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
        <div className="flex justify-center md:pt-0 pt-5 items-center gap-1 font-light cursor-pointer">
          <FiUser className="text-white h-6 w-6 cursor-pointer" />
          <span className="text-white lg:hidden lg:text-base text-lg">Profile</span>
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

function ShoppingHeader() {  // ----------------- MAIN NAVBAR ------------------------
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionId = getSessionId();


  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    const sessionId = getSessionId();
    dispatch(fetchCartItems({ userId: user?.id || null, sessionId: user ? null : sessionId }));
  }, [dispatch, user]);

  console.log(cartItems, "Cart Items");
  
  

  
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky k  top-0 z-40 w-full  bg-background">

      <div className="bg-neutral-900 hidden lg:flex h-16 items-center justify-between px-4 md:px-12 lg:px-16 "> 
        <HeaderRightContent />
        <Link to="/shop/home" className="flex flex-col justify-center items-center">
            <span className=" font-dior text-white font-medium text-3xl"> HUME </span>
        </Link>
        <div className="   font-satoshi  flex items-center lg:flex-row   gap-4">
            <Sheet className="bg-red-400" open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
                <div className="relative cursor-pointer flex items-center justify-center h-10 w-10">
                <FiShoppingBag  className="   text-white w-7 h-7" onClick={() => setOpenCartSheet(true)} />
                <div className=" h-5 w-5 rounded-full bg-white absolute flex items-center justify-center top-[0px] right-[-6px]">
                  <span className="   font-satoshi-bold text-sm">
                    {cartItems?.items?.length || 0}
                  </span>
                </div>
                <span className="sr-only">User cart</span>
                </div>
              <UserCartWrapper
                setOpenCartSheet={setOpenCartSheet}
                cartItems={
                  cartItems && cartItems.items && cartItems.items.length > 0
                    ? cartItems.items
                    : []
                }
              />
            </Sheet>
        </div>
      </div>

 {/* --------------------------- MOBILE MENU & BLACK NAVBAR ------------------------ */}
      <div className="bg-black flex h-16 lg:h-10 items-center justify-between lg:justify-center  px-4 ">
      <Sheet className=" ">
          <SheetTrigger asChild>
            {/* <Button variant="ghost" size="custom_icon" className="lg:hidden p-0 m-0  bg-transparent"> */}
              <HiOutlineMenuAlt2   className=" lg:hidden p-0 m-0  bg-transparent text-white text-2xl" />
              {/* <span className="sr-only ">Toggle header menu</span> */}
            {/* </Button> */}
          </SheetTrigger>
          <SheetContent side="left" className=" flex flex-col items-center justify-between bg-gradient-to-l from-black to-neutral-900  w-full max-w-xs">
            {/* ---------------------------- TABS ---------------------------------------- */}
            <nav className="   flex flex-col   text-white mb-3  lg:mb-0 lg:items-center gap-6 lg:flex-row">
              <Link to="/shop/home" className="lg:hidden flex flex-col justify-center items-center mt-8 mb-16">
                <span className=" font-dior text-white font-medium text-4xl"> HUME </span>
              </Link>
              {shoppingViewHeaderMenuItems.map((menuItem) => (
                <Label
                onClick={() => handleNavigate(menuItem)}
                className=" font-satoshi   flex justify-center hover:bg-white text-sm cursor-pointer"
                key={menuItem.id}
                >
                  {menuItem.label}
                </Label>
              ))}
            {/* <div className="h-5 w-5 rounded-full bg-white" ></div> */}
            </nav>
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <Link to="/shop/home" className=" lg:hidden md:flex flex-col justify-center items-center">
          <span className=" font-dior text-white font-medium text-3xl"> HUME </span>
        </Link>

          <div className="lg:hidden  font-satoshi  flex items-center lg:flex-row   gap-4">
            <Sheet className="" open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
              <div className="relative cursor-pointer flex items-center justify-center h-10 w-10">
                <FiShoppingBag  className="   text-white w-7 h-7" onClick={() => setOpenCartSheet(true)} />
                <div className=" h-5 w-5 rounded-full bg-white absolute flex items-center justify-center top-[0px] right-[-6px]">
                  <span className="   font-satoshi-bold text-sm">
                    {cartItems?.items?.length || 0}
                  </span>
                </div>
                <span className="sr-only">User cart</span>
              </div>
              <UserCartWrapper
                setOpenCartSheet={setOpenCartSheet}
                cartItems={
                  cartItems && cartItems.items && cartItems.items.length > 0
                    ? cartItems.items
                    : []
                }
              />
            </Sheet>
          </div>


          <div className="hidden lg:block">
            <MenuItems />
          </div>

{/* 
        <div className="hidden lg:block  items-center ">
          <div className=" font-satoshi  flex items-center lg:flex-row   gap-4">
            <Sheet  open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
              <Button
                onClick={() => setOpenCartSheet(true)}
                variant="ghost"
                size="custom_icon"
                className="relative outline-none ho bg-transparent border-none"
              >
                <ShoppingCart  className=" text-white w-10 h-10" />
                <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
                  {cartItems?.items?.length || 0}
                </span>
                <span className="sr-only">User cart</span>
              </Button>
              <UserCartWrapper
                setOpenCartSheet={setOpenCartSheet}
                cartItems={
                  cartItems && cartItems.items && cartItems.items.length > 0
                    ? cartItems.items
                    : []
                }
              />
            </Sheet>
            <HeaderRightContent />
          </div>
        </div> */}


      </div>
    </header>
  );
}

export default ShoppingHeader;