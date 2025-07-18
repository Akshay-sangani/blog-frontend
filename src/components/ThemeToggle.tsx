import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import moon from "../assets/moon.png";
import sun from "../assets/sun.png";

const ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext);
  // //console.log(theme);
  return (
    <div
      className="w-[40px] h-[20px] rounded-[50px] cursor-pointer flex  justify-between items-center relative border-2 border-white"
      onClick={toggle}
      style={
        theme === "dark" ? { backgroundColor: "white" } : { backgroundColor: "#0f172a" }
      }
    >
      <img src={moon} alt="" width={14} height={14} />
      <div
        className="w-[15px] h-[15px] rounded-[50%] absolute"
        style={
          theme === "dark"
            ? { left: 1, background: "#0f172a" }
            : { right: 1, background: "white" }
        }
      ></div>
      <img src={sun} alt="" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;
