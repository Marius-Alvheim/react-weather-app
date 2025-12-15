import { useContext } from "react";
import { WeatherContext } from "../Main/Main";
import type { JSX } from "react";
import type { Forecastday } from "../../types";
import styles from "./Forecast.module.css";

export default function Forecast(): JSX.Element {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("Typescript stops screaming");
  }

  const { weather, unit } = context;
  console.log(weather);

  const forecastElements = weather?.forecast.forecastday.map(
    (day: Forecastday): JSX.Element => {
      return (
        <div
          className={styles.day}
          key={day.date}
          onClick={() => console.log(`I got clicked ${day.date}`)}
        >
          <p>{day.date.split("-").reverse().slice(0, 2).join(".")}</p>

          <div className={styles.iconBox}>
            <img src={day.day.condition.icon} />
            <p>
              {day.day.daily_chance_of_rain > 0
                ? day.day.daily_chance_of_rain
                : null}
              %
              {day.day.daily_chance_of_snow > 0
                ? day.day.daily_chance_of_snow
                : null}
            </p>
          </div>
          <p>
            {unit === "c"
              ? day.day.avgtemp_c.toFixed(0)
              : day.day.avgtemp_f.toFixed(0)}
            °{unit.toUpperCase()}
          </p>
        </div>
      );
    }
  );

  return <section className={styles.forecastBox}>{forecastElements}</section>;
}
