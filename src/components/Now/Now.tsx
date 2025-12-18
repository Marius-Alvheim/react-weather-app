import type { JSX } from "react";
import styles from "./Now.module.css";
import { useContext, useRef, useEffect } from "react";
import { WeatherContext } from "../Main/Main";

export default function Now(): JSX.Element {
  const context = useContext(WeatherContext);
  const currentHourRef = useRef<HTMLDivElement | null>(null);

  if (!context) {
    throw new Error("Typescript stops screaming");
  }

  const { weather, unit } = context;
  console.log(weather);

  const elements = weather?.forecast.forecastday[0].hour.map(
    (hour, index: number): JSX.Element => {
      const hourNow: number = new Date().getHours();
      const hourNumber: number = Number(hour.time.slice(11, 13));
      const now: boolean = hourNumber === hourNow;

      return (
        <div
          className={styles.hour}
          key={index}
          ref={now ? currentHourRef : null}
        >
          <p>
            {unit === "c" ? hour.temp_c.toFixed(0) : hour.temp_f.toFixed(0)}°
            {unit.toUpperCase()}
          </p>
          <img src={hour.condition.icon} />
          <p>{hour.time.slice(10, 18)}</p>
        </div>
      );
    }
  );

  //   trying to scroll to current hour
  //   An error is telling me to add context to the dependency array or remove it.
  //   Im currently removing the dependency array since it works and is not causing problems
  useEffect(() => {
    if (context !== undefined) {
      // runs to soon so the timeout makes sure everything is rendered and then it focuses
      setTimeout(() => {
        currentHourRef.current?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }, 1000);
    }
  });

  return <section className={styles.container}>{elements}</section>;
}
