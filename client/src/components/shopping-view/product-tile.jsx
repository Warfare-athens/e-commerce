import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Link } from "react-router-dom";
// import { Badge } from "../ui/badge";


function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    
      <Card className="relative flex flex-col lg:w-72 xl:w-72  justify-between bg-[#edede9]  hover:bg-neutral-100 font-satoshi  rounded-sm max-w-sm p-0 sm:p-1 ">
        {/* <div className="absolute flex items-center  bg-white z-10 top-0 right-0 text-base rounded-bl-lg md:text-2xl "> <span className=" text-sm md:text-lg">⭐<span className="font-thin text-sm pr-1">4.5 </span></span> </div> */}
        <Link onClick={() => handleGetProductDetails(product?._id)} to={`/product/${product?._id}`}>
        <div className="relative  bg-neutral-100">
            <img
              src={product?.images[0]}
              alt={product?.title}
              className="  w-full h-[180px] md:h-[250px] lg:[300px] object-cover "
            />
          </div>

          <CardContent className="p-1 ">
            <h2 className=" text-lg text-black font-satoshi md:font-satoshi-medium  lg:text-xl mb-1 lg:mb-2">{product?.title}</h2>
            <div className=" mb-2">
              <span className="  text-xs font-satoshi-light md:font-satoshi md:text-[15px] text-neutral-700 ">
              {product?.subtitle}
              </span>
            </div>
            <div className=" mb-2">
              <span className=" text-black font-satoshi md:font-satoshi-medium text-lg lg:text-xl" >₹{product?.price}</span>
            </div>
          </CardContent>
        </Link>
        <CardFooter className=" p-0">
          {product?.totalStock === 0 ? (
            <Button className="w-full opacity-60 cursor-not-allowed">
              Out Of Stock
            </Button>
          ) : (
            
            <button
              onClick={() => {
                console.log('product ------' ,product);
                handleAddtoCart(product)
              }}
              className=" font-satoshi-medium text-[12px] sm:text-[15px] w-full text-white py-3   bg-neutral-800 hover:bg-neutral-700  rounded-sm "
            >
                ADD TO CART

            </button>
      
          )}
        </CardFooter>
      </Card>
  );
}

export default ShoppingProductTile;


