import Link from 'next/link';
import style from '../scss/style.scss';

const Nav = () => (
  <header className={`navbar mynav ${style.test}`}>
    <section className="navbar-section">
      <Link href="/">
        <button className="btn btn-link text-bold color-white">Home</button>
      </Link>
    </section>
  </header>
);

export default Nav;
