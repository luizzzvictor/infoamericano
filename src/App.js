import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ReparacoesList from "./components/ReparacoesList/ReparacoesList";
import ReparacoesDetails from "./components/ReparacoesDetails/ReparacoesDetails";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { useState } from "react";

function App() {
  const apiURL = "https://ironrest.cyclic.app/reparacoes";

  const [form, setForm] = useState({
    tribunal: "",
    unidade_judiciaria: "",
    cargo_informante: "",
    infos_relevantes: "",
    notificar_status_cumprimento: "",
  });

  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/reparacoes"
          element={<ReparacoesList apiURL={apiURL} />}
        />
        <Route
          path="/reparacoes/:id"
          element={
            <ReparacoesDetails apiURL={apiURL} form={form} setForm={setForm} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
