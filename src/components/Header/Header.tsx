import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <p>Placeholder Logo</p>
      <button>Change to farenheit</button>
    </header>
  );
}
