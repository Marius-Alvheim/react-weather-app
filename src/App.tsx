import "./App.css";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.tsx";
import Forecast from "./components/Forecast/Forecast.tsx";
import Header from "./components/Header/Header.tsx";
import Main from "./components/Main/Main.tsx";
import type { JSX } from "react";

function App(): JSX.Element {
  return (
    <Main>
      <Header />
      <CurrentWeather />
      <Forecast />
    </Main>
  );
}

export default App;
