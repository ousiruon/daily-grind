import { useDispatch, useSelector } from "react-redux";
import { IntialState } from "../../Store/reducer";
import { useEffect } from "react";
import { setDarkMode, setMobileMenu } from "../../Store/actions";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { motion } from "motion/react";
import { IoMdMenu } from "react-icons/io";

const Toggler = () => {
  //Get current mode from the store
  const currentMode = useSelector((state: IntialState) => state.darkMode);
  //Dispatch to make some modifications in store
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      dispatch(setDarkMode(true));
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      dispatch(setDarkMode(false));
    }
  }, []);
  //Update theme mode when mode icon is clicked, update it in local storage and update storage if needed
  const updateTheme: () => void = () => {
    if (!currentMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      dispatch(setDarkMode(true));
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      dispatch(setDarkMode(false));
    }
  };
  return (
    <>
      <div
        className="absolute top-0 left-0 flex md:hidden items-center justify-center mx-4 mt-2 p-1 text-2xl text-light-accent dark:text-dark-accent cursor-pointer gap-2 rounded-2xl inset-shadow-light-bg dark:inset-shadow-dark-bg inset-shadow-2xl transition duration-200 ease-in-out"
        onClick={() => dispatch(setMobileMenu(true))}
      >
        <IoMdMenu />
      </div>
      <div
        className="absolute top-0 right-0 flex items-center justify-center mx-4 mt-2 p-1 text-2xl bg-light-bg-2 dark:bg-dark-bg-2 text-light-accent dark:text-dark-accent cursor-pointer gap-2 rounded-2xl inset-shadow-light-bg dark:inset-shadow-dark-bg inset-shadow-2xl transition duration-200 ease-in-out"
        onClick={updateTheme}
      >
        <MdLightMode />
        <MdDarkMode />
        <motion.div className="absolute top-[50%] left-[50%] translate-[-50%] h-[80%] w-[80%] ">
          <motion.div
            animate={
              currentMode
                ? { left: "-5%", transition: { duration: 0.2, type: "tween" } }
                : { left: "60%", transition: { duration: 0.2, type: "tween" } }
            }
            className="absolute top-[50%] translate-y-[-50%] h-[90%] w-[45%] rounded-xl bg-light-accent dark:bg-dark-accent flex"
          ></motion.div>
        </motion.div>
      </div>
    </>
  );
};
export default Toggler;
