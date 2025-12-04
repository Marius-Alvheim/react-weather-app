import type { JSX } from "react";
import styles from "./Header.module.css";

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>MA</div>
      <button
        className={styles.btn}
        onClick={() => alert("This feature has not been added yet")}
      >
        C°/F°
      </button>
    </header>
  );
}
