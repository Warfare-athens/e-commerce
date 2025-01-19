import { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const VideoSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="pt-12 pb-20 xl:mx-32 font-satoshi">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center mb-4 space-x-4">
          <h2 className="text-2xl sm:text-3xl mb-5 font-satoshi-medium text-black text-center">
            MANUFACTURING INSIGHTS
          </h2>
        </div>
        <div className="relative overflow-hidden xl:h-[600px] w-full">
          <video
            ref={videoRef}
            className="w-full rounded-lg"
          >
            <source
              type="video/mp4"
              src="https://res.cloudinary.com/dxfzdxr8f/video/upload/v1733655617/Behind_the_Scenes__Manufacturing_Skincare_Products_in_a_Factory_bogdoi.mp4"
            />
          </video>
          <div
            onClick={togglePlay}
            className="absolute top-0 flex items-center justify-center w-full h-full cursor-pointer"
          >
            {isPlaying ? (
              <FaPause className="h-14 w-14 text-neutral-100 opacity-50 " />
            ) : (
              <FaPlay className="h-14 w-14 text-neutral-100 opacity-70" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
