import { useState, useEffect } from "react";

type ScreenSize = "l" | "m";

// This custom hook returns the screen size ("l" for large or "m" for medium) based on the window width
export default function useWindowSize(): ScreenSize | undefined {
  const [screenSize, setWindowSize] = useState<ScreenSize>();

  useEffect(() => {
    function handleResize() {
      let newScreenSize: ScreenSize = window.innerWidth > 992 ? "l" : "m";
      setWindowSize(newScreenSize);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    // Remove event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Return the current screen size
  return screenSize;
}
