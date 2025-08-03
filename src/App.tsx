import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Layout/NavBar";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
