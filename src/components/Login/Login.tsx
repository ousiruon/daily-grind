import { useDispatch } from "react-redux";
import Logo from "../Logo/Logo";
import { setSignIn } from "../../Store/actions";
import { useLocalStorage } from "../../Hooks/useLocalStorage";

const Login = () => {
  const dispatch = useDispatch();
  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = e.currentTarget.username?.value;
    const password = e.currentTarget.password?.value;
    const rememberMe = e.currentTarget.rememberMe?.checked;
    if (username === "Demo" && password === "Demo") {
      dispatch(setSignIn(true));
      if (rememberMe) {
        useLocalStorage("signedIn").setItem(true);
      }
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 w-full min-h-dvh">
        <div className="flex text-5xl text-light-accent dark:text-dark-accent font-bold">
          <Logo width="w-10" height="h-10" animated={true} />
        </div>
        <form onSubmit={submitLogin}>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center gap-5 w-full max-w-md px-15 py-10 bg-light-bg-2 dark:bg-dark-bg-2 text-light-text dark:text-dark-text rounded-2xl shadow-sm shadow-light-bg-2 dark:shadow-dark-bg-2">
              <h1 className="text-xl font-bold text-light-accent dark:text-dark-accent">
                Login
              </h1>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full py-3 px-6 text-sm border border-light-text dark:border-dark-text outline-0 rounded-lg focus:border-light-accent dark:focus:border-dark-accent focus:outline-1 focus:outline-light-accent dark:focus:outline-dark-accent ease-in-out duration-200 transition"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full py-3 px-6 text-sm border border-light-text dark:border-dark-text outline-0 rounded-lg focus:border-light-accent dark:focus:border-dark-accent focus:outline-1 focus:outline-light-accent dark:focus:outline-dark-accent ease-in-out duration-200 transition"
              />
              <div className="flex w-full items-center justify-start gap-2 text-sm">
                <input type="checkbox" name="rememberMe" id="rememberMe" />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <div className="text-sm text-light-accent dark:text-dark-accent">
                Enter <div className="inline font-bold">"Demo"</div> for both
                username and password
              </div>
              <button
                type="submit"
                className="w-full py-3 text-base font-bold text-light-bg-2 dark:text-dark-bg-2 bg-light-accent dark:bg-dark-accent rounded-lg opacity-80 hover:opacity-100 transition duration-300 ease-in-out cursor-pointer"
              >
                Sign-In
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
