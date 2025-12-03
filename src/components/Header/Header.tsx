import type { JSX } from "react";
import styles from "./Header.module.css";

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <p>Placeholder Logo</p>
      <button>Change to farenheit</button>
    </header>
  );
}
