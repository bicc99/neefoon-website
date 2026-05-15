import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router doesn't scroll to the top on navigation — it preserves the
// previous scroll position. This component fixes that by watching the pathname
// and scrolling to (0, 0) whenever the route changes.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component renders nothing — it only runs the side effect.
  return null;
}

export default ScrollToTop;
