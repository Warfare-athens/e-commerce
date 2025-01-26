// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { useNavigate } from "react-router"


// export default function PaymentSuccess() {
//   const navigate = useNavigate()

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-50">
//       <Card className="w-full max-w-md drop-shadow-2xl">
//         <CardContent className="flex flex-col items-center p-6">
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{
//               type: "spring",
//               stiffness: 260,
//               damping: 20,
//             }}
//             className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6"
//           >
//             <svg
//               className="w-16 h-16 text-green-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <motion.path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//                 initial={{ pathLength: 0 }}
//                 animate={{ pathLength: 1 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//               />
//             </svg>
//           </motion.div>
//           <motion.h2
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//             className="text-2xl font-satoshi-bold  mb-2 text-center"
//           >
//             Payment Successful!
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.7 }}
//             className=" font-satoshi mb-6 text-center"
//           >
//             Thank you for your purchase.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.9 }}
//           >
//             <Button className="bg-green-600 hover:bg-green-700 font-satoshi-medium text-white"  
//             onClick={() => { navigate("/")}}
//             >
//               Back to Home
//             </Button>
//           </motion.div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }




import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

export default function LuxuryPaymentSuccess() {
  const [isClient, setIsClient] = useState(false)


  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  }
  
  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } },
  }
  
  const drawCheck = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  }
  

  useEffect(() => {
    setIsClient(true)
    const timer = setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.7 },
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (!isClient) return null

  return (
    <div className="min-h-[680px] flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900">
      <motion.div
        className="w-full mx-4 max-w-md p-8 bg-white rounded-2xl shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center"
        >
          <motion.div
            className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6"
            variants={fadeInUp}
          >
            <svg className="w-16 h-16 text-green-500" viewBox="0 0 24 24">
              <motion.path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 6L9 17l-5-5"
                variants={drawCheck}
                initial="hidden"
                animate="visible"
              />
            </svg>
          </motion.div>

          <motion.h2 className="text-3xl font-satoshi-bold text-gray-800 mb-2 text-center" variants={fadeInUp}>
            Payment Successful!
          </motion.h2>

          <motion.p className="text-gray-600 mb-8 font-satoshi text-center" variants={fadeInUp}>
            Thank you for your purchase. your order is confirmed.
          </motion.p>

          <motion.div className="w-full bg-gray-200 h-2 rounded-full mb-6" variants={fadeInUp}>
            <motion.div
              className="bg-green-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>

          <motion.div className="flex justify-between w-full mb-8" variants={fadeInUp}>
            <div className="text-left">
              <p className="text-sm font-satoshi  text-gray-500">Order number</p>
              <p className="font-satoshi-medium text-gray-800">#6543</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-satoshi  text-gray-500">Total amount</p>
              <p className="font-satoshi-medium text-gray-800">₹1800</p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Button className="bg-gradient-to-b from-purple-700 to-indigo-700  hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-satoshi-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Shop More
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

