import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeProvider";
import "../index.css"
const Theme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
// .dark {
//   --bg: #0f172a;
//   --textColor: #ddd;
//   --softBg: #1f273a;
//   --softTextColor: #a6a6a6;
// }

// .light {
//   --bg: white;
//   --textColor: black;
//   --softBg: #d6d3d3;
//   --softTextColor: #626262;
// }

  if (mounted) {
    // //console.log(theme);
    return <div className={theme == "dark" ? "dark" : "light"}>{children}</div>;
  }
};

export default Theme;
