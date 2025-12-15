import type { JSX } from "react";
import styles from "./Header.module.css";
import { useContext } from "react";
import { WeatherContext } from "../Main/Main";

export default function Header(): JSX.Element {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("Typescript stops screaming");
  }

  const { switchUnits } = context;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>MA</div>
      <button className={styles.btn} onClick={switchUnits}>
        C°/F°
      </button>
    </header>
  );
}
