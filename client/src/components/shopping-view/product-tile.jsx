import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Link } from "react-router-dom";
// import { Badge } from "../ui/badge";
import ShinyButton from "@/components/ui/shiny-button";


function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    
      <Card className="relative flex flex-col justify-between hover:bg-neutral-100 font-satoshi w-full rounded-sm max-w-sm p-0 sm:p-1 mx-auto">
        {/* <div className="absolute flex items-center  bg-white z-10 top-0 right-0 text-base rounded-bl-lg md:text-2xl "> <span className=" text-sm md:text-lg">⭐<span className="font-thin text-sm pr-1">4.5 </span></span> </div> */}
        <Link onClick={() => handleGetProductDetails(product?._id)} to={`/shop/product/${product?._id}`} >
          <div className="relative bg-neutral-100">
            <img
              src={product?.images[0]}
              alt={product?.title}
              className="w-full h-[170px] md:h-[250px] lg:h-[300px] object-cover "
            />
            {/* {product?.totalStock === 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                {`Only ${product?.totalStock} items left`}
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Sale
              </Badge>
            ) : null} */}
          </div>
          <CardContent className="p-1 ">
            <h2 className=" text-lg text-black font-satoshi font-medium text-center lg:text-xl mb-1 lg:mb-2">{product?.title}</h2>
            <div className="flex  justify-center items-center  mb-2">
              <span className=" text-xs font-satoshi-light lg:text-[16px] text-neutral-700 ">
              {product?.subtitle}
              </span>
            </div>
            <div className="flex justify-center  items-center mb-2">
              <span className=" text-black text-lg lg:text-xl" >₹{product?.price}</span>
            </div>
          </CardContent>
        </Link>
        <CardFooter className=" p-0">
          {product?.totalStock === 0 ? (
            <Button className="w-full opacity-60 cursor-not-allowed">
              Out Of Stock
            </Button>
          ) : (
            
            <Button
              onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
              className="w-full  bg-neutral-800 hover:bg-neutral-700 text-xs rounded-sm "
            >
                ADD TO CART

            </Button>
      
          )}
        </CardFooter>
      </Card>
  );
}

export default ShoppingProductTile;
