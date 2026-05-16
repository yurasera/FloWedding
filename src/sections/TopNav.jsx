export default function TopNav({ coupleName }) {
  return (
    <nav className="topnav">
      <div className="container nav-inner">
        <a className="brand" href="#top" aria-label="Ke atas">
          {coupleName}
        </a>
        <div className="nav-links">
          <a href="#mempelai">Mempelai</a>
          <a href="#acara">Acara</a>
          <a href="#cerita">Cerita</a>
          <a href="#rsvp">RSVP</a>
        </div>
      </div>
    </nav>
  );
}

