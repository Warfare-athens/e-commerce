import { Button } from "@/components/ui/button";
import { bodyCare,brain,faceCare,sleep,heart,menFaceCare,supplements,eye, } from '@/assets';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCaretRight ,AiOutlineCaretLeft } from "react-icons/ai";

import {BsArrowDownRight} from "react-icons/bs"
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { addLocalCartItem } from "@/store/shop/localcart-slice/index.js";
import { useToast } from "@/hooks/use-toast"
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
// import { Card, CardContent } from "@/components/ui/card";
import VideoSection from "@/components/common/video";
// import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import ImageSlider from "@/components/common/instacardCrousel";










const categoriesWithIcon = [
  { id: "bodyCare", label: "BODY CARE", icon: bodyCare },
  { id: "brainCare", label: "BRAIN HEALTH", icon: brain },
  { id: "faceCare", label: "FACE CARE", icon: faceCare },
  { id: "sleep", label: "SLEEP", icon: sleep },
  { id: "heart", label: "HEART", icon: heart },
  { id: "menFaceCare", label: "MEN CARE", icon: menFaceCare },
  { id: "supplements", label: "SUPPLEMENTS", icon: supplements },
  { id: "eye", label: "EYE", icon: eye },
];


function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { user } = useSelector((state) => state.auth);

  
  
  

  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()])


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId))
    .then(() => navigate(`/product/${getCurrentProductId}`));
  }



  // function handleAddToCart(getCurrentProductId) {
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


  const handleAddToCart = (product) => {
    // console.log('prodcut----------------',product);
    // console.log( 'user id check in handle Add to cart ----------' , user);
    
    if (!user){
      // Logic for unauthenticated users
      // console.log( 'we are in else block');
      
      dispatch(addLocalCartItem({
        productId: product._id,
        title: product.title,
        images: product.images,
        price: product.price,
        quantity:1,
      }));
      toast({ title: "Product is added to cart" });
    }
    else if (user){      
      console.log(  'user-----------' , user)
      dispatch(addToCart({ userId: user?.id, productId: product._id, quantity:1 })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({ title: "Product is added to cart" });
        }
      });
    }
  };
  
  



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
    <div className="flex flex-col bg-[#e2dfda]  min-h-screen">

      {/* <div>
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
      </div> */}
      

      <div className="relative w-full h-[350px] md:h-[400px] lg:h-[500px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full px-0  h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute h-20 rounded-none top-1/2 left-0  transform -translate-y-1/2 "
        >
          <AiOutlineCaretLeft className=" h-10 w-10 md:h-12 md:w-12  text-white/50 " />
        </button>
        <button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute h-20 rounded-none top-1/2 right-0  transform -translate-y-1/2 "
        >
          <AiOutlineCaretRight className=" h-10 w-10 md:h-12 md:w-12 text-white/50 " />
        </button>
      </div> 

      <section className=" mx-4 lg:mx-10 xl:mx-20 my-20">
        <h1 className=" text-3xl sm:text-4xl text-center mb-10 font-satoshi-bold"> Feel the difference: <br /> Embrace Emotion in <br /> Every Drop </h1>
        <div className=" w-full flex justify-center "> 
          <Link to='/listing'>
            <button  className=" px-5 py-2 bg-black text-lg text-white rounded-lg font-satoshi-medium"> 
              Buy Now
            </button> 
          </Link>
        </div>
        <div className=" flex items-end justify-around flex-wrap lg:flex-nowrap w-full  pt-10 sm:mt-0 ">

          <div >
            <div className=" w-32 h-48 lg:w-52 lg:h-80 overflow-hidden">
              <img className=" rounded-2xl md:rounded-3xl w-full h-full"
              src="https://res.cloudinary.com/dxfzdxr8f/image/upload/v1733730303/sytwezrtrklmkzcso47z.webp" alt="" />
            </div>
            <h5 className=" mt-2 text-black text-center font-satoshi-medium text-sm">MOISTURIZER</h5>
          </div>

          <div className=" ">
            <div className=" w-28 h-36  lg:w-48 lg:h-64 overflow-hidden">
              <img className="rounded-2xl md:rounded-3xl w-full h-full"
              src="https://res.cloudinary.com/dxfzdxr8f/image/upload/v1733655783/ij45ojunkws2fesu4udl.webp" alt="" />
            </div>
            <h5 className=" mt-2 text-black text-center font-satoshi-medium text-sm">SERUM</h5>
          </div>

          <div >
            <div className="  w-24 h-24  lg:w-36 lg:h-36 overflow-hidden">
              <img className="rounded-2xl md:rounded-3xl w-full h-full"
              src="https://res.cloudinary.com/dxfzdxr8f/image/upload/v1733931909/intfmujcuqpgambashew.webp" alt="" />
            </div>
            <h5 className=" mt-2 text-black text-center font-satoshi-medium text-sm">SUNSCREEN</h5>
          </div>

          <div className="lg:hidden xl:block">
            <div className="  w-24 h-24 lg:w-36 lg:h-36 overflow-hidden">
              <img className="rounded-2xl md:rounded-3xl w-full h-full"
              src="https://media.augustinusbader.com/components/images/shampoo-faqs-desk.jpg" alt="" />
            </div>
            <h5 className=" mt-2 text-black text-center font-satoshi-medium text-sm">HAIR</h5>
          </div>

          <div className=" ">
            <div className=" w-28 h-36 lg:w-48 lg:h-64 overflow-hidden">
              <img className="rounded-2xl md:rounded-3xl w-full h-full"
              src="https://media.augustinusbader.com/components/images/choose-your-eye-cream-high-res.jpg" alt="" />
            </div>
            <h5 className=" mt-2 text-black text-center font-satoshi-medium text-sm">UNDER EYE</h5>
          </div>

          <div >
            <div className=" w-32 h-48  lg:w-52 lg:h-80 overflow-hidden">
              <img className="rounded-2xl md:rounded-3xl w-full h-full"
              src="https://media.augustinusbader.com/components/images/TC-carousel-desk-3110.jpg" alt="" />
            </div>
            <h5 className=" mt-2 text-black text-center font-satoshi-medium text-sm">TONER</h5>
          </div>

        </div>
      </section>


      <section className="py-12  font-satoshi">
        <div className=" px-2  xl:px-28">
          <div className="flex justify-center  items-center mb-4 space-x-4">
            <Link to="/listing" className="hover:border-b-2 border-black cursor-pointer flex items-center justify-center gap-3">
              <h2 className=" text-3xl font-satoshi-medium text-black h-full  text-center ">
                OUR BESTSELLER
              </h2>
              <BsArrowDownRight className=" text-black text-3xl duration-100 -rotate-45 hover:-rotate-90"/> 
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-4">
            {productList && productList.length > 0
              ? productList.slice(0, 4).map((productItem) => (
                  <ShoppingProductTile key={productItem._id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <section className="pt-12 font-satoshi ">
        <div className=" xl:px-24 ">
          <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 place-items-center">
            {categoriesWithIcon.map((categoryItem) => (
              <div
                key={categoryItem.id}
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                className=" h-24 w-24 md:h-28 md:w-28 mb-4 relative cursor-pointer rounded-xl overflow-hidden hover:scale-105 shadow-xl "
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

      <section className="py-12  font-satoshi">
        <div className=" px-2  xl:px-28">
          <div className="flex justify-center  items-center mb-4 space-x-4">
            <Link to="/listing" className="hover:border-b-2 border-black cursor-pointer flex items-center justify-center gap-3">
              <h2 className=" text-3xl font-satoshi-medium text-black h-full  text-center ">
                FEATURED PRODUCTS
              </h2>
              <BsArrowDownRight className=" text-black text-3xl duration-100 -rotate-45 hover:-rotate-90"/> 
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-4">
            {productList && productList.length > 0
              ? productList.slice(0, 4).map((productItem) => (
                  <ShoppingProductTile key={productItem._id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>      
      

      <section className=' bg-[#212123] text-white  '  >
        <div className=" flex justify-center w-full font-satoshi p-4 lg:px-20 xl:px-32 ">
          <div>
            <h2 className="text-4xl md:text-4xl font-satoshi-medium text-center mt-16 mb-20 ">
              OUR PHILOSOPHY
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative">
              {/* Left Column */}
              <div className=" space-y-5 md:space-y-12 md:mb-10 md:mr-10">
                <div className="flex gap-4">
                  <span className="text-6xl pr-2 font-satoshi-medium">1</span>
                  <p className=" text-base md:text-lg">
                    Technology guides key nutrients and powerful natural ingredients 
                    to the cells, creating and supporting an optimal 
                    environment for cellular renewal
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <span className="text-6xl font-satoshi-medium ">2</span>
                  <p className="text-base md:text-lg">
                    Turns potent base formulations into smarter, adaptive skin and 
                    hair care capable of addressing individualized concerns - from the 
                    appearance of fine lines and wrinkles, hyperpigmentation, and 
                    cellulite to brittle or weak hair.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className=" md:ml-10 space-y-5 mb-10 md:space-y-12">
                <div className="flex gap-4">
                  <span className="text-6xl font-satoshi-medium">3</span>
                  <p className="text-base md:text-lg">
                    Technology guides key nutrients and powerful natural ingredients 
                    to the cells, creating and supporting an optimal 
                    environment for cellular renewal
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <span className="text-6xl font-satoshi-medium">4</span>
                  <p className="text-base md:text-lg">
                    Turns potent base formulations into smarter, adaptive skin and 
                    hair care capable of addressing individualized concerns - from the 
                    appearance of fine lines and wrinkles.
                  </p>
                </div>
              </div>

              {/* Centered Product Image */}
              <div className="absolute hidden md:block left-1/2 -translate-x-1/2 bottom-0 w-32 md:w-32">
                <img
                  src="https://media.augustinusbader.com/components/images/smarter-haircare--left.png"
                  alt="Product"
                  width={200}
                  height={400}
                  className=" w-full h-auto"
                />
              </div>
            </div>
          </div>

        </div>
      </section>


      <VideoSection/>


      <ImageSlider/>

      {/* <MoveingText/> */}

           
      {/* <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      /> */}
      
    </div>
  );
}

export default ShoppingHome;