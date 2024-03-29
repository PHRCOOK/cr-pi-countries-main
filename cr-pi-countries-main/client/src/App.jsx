import "./components/css-modules/App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LandingPage from "./components/landingpage/landingpage";
import Nav from "./components/nav/nav";
import Detail from "./components/detail/detail";
import Footer from "./components/footer/footer";
import { getAllCountries } from "./redux/actions";
import Home from "./components/home/home";
import Error from "./components/error/error";
import Form from "./components/form/form";
import pathroutes from "./components/helpers/pathroutes";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL =
  "https://cr-pi-countries-main-production-4014.up.railway.app/";
function App() {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state);

  //si el estado global contries esta vacio se actualiza con todos los paises
  useEffect(() => {
    if (countries.length === 0) dispatch(getAllCountries());
  }, [dispatch, countries]);

  //el componente nav esta disponible en todas las rutas
  //su define la ruta * para los errores 404 del cliente
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path={pathroutes.ROOT} element={<LandingPage />} />
        <Route path={pathroutes.HOME} element={<Home />} />
        <Route path={pathroutes.DETAIL} element={<Detail />} />
        <Route path={pathroutes.FORM} element={<Form />} />
        <Route
          path={pathroutes.ERROR}
          element={<Error status={404} message={"Not Found!"} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
