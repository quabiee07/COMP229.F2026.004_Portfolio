import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

/**
 * Application entry. Guards against a missing root node so startup failures
 * surface a clear message instead of an uncaught crash.
 */
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error('Root element "#root" was not found in index.html.');
} else {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (startupError) {
    console.error("Failed to start the portfolio app:", startupError);
    rootElement.innerHTML =
      "<main style='padding:2rem;font-family:sans-serif'><h1>Unable to load the portfolio</h1><p>Please refresh the page. If the problem continues, check the browser console.</p></main>";
  }
}
