import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import References from "./pages/References";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import ResourceManager from "./pages/admin/ResourceManager";

import "./css/styles.css";

/**
 * App router — each portfolio page is a JSX route under the shared Layout.
 * ErrorBoundary keeps render failures from blanking the entire site.
 */
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="services" element={<Services />} />
            <Route path="references" element={<References />} />
            <Route path="contact" element={<Contact />} />
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path=":resource" element={<ResourceManager />} />
              <Route path=":resource/new" element={<ResourceManager mode="new" />} />
              <Route path=":resource/:id/edit" element={<ResourceManager mode="edit" />} />
            </Route>

            {/* Unknown paths show a friendly fallback instead of a blank screen */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
