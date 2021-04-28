import Head from "next/head"
import styles from "../styles/Nav.module.css"


export default function Nav() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>IMLIKEU</div>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <a href='#'>Store</a>
        </li>
        <li className={styles.li}>
          <a href='#'>Blog</a>
        </li>
        <li className={styles.li}>
          <a href='#'>Contact</a>
        </li>
      </ul>
      <li className={styles.li}>cart</li>
    </nav>
  )
}
