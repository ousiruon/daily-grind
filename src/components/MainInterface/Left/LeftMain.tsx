import { useDispatch, useSelector } from "react-redux";
import { IntialState, Tag } from "../../../Store/reducer";
import Logo from "../../Logo/Logo";
import {
  setEditingTag,
  setMobileMenu,
  setSelectedTag,
} from "../../../Store/actions";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { RxCross2 } from "react-icons/rx";
const RightMain = () => {
  const [filteredTags, setFilteredTags] = useState<Tag[] | []>([]);
  const tags = useSelector((state: IntialState) => state.tags);
  const options = useSelector((state: IntialState) => state.options);
  const dispatch = useDispatch();
  const mobileMenu = useSelector(
    (state: IntialState) => state.options.mobileMenu
  );
  useEffect(() => {
    const currentTags = [...tags].splice(0, 10);
    setFilteredTags(currentTags);
  }, [tags]);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        dispatch(setMobileMenu(false));
      }
    });
  });
  return (
    <>
      <motion.div
        initial={{ x: "-100%" }}
        animate={
          mobileMenu
            ? {
                x: 0,
                transition: {
                  duration: 0.5,
                  type: "spring",
                },
              }
            : {
                x: "-100%",
                transition: {
                  duration: 0.5,
                  type: "spring",
                },
              }
        }
        className={`fixed h-dvh top-0 bg-light-bg dark:bg-dark-bg flex flex-col gap-10 items-start justify-start px-2 w-[250px] z-50 shadow-xs/40 shadow-dark-bg dark:shadow-light-bg-2  md:hidden`}
      >
        <div className="flex justify-between items-center w-full text-3xl text-light-accent dark:text-dark-accent font-bold">
          <Logo width="w-5" height="h-5" animated={true} />
          <div
            onClick={() => dispatch(setMobileMenu(false))}
            className="cursor-pointer"
          >
            <RxCross2 size={30} />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full items-start justify-start pb-6">
          <div
            onClick={() => dispatch(setSelectedTag(null))}
            className={`text-sm font-semibold cursor-pointer w-full py-2 px-2 hover:bg-light-accent hover:dark:bg-dark-accent hover:text-light-bg hover:dark:text-dark-text transition-all duration-300 ease-in-out ${
              options.selectedTag === null
                ? "bg-light-accent dark:bg-dark-accent text-light-bg dark:text-dark-text"
                : ""
            }`}
          >
            All Projects
          </div>
          {filteredTags &&
            filteredTags.length > 0 &&
            filteredTags.map((tag) => (
              <div
                key={tag.id}
                onClick={() => dispatch(setSelectedTag(tag.id))}
                className={`text-sm font-semibold cursor-pointer w-full py-2 px-2 hover:bg-light-accent hover:dark:bg-dark-accent hover:text-light-bg hover:dark:text-dark-text transition-all duration-300 ease-in-out ${
                  options.selectedTag === tag.id
                    ? "bg-light-accent dark:bg-dark-accent text-light-bg dark:text-dark-text"
                    : ""
                }`}
              >
                {tag.title}
              </div>
            ))}
          <div
            onClick={() => dispatch(setEditingTag(true))}
            className="text-sm font-semibold cursor-pointer w-full py-2 px-2 hover:bg-light-accent hover:dark:bg-dark-accent hover:text-light-bg hover:dark:text-dark-text transition-all duration-300 ease-in-out"
          >
            Edit Tags
          </div>
        </div>
      </motion.div>
      <div className="hidden md:flex flex-col gap-10 items-start justify-start px-4 w-3/12 max-w-[250px]">
        <div className="flex text-3xl text-light-accent dark:text-dark-accent font-bold">
          <Logo width="w-5" height="h-5" animated={true} />
        </div>
        <div className="flex flex-col gap-2 w-full items-start justify-start pb-6">
          <div
            onClick={() => dispatch(setSelectedTag(null))}
            className={`text-sm font-semibold cursor-pointer w-full py-2 px-2 hover:bg-light-accent hover:dark:bg-dark-accent hover:text-light-bg hover:dark:text-dark-text transition-all duration-300 ease-in-out ${
              options.selectedTag === null
                ? "bg-light-accent dark:bg-dark-accent text-light-bg dark:text-dark-text"
                : ""
            }`}
          >
            All Projects
          </div>
          {filteredTags &&
            filteredTags.length > 0 &&
            filteredTags.map((tag) => (
              <div
                key={tag.id}
                onClick={() => dispatch(setSelectedTag(tag.id))}
                className={`text-sm font-semibold cursor-pointer w-full py-2 px-2 hover:bg-light-accent hover:dark:bg-dark-accent hover:text-light-bg hover:dark:text-dark-text transition-all duration-300 ease-in-out ${
                  options.selectedTag === tag.id
                    ? "bg-light-accent dark:bg-dark-accent text-light-bg dark:text-dark-text"
                    : ""
                }`}
              >
                {tag.title}
              </div>
            ))}
          <div
            onClick={() => dispatch(setEditingTag(true))}
            className="text-sm font-semibold cursor-pointer w-full py-2 px-2 hover:bg-light-accent hover:dark:bg-dark-accent hover:text-light-bg hover:dark:text-dark-text transition-all duration-300 ease-in-out"
          >
            Edit Tags
          </div>
        </div>
      </div>
    </>
  );
};
export default RightMain;
