import { useContext, useState } from "react";
import { WeatherContext } from "../Main/Main";
import type { JSX } from "react";
import type { Forecastday } from "../../types";
import styles from "./Forecast.module.css";

export default function Forecast(): JSX.Element {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("Typescript stops screaming");
  }
  const { weather, unit } = context;

  const forecastElements = weather?.forecast.forecastday.map(
    (day: Forecastday, index: number): JSX.Element => {
      const today = new Date().toISOString().split("T")[0];
      const open = activeDay === index ? styles.open : "";
      // console.log(today);
      return (
        <section key={day.date} className={styles.forecastEl}>
          <div
            className={styles.currentDay}
            onClick={() => setActiveDay(activeDay === index ? null : index)}
          >
            <p className={styles.endEl}>
              {day.date === today
                ? "Today"
                : day.date.split("-").reverse().slice(0, 2).join(".")}
            </p>

            <div className={styles.iconBox}>
              <img src={day.day.condition.icon} />
              <p>
                {day.day.daily_chance_of_rain > 0
                  ? day.day.daily_chance_of_rain
                  : null}
                {day.day.daily_chance_of_snow > 0
                  ? day.day.daily_chance_of_snow
                  : null}{" "}
                %
              </p>
            </div>
            <p className={styles.endEl}>
              {unit === "c"
                ? day.day.avgtemp_c.toFixed(0)
                : day.day.avgtemp_f.toFixed(0)}
              °{unit.toUpperCase()}
            </p>
          </div>

          <div className={`${styles.hours} ${open}`}>
            {day.hour?.length
              ? day.hour?.map(
                  (hour): JSX.Element => (
                    <div key={hour.time_epoch} className={styles.hourBoxes}>
                      <p>
                        {unit === "c"
                          ? hour.temp_c.toFixed(0)
                          : hour.temp_f.toFixed(0)}
                        °{unit.toUpperCase()}
                      </p>
                      <p
                        style={{
                          color: "cyan",
                          textAlign: "center",
                          margin: "0.2rem 0 0.2rem 0",
                        }}
                      >
                        {hour.chance_of_rain > 0
                          ? hour.chance_of_rain + "%"
                          : null}
                        {hour.chance_of_snow > 0
                          ? hour.chance_of_snow + "%"
                          : null}
                      </p>
                      <img src={hour.condition.icon} />
                      <p>{hour.time.slice(10, 18)}</p>
                    </div>
                  )
                )
              : null}
          </div>
        </section>
      );
    }
  );
  return <section className={styles.forecastBox}>{forecastElements} </section>;
}
