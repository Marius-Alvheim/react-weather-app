import { useContext } from "react";
import { WeatherContext } from "../Main/Main";
import type { JSX } from "react";

export default function Forecast(): JSX.Element {
  const { weather } = useContext(WeatherContext);

  console.log(weather);

  return <section></section>;
}
