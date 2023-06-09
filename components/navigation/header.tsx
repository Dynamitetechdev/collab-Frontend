import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
const Header = () => {
  const [isMenu, setIsMenu] = useState<Boolean>(false);
  const variants = {
    open: { opacity: 1, y: "10%" },
    closed: { opacity: 0, y: "-100%" },
  };
  return (
    <div className="header flex items-center justify-between w-full p-5 md:py-3 md:px-10">
      <Link href={"/"}>
        <div className="login text-2xl font-bold relative">
          Collab <span className="text-5xl absolute dot">.</span>
        </div>
      </Link>

      <motion.div
        className={isMenu ? "nav_items shadow-lg md:hidden" : "hidden"}
        animate={isMenu ? "open" : "closed"}
        variants={variants}
      >
        <ul className="">
          <li className="px-4 py-3 border-t bg-[#ffffff]">Developer</li>
          <Link href="/login">
            <li
              className="px-4 py-3 border-t bg-[#ffffff]"
              onClick={() => setIsMenu(!isMenu)}
            >
              Login
            </li>
          </Link>
          <li onClick={() => setIsMenu(!isMenu)}>
            <Link href={"/register"}>
              <button className="rounded-b-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 md:rounded max-[600px]:w-full">
                Create an account
              </button>
            </Link>
          </li>
        </ul>
      </motion.div>

      <div className="nav_items max-[600px]:hidden">
        <ul className="md:flex md:items-center">
          <li className="mr-5 ">Developer</li>
          <li className="mr-5 ">
            {" "}
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href={"/register"}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 md:rounded max-[600px]:w-full">
                Create an account
              </button>
            </Link>
          </li>
        </ul>
      </div>

      <motion.div
        whileTap={{ scale: 0.97 }}
        className="p-1 px-2 border rounded items-center mobile"
        onClick={() => setIsMenu(!isMenu)}
      >
        <div className="icon mx-1">
          <Bars3Icon />
        </div>
        <h3>Menu</h3>
      </motion.div>
    </div>
  );
};

export default Header;
