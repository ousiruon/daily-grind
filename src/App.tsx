import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login/Login";
import Toggler from "./components/ModeToggler/Toggler";
import { IntialState } from "./Store/reducer";
import { useEffect } from "react";
import { setProjectForm } from "./Store/actions";
import Main from "./components/MainInterface/Right/Main";

function App() {
  // Get signedIn status from Redux Store
  const signedIn: Boolean = useSelector((state: IntialState) => state.signedIn);
  // Get dispatch from Redux Store to make modifications
  const dispatch = useDispatch();
  useEffect(() => {
    if (signedIn) {
      // Listen to any click on the website but only if user is signed in
      document.onclick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // If clicked element is in the form section or its children update projectForm in Redux store
        if (
          target.closest("#toDoForm") ||
          target.closest("#closeTagModalNewProject")
        ) {
          dispatch(setProjectForm(true));
        } else {
          dispatch(setProjectForm(false));
        }
      };
    }
  }, [signedIn]);
  return (
    <>
      <div className="flex flex-col min-h-dvh w-full bg-light-bg dark:bg-dark-bg font-body">
        <Toggler />
        {
          // If user is not signed in show the login component
          !signedIn && <Login />
        }
        {
          // If user is signed in show main component
          signedIn && <Main />
        }
      </div>
    </>
  );
}
export default App;
