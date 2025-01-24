import { useNavigate} from "react-router-dom";

function NotFound() {
  const navigate = useNavigate()
    return (
    <div className=" w-full h-[500px] flex flex-col items-center justify-center">
      <h1 className=" text-4xl md:text-6xl font-satoshi-medium" > No Page Found  </h1>
      <h2 className=" text-2xl md:text-3xl mt-5 font-satoshi"> Return to Home page</h2>
      <button className="  mt-10 font-satoshi-medium px-10 py-4 ml-3 my-7 rounded-full bg-black text-white"
          onClick={() => { navigate("/")}}
      >        
            HOME PAGE
          </button>
    </div>
  )}
  
  export default NotFound;