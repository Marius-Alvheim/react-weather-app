import { useContext } from "react";
import { WeatherContext } from "../Main/Main";
import type { JSX } from "react";
import styles from "./CurrentWeather.module.css";

export default function CurrentWeather(): JSX.Element {
  const { weather } = useContext(WeatherContext);

  return (
    <section className={styles.current}>
      <div className={styles.iconBox}>
        <h3>{weather?.current.condition.text}</h3>
        <img src={weather?.current.condition.icon} />
        <p>{weather?.current.temp_c.toFixed(0)} °C</p>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.area}>
          <p>{weather?.location.name}</p>
          <p>{weather?.location.region}</p>
        </div>

        <div className={styles.temp}>
          <p>
            {weather?.forecast.forecastday[0].day.mintemp_c.toFixed(0)}/
            {weather?.forecast.forecastday[0].day.maxtemp_c.toFixed(0)} °C
          </p>
          <p>Feels like {weather?.current.feelslike_c.toFixed(0)} °C</p>
        </div>
      </div>
    </section>
  );
}

// The data i want from current
// condtition => text and icon
// temp_c and feelslike_c
// wind_kph
// wind_dir
// precip_in
