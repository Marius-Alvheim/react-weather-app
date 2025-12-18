import "./App.css";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.tsx";
import Forecast from "./components/Forecast/Forecast.tsx";
import Main from "./components/Main/Main.tsx";
import type { JSX } from "react";
import Now from "./components/Now/Now.tsx";

function App(): JSX.Element {
  return (
    <Main>
      <CurrentWeather />
      <Now />
      <Forecast />
    </Main>
  );
}

export default App;
