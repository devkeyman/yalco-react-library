import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>도서 관리자</div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/add">도서 추가</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
