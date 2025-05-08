import LeftMain from "../Left/LeftMain";
import RightMain from "../Right/RightMain";
//Main component to be rendered only if user is connected
const Main = () => {
  return (
    <div className="flex flex-row w-full min-h-dvh text-light-text dark:text-dark-text">
      <LeftMain />
      <RightMain />
    </div>
  );
};

export default Main;
