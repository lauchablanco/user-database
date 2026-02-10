import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import MagicFiles from "./pages/MagicFiles";
import QuiddichForecast from "./pages/QuiddichForecast";
import SorteringHat from "./pages/SorteringHat";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <main className="app-content">
          <Routes>
            <Route index path="magic-files" element={<MagicFiles />}></Route>
            <Route
              path="quiddich-forecast"
              element={<QuiddichForecast />}
            ></Route>
            <Route path="sortering-hat" element={<SorteringHat />}></Route>
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
