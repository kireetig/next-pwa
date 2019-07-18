import Link from 'next/link';

import '../spectre.css';
import '../style.css';

const Nav = () => (
  <header className="navbar mynav">
    <section className="navbar-section">
      <Link prefetch href="/">
        <button className="btn btn-link text-bold color-white">Home</button>
      </Link>
    </section>
  </header>
);

export default Nav;
