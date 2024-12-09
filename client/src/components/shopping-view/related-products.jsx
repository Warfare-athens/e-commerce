import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import cover1 from '@/assets/cover/cover2.webp';

const RelatedProducts = ({products}) => {


  return (
    <Carousel
    plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
        opts={{
        align: "start",
        }}
        className="w-full "
    >
        <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 lg:basis-1/4 ">
            
            <div className=" ">
                <div className=" flex flex-col h-56 w-40  sm:h-64 sm:w-52 lg:h-64 lg:w-52 border border-neutral-300  overflow-hidden rounded-lg">
                    <div className="aspect-square px-2 my-2  flex overflow-hidden  justify-center items-center">
                        <img className=" object-cover h-full w-full rounded-md " src={product?.image}  alt="" />
                    </div>
                    <div className=" mb-2">
                        <h3 className=" font-satoshi-medium text-lg  px-2"> {product?.title} </h3>
                        <h3 className=" font-satoshi-medium text-lg px-2"> ₹{product?.price} </h3>
                    </div>
                </div>
            </div>

            </CarouselItem>
        ))}


       
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
  )
}

export default RelatedProducts




import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const RelatedProducts = ({ products }) => {
  return (
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
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={product._id} className="basis-1/2 sm:basis-1/3 lg:basis-1/4">
            <div className="flex flex-col h-56 w-40 sm:h-64 sm:w-52 lg:h-64 lg:w-52 border border-neutral-300 overflow-hidden rounded-lg">
              <div className="aspect-square px-2 my-2 flex overflow-hidden justify-center items-center">
                <img className="object-cover h-full w-full rounded-md" src={product.image} alt={product.title} />
              </div>
              <div className="mb-2">
                <h3 className="font-satoshi-medium text-lg px-2">{product.title}</h3>
                <h3 className="font-satoshi-medium text-lg px-2">₹{product.price}</h3>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default RelatedProducts;
