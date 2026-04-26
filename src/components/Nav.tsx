import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  return (
    <header className={styles.nav}>
      <NavLink to="/" className={styles.logo}>
        rive_my_figma
      </NavLink>
      <nav className={styles.links}>
        <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>
          home
        </NavLink>
        <NavLink to="/gallery" className={({ isActive }) => isActive ? styles.active : ''}>
          gallery
        </NavLink>
        <a
          href="https://github.com/aartics/rive_my_figma"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
      </nav>
    </header>
  )
}
