import { useContext } from "react";
import { WeatherContext } from "../Main/Main";
import type { JSX } from "react";
import type { Forecastday } from "../../types";
import styles from "./Forecast.module.css";

export default function Forecast(): JSX.Element {
  // const [currentDayIndex, setCurrentDayIndex] = useState<number | null>(null);
  const context = useContext(WeatherContext);
  // console.log(currentDayIndex);

  if (!context) {
    throw new Error("Typescript stops screaming");
  }

  const { weather, unit } = context;
  console.log(weather);

  const forecastElements = weather?.forecast.forecastday.map(
    (day: Forecastday, index: number): JSX.Element => {
      return (
        <div key={day.date} className={styles.forecastEl}>
          <div
            className={styles.currentDay}
            onClick={() => console.log(`the index is ${index}`)}
          >
            <p className={styles.endEl}>
              {day.date.split("-").reverse().slice(0, 2).join(".")}
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

          <div className={styles.hours}>
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
                      <img src={hour.condition.icon} />
                      {/* <p>
                        {hour.chance_of_rain > 0
                          ? hour.chance_of_rain + "%"
                          : null}
                        {hour.chance_of_snow > 0
                          ? hour.chance_of_snow + "%"
                          : null}
                      </p> */}
                      <p>{hour.time.slice(10, 18)}</p>
                    </div>
                  )
                )
              : null}
          </div>
        </div>
      );
    }
  );
  return <section className={styles.forecastBox}>{forecastElements} </section>;
}
