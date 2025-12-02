import { useContext } from "react";
import { WeatherContext } from "../Main/Main";
import type { JSX } from "react";
import styles from "./CurrentWeather.module.css";

export default function CurrentWeather(): JSX.Element {
  const { weather } = useContext(WeatherContext);
  // const condition = weather?.current.condition.text;

  return (
    <section className={styles.test}>
      <h1>{weather?.current.condition.text}</h1>
      <img src={weather?.current.condition.icon} />
      <h2>{weather?.current.temp_c} C</h2>
    </section>
  );
}

// The data i want from current
// condtition => text and icon
// temp_c and feelslike_c
// wind_kph
// wind_dir
// precip_in
