import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, Heart, MessageCircle, Send, Bookmark, StepBack, StepForward } from "lucide-react"
import {p1, p2, p3, p4, p5, p6, p7, p8, p9} from "@/assets/index";



const ImageSlider = () => {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [visibleCount, setVisibleCount] = useState(5); // Default to `md`
  const [imageWidth, setImageWidth] = useState("30%"); // Default width for `md`



    const instagramPost = [
    {
      id: 1,
      name: "Clare_H11",
      avatar: "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
      image: p1,
      likes: 1289,
      description: "I recently tried Hume's sunscreen, and I absolutely love it! It's lightweight and perfect for daily use."
    },
    {
      id: 2,
      name: "Emily_R",
      avatar: "https://images.unsplash.com/photo-1464863979621-258859e62245?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image: p2,
      likes: 982,
      description: "Hume's night serum has worked wonders on my skin. My face feels so smooth and refreshed every morning."
    },
    {
      id: 3,
      name: "Michael",
      avatar: "https://images.unsplash.com/photo-1582439170934-d089aa10abda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVufGVufDB8fDB8fHww",
      image: p3,
      likes: 745,
      description: "Big fan of Hume's range of products! Their sunscreen is perfect for outdoor activities."
    },
    {
      id: 4,
      name: "Sarah.J",
      avatar: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image: p4,
      likes: 1623,
      description: "I can't stop recommending Hume's products! The Under eye cream is my favorite. Great results so far!"
    },
    {
      id: 5,
      name: "Daniel_W",
      avatar: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVufGVufDB8fDB8fHww",
      image: p5,
      likes: 456,
      description: "Hume's Under Eye Cream is a game-changer for me. My skin feels protected and hydrated all day."
    },
    {
      id: 6,
      name: "Sophia",
      avatar: "https://images.unsplash.com/photo-1441123694162-e54a981ceba5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image: p6,
      likes: 978,
      description: "I tried Hume's Skincare products and loved it! It blends in effortlessly and has no white cast. Perfect!"
    },
    {
      id: 7,
      name: "DavidM",
      avatar: "https://images.unsplash.com/photo-1503001358144-8d7f2c1db9f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVufGVufDB8fDB8fHww",
      image: p7,
      likes: 1345,
      description: "Hume's skincare products is now a must-have in my skincare routine. Highly recommend it!"
    },
    {
      id: 8,
      name: "Emma",
      avatar: "https://images.unsplash.com/photo-1460904577954-8fadb262612c?q=80&w=1990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image: p8,
      likes: 1120,
      description: "Loving the glow Hume's night glow serum has given me! My skin looks radiant every morning."
    },
    {
      id: 9,
      name: "ChrisL",
      avatar: "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image: p9,
      likes: 623,
      description: "Hume's skincare & bodycare products are fantastic! The sunscreen is lightweight and perfect for my daily routine."
    }
  ];

    // Adjust visible images and width based on screen size
    useEffect(() => {
      const updateLayout = () => {
        const width = window.innerWidth;
        if (width < 450) {
          setVisibleCount(3); // sm: 3 images
          setImageWidth("50%"); // sm: 40% width
        } else if (width < 750) {
          setVisibleCount(5); // md: 5 images
          setImageWidth("40%"); // md: 30% width
        } else if (width < 900) {
          setVisibleCount(7); // lg: 7 images
          setImageWidth("30%"); // lg: 25% width
        } else {
          setVisibleCount(9); // xl: 9 images
          setImageWidth("25%"); // xl: 20% width
        }
      };
      updateLayout();
      window.addEventListener("resize", updateLayout);
      return () => window.removeEventListener("resize", updateLayout);
    }, []);

  // Update pos itionIndexes based on visibleCount
    useEffect(() => {
      setPositionIndexes(Array.from({ length: visibleCount }, (_, i) => i));
    }, [visibleCount]);

  const handleNext = () => {
    setPositionIndexes((prevIndexes) =>
      prevIndexes.map((index) => (index + 1) % instagramPost.length)
    );
  };

  const handleBack = () => {
    setPositionIndexes((prevIndexes) =>
      prevIndexes.map((index) => (index - 1 + instagramPost.length) % instagramPost.length)
    );
  };


  const positions = [ "center", "left1", "right1", "left2", "right2", "left3", "right3", "left4", "right4"];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-70%", scale: 0.8, zIndex: 3 },
    right1: { x: "70%", scale: 0.8, zIndex: 3 },
    left2: { x: "-120%", scale: 0.6, zIndex: 2 },
    right2: { x: "120%", scale: 0.6, zIndex: 2 },
    left3: { x: "-155%", scale: 0.4, zIndex: 1 },
    right3: { x: "155%", scale: 0.4, zIndex: 1 },
    right4: { x: "180%", scale: 0.2, zIndex: 0 },
    left4: { x: "-180%", scale: 0.2, zIndex: 0 },
  };
  return (
    <div className=" relative flex items-center flex-col justify-center h-[600px] lg:h-screen ">

      <h2 className="absolute flex-wrap top-0 text-2xl md:text-3xl font-satoshi-medium   bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
      In the Spotlight: <span className=" block md:inline">Stunning Posts</span>
      </h2>



        {positionIndexes.map((index, i) => {
          const post = instagramPost[index];
          if (!post) return null; // Skip rendering if post is undefined

          return (
            <motion.div
              key={index}
              className=" relative rounded-[12px] lg:mt-10 overflow-hidden drop-shadow-xl "
              initial="center"
              animate={positions[i]}
              variants={imageVariants}
              transition={{ duration: 0.5 }}
              style={{ width: imageWidth , position: "absolute" }}
            >

      
              <div className="flex items-center justify-between p-2 bg-white">
                <div className="flex items-center space-x-2">

                <div className=" bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 p-[2px]  rounded-full">
                  <div className="flex items-center justify-center rounded-full bg-white p-[1.5px]">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img src={post.avatar} alt="Profile Avatar" />
                    </div>
                  </div>
                </div>

                <span className="font-satoshi-medium text-sm">{post.name}</span>
                </div>
                <div className="flex items-center space-x-2 mr-2">
                <button
                  className=" border hidden md:block rounded-sm text-[10px] px-2 py-2 font-satoshi mr-3 text-blue-500 hover:text-blue-600"
                >
                  FOLLOW
                </button>
                <MoreHorizontal className="h-6 w-6 " />
                </div>
              </div>


            <div className="p-0 ">
                <div className=" aspect-square items-center justify-center rounded-lg bg-white/10 ">
                  <img src={post.image} alt="ds" />
                </div>
            </div>


            <div className="w-full bg-white ">

            <div className="  w-full bg-white flex justify-between p-2 md:p-4">
              <div className="flex space-x-3 md:space-x-4">
                  <Heart strokeWidth={0} className="h-5 w-5 text-white  fill-red-500" />
                  <MessageCircle className="h-5 w-5" />
                  <Send className="h-5 w-5" />
              </div>
                <Bookmark className="h-5 w-5" />
            </div>

            <div className=" flex -space-x-1 md:pl-4 pl-2 pb-2 overflow-hidden">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="inline-block size-4 rounded-full ring-2 ring-white"
            />
            <img
              alt=""
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="inline-block size-4 rounded-full ring-2 ring-white"
            />
            <img
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="inline-block size-4 rounded-full ring-2 ring-white"
            />
              <p className=" text-xs font-satoshi-medium pl-2"> Liked by <span className="font-satoshi-bold"> {post.likes}</span></p>
            </div>

            <div className=" flex font-satoshi px-2 md:px-4 pb-4 overflow-hidden">
              <p className=" text-[12px]">{post.description}</p>
            </div>

            </div>

            </motion.div>

          );
        })}



        <button
          className="absolute border z-30 rounded-full left-3 md:left-10 lg:left-20 text-black  bg-white p-2 drop-shadow "
          onClick={handleBack}
        >
          <StepBack strokeWidth={1} />
        </button>

        <button
          className=" absolute  border z-30 rounded-full right-3 md:right-10 lg:right-20  text-black  bg-white p-2 drop-shadow "
          onClick={handleNext}
        >
          <StepForward strokeWidth={1} />
        </button>


    </div>
  );
};

export default ImageSlider;