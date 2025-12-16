import { useContext } from "react";
import { WeatherContext } from "../Main/Main";
import type { JSX } from "react";
import styles from "./CurrentWeather.module.css";

export default function CurrentWeather(): JSX.Element {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("Typescript stops screaming");
  }

  const { weather, unit } = context;

  // Logic to change the units between C/F
  const current =
    unit === "c"
      ? weather?.current.temp_c.toFixed(0)
      : weather?.current.temp_f.toFixed(0);

  const minTempUnit =
    unit === "c"
      ? weather?.forecast.forecastday[0].day.mintemp_c.toFixed(0)
      : weather?.forecast.forecastday[0].day.mintemp_f.toFixed(0);

  const maxTempUnit =
    unit === "c"
      ? weather?.forecast.forecastday[0].day.maxtemp_c.toFixed(0)
      : weather?.forecast.forecastday[0].day.maxtemp_f.toFixed(0);

  const feelsLike =
    unit === "c"
      ? weather?.current.feelslike_c.toFixed(0)
      : weather?.current.feelslike_f.toFixed(0);

  return (
    <section className={styles.current}>
      <div className={styles.iconBox}>
        <h3>{weather?.current.condition.text}</h3>
        <img src={weather?.current.condition.icon} />
        <p>
          {current} °{unit.toUpperCase()}
        </p>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.area}>
          <p>{weather?.location.name}</p>
          <p>{weather?.location.region}</p>
        </div>

        <div className={styles.temp}>
          <p>
            {minTempUnit}/{maxTempUnit} °{unit.toUpperCase()}
          </p>
          <p>
            Feels like {feelsLike} °{unit.toUpperCase()}
          </p>
        </div>
      </div>
    </section>
  );
}
