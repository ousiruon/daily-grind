import { motion } from "motion/react";

interface LogoProps {
  width: string;
  height: string;
  animated: boolean;
}
const Logo = ({ width, height, animated }: LogoProps) => {
  return (
    <>
      <div className="flex flex-row items-center font-logo font-bold p-1">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 58 59"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${width} ${height}`}
          initial={{ scale: 1 }}
          animate={
            animated && {
              scale: [1, 1.1, 1],
              transition: { duration: 0.5, delay: 1.5 },
            }
          }
        >
          <motion.path
            d="M28.7782 39.0343H28.7674C28.5089 39.0328 28.2537 38.9763 28.0188 38.8684C27.7838 38.7606 27.5746 38.6039 27.4049 38.4088L17.7052 27.2716C17.5476 27.0914 17.4271 26.8818 17.3506 26.6549C17.2741 26.428 17.2431 26.1883 17.2593 25.9494C17.2756 25.7105 17.3388 25.4772 17.4453 25.2628C17.5518 25.0483 17.6996 24.857 17.8801 24.6998C18.0607 24.5425 18.2705 24.4224 18.4975 24.3463C18.7245 24.2702 18.9643 24.2397 19.2032 24.2564C19.442 24.2731 19.6752 24.3368 19.8895 24.4437C20.1037 24.5506 20.2947 24.6987 20.4516 24.8795L28.7942 34.4586L53.8387 6.3615C53.9978 6.18301 54.1904 6.03759 54.4057 5.93355C54.6209 5.82952 54.8546 5.76889 55.0933 5.75515C55.3319 5.7414 55.571 5.7748 55.7968 5.85344C56.0226 5.93209 56.2306 6.05444 56.4091 6.21349C56.5876 6.37255 56.733 6.56519 56.837 6.78045C56.9411 6.9957 57.0017 7.22933 57.0154 7.46801C57.0292 7.70669 56.9958 7.94576 56.9172 8.17153C56.8385 8.3973 56.7162 8.60534 56.5571 8.78383L30.1373 38.4249C29.9665 38.6166 29.7571 38.7699 29.5229 38.875C29.2886 38.98 29.0349 39.0343 28.7782 39.0343Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={animated && { pathLength: 0 }}
            animate={
              animated && {
                pathLength: 1,
                transition: { duration: 1, stiffness: 200 },
              }
            }
          />
          <path
            d="M29.0001 58.5171C21.3088 58.5171 13.9325 55.4617 8.49396 50.0232C3.0554 44.5846 6.10352e-05 37.2084 6.10352e-05 29.5171C6.10352e-05 21.8258 3.0554 14.4496 8.49396 9.01102C13.9325 3.57246 21.3088 0.51709 29.0001 0.51709C29.2653 0.51709 29.5196 0.622461 29.7072 0.809998C29.8947 0.997534 30.0001 1.25187 30.0001 1.51709C30.0001 1.78231 29.8947 2.03668 29.7072 2.22421C29.5196 2.41175 29.2653 2.51709 29.0001 2.51709C23.66 2.51709 18.4398 4.10062 13.9996 7.06741C9.55951 10.0342 6.09886 14.2511 4.0553 19.1847C2.01173 24.1183 1.47706 29.547 2.51886 34.7845C3.56066 40.022 6.13212 44.833 9.90814 48.609C13.6842 52.385 18.4951 54.9565 23.7326 55.9983C28.9701 57.0401 34.3989 56.5054 39.3325 54.4618C44.2661 52.4183 48.4829 48.9576 51.4497 44.5175C54.4165 40.0774 56.0001 34.8572 56.0001 29.5171C56.0001 29.2519 56.1054 28.9975 56.2929 28.81C56.4804 28.6224 56.7348 28.5171 57.0001 28.5171C57.2653 28.5171 57.5196 28.6224 57.7072 28.81C57.8947 28.9975 58.0001 29.2519 58.0001 29.5171C57.9912 37.2057 54.933 44.5768 49.4964 50.0135C44.0598 55.4501 36.6886 58.5083 29.0001 58.5171Z"
            fill="currentColor"
          />
        </motion.svg>
        <div className="relative p-1">
          <motion.div
            initial={animated && { width: "100%" }}
            animate={
              animated && { width: "0%", transition: { duration: 1.5 } }
            }
            className="absolute w-full right-0 top-0 h-[105%] bg-light-bg dark:bg-dark-bg"
          ></motion.div>
          DailyGrind
        </div>
      </div>
    </>
  );
};
export default Logo;
