// import sprinkle from '@/assets/sprinkle.png'

const LoadingScreen = () => {
  return (
    <div className=" company-bg-img fixed inset-0 w-full h-full flex justify-center items-center text-white text-2xl z-50"
    >
      {/* <img src={sprinkle} alt="" className=' ' /> */}
      <h1 className="company-name text-white text-6xl z-10 font-dior  bg-clip-text text-transparent sparkle-tex" > HUME </h1>
    </div>

    // <div className="fixed inset-0 w-full h-full bg-black flex justify-center items-center text-white text-2xl z-50 relative">
    //   <img src={sprinkle} alt="" className="absolute inset-0 w-full h-full object-cover z-0 opacity-50" />      
    //   <h1 className="text-6xl z-10 font-dior text-white bg-clip-text text-transparent sparkle-text absolute">
    //     HUME
    //   </h1>
    // </div>
  );
};

export default LoadingScreen;