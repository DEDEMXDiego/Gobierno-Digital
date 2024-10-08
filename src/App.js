import { BrowserRouter } from "react-router-dom";
import { Footer } from "./components/Footer";
import { NavBar } from "./components/NavBar";
import "./estilos/App.css";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
