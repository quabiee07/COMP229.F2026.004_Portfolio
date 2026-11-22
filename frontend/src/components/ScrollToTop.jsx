import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets window scroll when the route changes so each page opens at the top.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } catch (scrollError) {
      console.error("Scroll reset failed:", scrollError);
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
