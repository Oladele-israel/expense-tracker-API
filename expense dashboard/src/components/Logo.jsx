import { Link } from "react-router-dom";
import infinity from "../assets/images/infinity.png";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-center font-bold text-xl py-4 text-[#551FFF] mb-10 mt-7 flex flex-col items-center"
    >
      <img src={infinity} alt="" width={80} loading="lazy" />
      <p>Limitless</p>
    </Link>
  );
};

export default Logo;
