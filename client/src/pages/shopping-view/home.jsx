import { Button } from "@/components/ui/button";
import { bodyCare,brain,faceCare,sleep,heart,menFaceCare,supplements,eye} from '@/assets';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft , FaChevronRight } from "react-icons/fa6";
import {BsArrowDownRight} from "react-icons/bs"
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast"
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
// import { Card, CardContent } from "@/components/ui/card";
import { MarqueeDemo } from "@/components/common/reviews";
import cover1 from '@/assets/cover/cover1.webp';
import cover2 from '@/assets/cover/cover2.webp';
import { TfiLocationArrow } from "react-icons/tfi";
import getSessionId from "@/components/common/session";
import VideoSection from "@/components/common/video";







const categoriesWithIcon = [
  { id: "bodyCare", label: "Body Care", icon: bodyCare },
  { id: "brainCare", label: "Brain Health", icon: brain },
  { id: "faceCare", label: "Face Care", icon: faceCare },
  { id: "sleep", label: "Sleep", icon: sleep },
  { id: "heart", label: "Heart", icon: heart },
  { id: "menFaceCare", label: "Men's Face Care", icon: menFaceCare },
  { id: "supplements", label: "Supplements", icon: supplements },
  { id: "eye", label: "Eye", icon: eye },
];


function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  // const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId))
    .then(() => navigate(`/shop/product/${getCurrentProductId}`));
  }


  
  const handleAddtoCart = (productId, quantity) => {

    const sessionId = getSessionId();
  
    const payload = {
      productId,
      quantity : 1,
      userId: user?.id || null,
      sessionId: user ? null : sessionId,
    };
  
    dispatch(
      addToCart(payload)).then((data) => {
        if (data?.payload?.success) {
            dispatch(fetchCartItems({ userId: user?.id || null, sessionId: user ? null : sessionId }));
      }
    });
  };

  // function handleAddtoCart(getCurrentProductId) {
  //   dispatch(
  //     addToCart({
  //       userId: user?.id,
  //       productId: getCurrentProductId,
  //       quantity: 1,
  //     })
  //   ).then((data) => {
  //     if (data?.payload?.success) {
  //       dispatch(fetchCartItems(user?.id));
  //       toast({
  //         title: "Product is added to cart",
  //       });
  //     }
  //   });
  // }



  // useEffect(() => {
  //   if (productDetails !== null) setOpenDetailsDialog(true);
  // }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);


  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  

  return (
    <div className="flex flex-col  min-h-screen">

      <div>
        <div className="flex md:flex justify-evenly md:px-16 h-[300px] md:h-[500px] w-full ">
          <div className=" h-[330px] w-[55%] md:h-[500px] md:w-[60%]  max-w-[500px] ">
            <img className=" w-full h-full" src={cover1} alt="" />
          </div>
          <div className="h-[270px] w-[45%] md:w-[40%] md:h-[350px] max-w-[400px] ">
            <img src={cover2} className="w-full h-full" alt="s" />       
            <h2 className=" mt-2 hidden md:block font-satoshi text-2xl">Elevate Your Essence: <br/> <span className="  font-satoshi-bold  "> Luxurious Care, Trusted Results. </span></h2>    
            <button className="hidden md:flex h-16 w-[300px] text-xl mt-3 justify-center items-center gap-4  bg-white border-2 border-black text-black font-satoshi-medium">ORDER <TfiLocationArrow className=" rotate-90 text-2xl " /></button>
          </div>
        </div>
        <div className="flex md:hidden  pl-5 flex-col  mt-20">
          <h2 className=" font-satoshi text-2xl">Elevate Your Essence: <br/> <span className="  font-satoshi-bold"> Luxurious Care, Trusted Results. </span></h2>    
          <button className=" h-14 w-[250px] mt-3 md:mt-12 text-lg flex justify-center items-center gap-3  bg-white border-2 border-black text-black font-satoshi-medium">ORDER <TfiLocationArrow  className="rotate-90 text-2xl" /></button>
        </div>
      </div>
      

      {/* <div className="relative w-full  h-[400px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full px-0 lg:px-16 h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute h-20 top-1/2 left-0 md:left-4 rounded-none transform -translate-y-1/2 bg-white/80"
        >
          <FaChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline" 
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute h-20 rounded-none top-1/2 right-0 md:right-4 transform -translate-y-1/2 bg-white/80"
        >
          <FaChevronRight className="w-4 h-4" />
        </Button>
      </div>  */}



      <section className="py-12 font-satoshi ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 place-items-center">
            {categoriesWithIcon.map((categoryItem) => (
              <div
                key={categoryItem.id}
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                className="h-32 w-32 relative cursor-pointer rounded-xl overflow-hidden hover:scale-105 transition-shadow"
              >
                <img
                  src={categoryItem.icon}
                  className="object-cover h-full w-full"
                  alt={categoryItem.name}
                />
                <div className="absolute bottom-0 w-full bg-white/50 text-center">
                  <span className="text-sm text-center pb-2 h-5 w-full text-black font-satoshi-medium">
                    {categoryItem.label.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 font-satoshi">
        <div className="container mx-auto px-4">
        <div className="flex justify-center  items-center mb-4 space-x-4">
        <Link to="/shop/listing" className="hover:border-b-2 border-black cursor-pointer flex items-center justify-center gap-3">
            <h2 className="text-3xl font-satoshi-medium text-black h-full  text-center ">
              OUR BESTSELLER
            </h2>
            <BsArrowDownRight className=" text-black text-3xl duration-100 -rotate-45 hover:-rotate-90"/> 
          </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {productList && productList.length > 0
              ? productList.slice(0, 4).map((productItem) => ( 
                  <ShoppingProductTile key={productItem._id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <section className="py-12 font-satoshi">
        <div className="container mx-auto px-4">
          <div className="flex justify-center  items-center mb-4 space-x-4">
            <Link to="/shop/listing" className="hover:border-b-2 border-black cursor-pointer flex items-center justify-center gap-3">
              <h2 className="text-3xl font-satoshi-medium text-black h-full  text-center ">
                FEATURED PRODUCTS
              </h2>
              <BsArrowDownRight className=" text-black text-3xl duration-100 -rotate-45 hover:-rotate-90"/> 
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {productList && productList.length > 0
              ? productList.slice(0, 4).map((productItem) => (
                  <ShoppingProductTile key={productItem._id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <VideoSection/>


      {/* <MoveingText/> */}

      {/* <ProductPage  productDetails={productDetails}/> */}

      <MarqueeDemo />

           
      {/* <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      /> */}
      
    </div>
  );
}

export default ShoppingHome;