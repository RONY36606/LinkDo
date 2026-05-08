import { Outlet, NavLink } from 'react-router-dom'
import GlitchText from './GlitchText'
import styles from './Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <GlitchText
          text="LINK.DO"
          as="span"
          className={styles.brand}
          interval={4500}
        />
        <div className={styles.links}>
          <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>// INICIO</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : ''}>// DASHBOARD</NavLink>
        </div>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
