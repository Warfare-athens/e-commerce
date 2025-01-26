import { Outlet } from "react-router-dom";
import ShoppingHeader from "../shopping-view/header";

function AuthLayout() {
  return (
    <div className=" min-h-screen w-full">
      <ShoppingHeader />
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;