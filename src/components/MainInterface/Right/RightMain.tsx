import ProjectsRightMain from "./ProjectsRightMain";
import UpperRightMain from "./UpperRightMain";

const LeftMain = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-15 w-full mt-10 px-4 py-12">
        <UpperRightMain />
        <ProjectsRightMain />
      </div>
    </>
  );
};
export default LeftMain;
