import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import InteractionView from './pages/InteractionView'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <Nav />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/interaction/:id" element={<InteractionView />} />
        </Routes>
      </main>
    </div>
  )
}
