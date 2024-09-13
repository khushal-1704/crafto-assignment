import { useEffect } from "react";

function useScreenSizeWatcher(onScreenChange, screenSize = "760px") {
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${screenSize})`);

    const handleScreenSizeChange = (e) => {
      if (e.matches) {
        onScreenChange(true);
      } else {
        onScreenChange(false);
      }
    };

    mediaQuery.addEventListener("change", handleScreenSizeChange);

    handleScreenSizeChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenSizeChange);
    };
  }, [onScreenChange]);
}

export default useScreenSizeWatcher;
