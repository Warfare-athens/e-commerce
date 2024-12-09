import { useEffect } from "react";
import gsap from "gsap";

export default function MoveingText() {
  useEffect(() => {
    // Get the marquee container and calculate its width
    const marquee = document.querySelector(".marquee");
    const marqueeWidth = marquee.scrollWidth;

    // Animate marquee
    gsap.to(".marquee", {
      x: -marqueeWidth, // Move left to the negative width of the container
      duration: 20, // Duration of the animation
      repeat: -1, // Infinite loop
      ease: "linear", // Smooth constant motion
    });
  }, []);

  return (
    <>

        {/* Marquee container */}
        <div className="flex h-20 md:h-36 gap-8 marquee-wrapper">
          {/* Repeated content for infinite loop */}
          <div className="marquee flex items-center gap-4">
              <div
                className="flex items-center gap-2"
              >
                <div className="flex ">
                    <h1 className="moving-text h-full w-full text-4xl">SKIN </h1>
                    <h1 className="moving-text h-full w-full text-4xl">CARE</h1>
                    <div className="moving-div h-3 w-3 bg-red-400 rounded-full"></div>
                </div>
              </div>
          </div>  
          {/* Duplicate content for seamless transition */}
          <div className="marquee flex items-center gap-4">
              <div
                className="flex items-center gap-2"
              >
                <h1 className="moving-text text-4xl">BODY </h1>
                <h1 className="moving-text text-4xl">CARE</h1>
                <div className="moving-div h-3 w-3 bg-red-400 rounded-full"></div>
              </div>
          </div>
          <div className="marquee flex items-center gap-4">
              <div
                className="flex items-center gap-2"
              >
                <h1 className="moving-text text-4xl">BRAIN </h1>
                <h1 className="moving-text text-4xl">HEALTH</h1>
                <div className="moving-div h-3 w-3 bg-red-400 rounded-full"></div>
              </div>
          </div>
          <div className="marquee flex items-center gap-4">
              <div
                className="flex items-center gap-2"
              >
                <h1 className="moving-text text-4xl">SLEEP </h1>
                <div className="moving-div h-3 w-3 bg-red-400 rounded-full"></div>
              </div>
          </div>
          <div className="marquee flex items-center gap-4">
              <div
                className="flex items-center gap-2"
              >
                <h1 className="moving-text text-4xl">UNDER EYE</h1>
                <h1 className="moving-text text-4xl">EYE</h1>
                <div className="moving-div h-3 w-3 bg-red-400 rounded-full"></div>
              </div>
          </div>
          <div className="marquee flex items-center gap-4">
              <div
                className="flex items-center gap-2"
              >
                <h1 className="moving-text text-4xl">MEN'S</h1>
                <div className="moving-div h-3 w-3 bg-red-400 rounded-full"></div>
              </div>
          </div>
          <div className="marquee flex items-center gap-4">
              <div
                className="flex items-center gap-2"
              >
                <h1 className="moving-text text-4xl">WOMEN'S</h1>
                <div className="moving-div h-3 w-3 bg-red-400 rounded-full"></div>
              </div>
          </div>
          <div className="marquee flex items-center gap-4">
              <div
                className="flex items-center gap-2"
              >
                <h1 className="moving-text text-4xl">GLOW</h1>
                <div className="moving-div h-3 w-3 bg-red-400 rounded-full"></div>
              </div>
          </div>


        </div>

    </>
  );
}

