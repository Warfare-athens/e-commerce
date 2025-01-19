import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, setProductDetails } from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { Link, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import star from '@/assets/icons/star.png';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductDetailsCarousel from "@/components/shopping-view/productsImagesCrousel";

const ProductPage = () => {
  const { productDetails, isLoading, productList } = useSelector((state) => state.shopProducts);
  const { id } = useParams(); // Get the product ID from the URL
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
    return () => {
      dispatch(setProductDetails());
    };
  }, [dispatch, id]);

  const handleAddToCart = (getCurrentProductId, getTotalStock) => {
  
    let getCartItems = cartItems.items || [];
  
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }
  
  
    dispatch(
      addToCart({
        userId: user?.id ,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems( user?.id ));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <h1 className="company-name text-white text-6xl z-10 font-dior bg-clip-text text-transparent sparkle-tex">HUME</h1>
        <div>
          <h3 className="font-satoshi">Please wait, Product is loading</h3>
          <div className="animate-spin md:h-32 md:w-32 h-20 w-20"><AiOutlineLoading3Quarters /></div>
        </div>
      </div>
    );
  }

  if (!productDetails) {
    return <p>No product found</p>;
  }

  return (
    <div className=" w-full py-5 lg:py-20 bg-gradient-to-br bg-neutral-100">
      <div className= "w-full max-w-[1280px] px-5 md:px-10 mx-auto ">
        <div className="flex font-satoshi flex-col lg:flex-row gap-[50px] lg:gap-[100px] w-full max-w-[1280px]  md:px-10 mx-auto">
        <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
        <ProductDetailsCarousel images={productDetails.images} />
        </div>
        <div className="flex-[1]">
          <h1 className="text-[35px] font-satoshi-medium mb-2 leading-tight">
            {productDetails.title}
          </h1>

          <div className="text-[15px] font-satoshi-light text-black/[0.8]">
          {productDetails.subtitle} 
          </div>

          <h4 className="text-sm font-satoshi text-black mt-4">SIZE : 30ml</h4>

          <div className="flex mt-7 mb-6">
            <img className="w-4 h-4" src={star} alt="" />
            <img className="w-4 h-4" src={star} alt="" />
            <img className="w-4 h-4" src={star} alt="" />
            <img className="w-4 h-4" src={star} alt="" />
            <img className="w-4 h-4" src={star} alt="" />
            <span className="ml-3 text-sm font-satoshi-medium text-black/[0.5] cursor-pointer">23 Reviews</span>
          </div>

          <p className="hidden md:block text-base text-black/[0.8] mb-10 "> {productDetails.description}</p>
          

          <div className="flex mb-5 items-center">
            <p className="mr-2 text-3xl font-satoshi-medium">
              &#8377;{productDetails.price}
            </p>
            {productDetails.salePrice && (
              <>
                <p className="text-base mr-5 font-medium line-through">
                  &#8377;{productDetails.salePrice}
                </p>
                <p className="text-base text-neutral-400">incl. of taxes</p>
              </>
            )}
          </div>

          <button className="w-full mt-4 py-4 rounded-lg bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
            onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
          >
            ADD TO CART
          </button>

          <p className=" md:hidden text-base text-black/[0.8] mt-7 "> {productDetails.description}</p>

        </div>
        </div> 

        <div className=" ">
            {/* -------------------BENEFITS SECTION------------------  */}
          <div className="my-10 sm:px-10 md:px-20 w-full">
            <h1 className=" font-satoshi-medium text-2xl mb-4">BENEFITS −</h1>
            <div className="flex flex-col items-center justify-between mx-0 md:mx-10 md:flex-row gap-10">
              <div className=" md:hidden flex justify-center w-full md:w-[30%]">
                <img
                className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-cover rounded-2xl "
                src="https://cdn.shopify.com/s/files/1/0286/5450/1993/files/Sunprotection_desk_720x.jpg?v=1576433699"
                alt=""
                />
              </div>
              <div className=" w-full md:w-[70%] flex items-center">
                <p className=" font-satoshi-light leading-7 text-base">
                  {productDetails.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </p>
              </div>
              <div className=" hidden md:block flex justify-center w-full md:w-[30%]">
                <img
                className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-cover rounded-2xl"
                src="https://cdn.shopify.com/s/files/1/0286/5450/1993/files/Sunprotection_desk_720x.jpg?v=1576433699"
                alt=""
                />
              </div>
            </div>
          </div>
          {/* -------------------INGREDIENTS SECTION------------------  */}
          <div className="my-10 sm:px-10 md:px-20 w-full">
            <h1 className=" font-satoshi-medium text-2xl mb-4">INGREDIENTS −</h1>
            <div className="flex flex-col items-center mx-0 md:mx-10 md:flex-row gap-10">
              <div className=" flex justify-center w-full md:w-[30%]">
                <img
                className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-cover rounded-2xl"
                src="https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/topic_centers/2019-4/11980-BEAUTY_-_EXPLAINER_-_Most_Powerful_Ingredient_Combos_for_Your_Shelf-header-1296x728.jpg?w=1155&h=1528"
                alt=""
                />
              </div>
              <div className=" w-full md:w-[60%] flex items-center">
                <p className=" font-satoshi-light leading-7 text-base">
                  {productDetails.ingredients.join('  ||  ')}
                </p>
              </div>
            </div>
          </div>
        </div>

      <div className=" sm:px-10 my-5 md:my-16 md:px-20 w-full max">
        <Accordion type="single" collapsible className="font-satoshi  w-full">
    
          <AccordionItem value="item-1">
            <AccordionTrigger className=" font-satoshi-medium  border-b-[1px] border-black text-xl ">HOW TO USE ?</AccordionTrigger>
            <AccordionContent className="font-satoshi-light text-md px-1">
              <p className=" font-satoshi-light  text-base">
                {productDetails.howToUse.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </p>
            </AccordionContent>
          </AccordionItem>    
         
          <AccordionItem value="item-2">
            <AccordionTrigger className=" font-satoshi-medium  border-b-[1px] border-black text-xl ">Q / A 's </AccordionTrigger>
            <AccordionContent className="font-satoshi-light text-md px-1">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className=" my-10  w-full  ">
        <h2 className="font-satoshi-bold text-2xl pb-5">RELATED PRODUCTS -</h2>
        {productList && productList.length > 0
          ? (
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent className=" gap-4 lg:gap-8">
                {productList.map((productItem) => (
                    <Link key={productItem._id} to={`/product/${productItem._id}`}>
                        <CarouselItem key={productItem._id} className="  text-black basis-1/2 sm:basis-1/3 lg:basis-1/4">
                            <div className=" flex flex-col  justify-around  h-72 w-52 md:h-96 md:w-64 border border-neutral-300 overflow-hidden rounded-lg">
                              <div className="aspect-square mx-2 my-2  h-full  flex overflow-hidden justify-center bg-neutral-200 ">
                                  <img className="object-cover h-full w-full rounded-md" src={productItem?.images[0]} alt={productItem?.title} />
                              </div>
                              <div className="mb-2 w-40 md:w-60">
                                  <h3 className="font-satoshi-medium text-base md:text-lg px-2">{productItem?.title}</h3>
                                  <h3 className="font-satoshi text-lg px-2">₹{productItem?.price}</h3>
                              </div>
                            </div>
                        </CarouselItem>
                    </Link>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )
          : null}
      </div>
      {/* -------------------write a review card------------------  */}
      <div className="my-10 font-satoshi sm:px-10 md:px-20 w-full">
        <h1 className="text-2xl font-satoshi-medium mb-4">Customer Review's −</h1>
        <div className=" flex w-full rounded-xl border bg-gradient-to-bl from-neutral-200 via-neutral-300 to-neutral-300">
          <div className=" h-full hidden md:block  py-7 px-4 w-1/2">
            <div className="flex items-center text-satoshi-medium text-xl ">5<img className=" w-5 h-5" src={star} /> 
              <div className="ml-2 h-2 w-60 rounded-full bg-neutral-100"> 
                <div className="h-full w-[80%] rounded-full bg-neutral-600"> 
                </div> 
              </div> 
            </div>
            <div className="flex items-center text-satoshi-medium text-xl ">4<img className=" w-5 h-5" src={star} /> <div className="ml-2 h-2 w-60 rounded-full bg-neutral-100"> <div className="h-full w-[40%] rounded-full bg-neutral-600"> </div> </div> </div>
            <div className="flex items-center text-satoshi-medium text-xl ">3<img className=" w-5 h-5" src={star} /> <div className="ml-2 h-2 w-60 rounded-full bg-neutral-100"> <div className="h-full w-[20%] rounded-full bg-neutral-600"> </div> </div> </div>
            <div className="flex items-center text-satoshi-medium text-xl ">2<img className=" w-5 h-5" src={star} /> <div className="ml-2 h-2 w-60 rounded-full bg-neutral-100"> <div className="h-full w-[10%] rounded-full bg-neutral-600"> </div> </div> </div>
            <div className="flex items-center text-satoshi-medium text-xl ">1<img className=" w-5 h-5" src={star} /> <div className="ml-3 h-2 w-60 rounded-full bg-neutral-100"> <div className="h-full w-[5%] rounded-full bg-neutral-600"> </div> </div> </div>
          </div>
          <div>
          <div className="flex items-center pl-3 pt-7 w-full ">
              <h1 className="font-satoshi-medium pr-3 text-5xl">{productDetails.averageReview}</h1>
              <div >
                <div className=" flex">
                  <img className="w-8 h-8" src={star} alt="" />
                  <img className="w-8 h-8" src={star} alt="" />
                  <img className="w-8 h-8" src={star} alt="" />
                  <img className="w-8 h-8" src={star} alt="" />
                  <img className="w-8 h-8" src={star} alt="" />
                </div>
                <p>Based on 56 Reviews</p>
              </div>
          </div>
          <button className="  h-10 font-satoshi-medium px-6 ml-3 my-7 rounded-full bg-black text-white">
            Write a Review
          </button>
          </div>
        </div>  
      </div>

      </div>
    </div>
  );
};

export default ProductPage;
