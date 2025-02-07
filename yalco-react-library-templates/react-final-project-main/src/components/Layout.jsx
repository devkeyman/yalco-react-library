import Navbar from './Navbar'
import styles from './Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

export default Layout
