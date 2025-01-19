import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
// import ErrorBoundary from "../common/errorBoundary";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        {/* <ErrorBoundary> */}
        <Outlet />
        {/* </ErrorBoundary> */}
      </main>
    </div>
  );
}

export default ShoppingLayout;