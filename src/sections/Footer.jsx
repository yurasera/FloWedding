export default function Footer({ coupleName }) {
  return (
    <footer className="footer">
      <div className="container foot-inner">
        <div className="foot-title">Terima kasih</div>
        <div className="foot-sub">
          Merupakan kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir.
        </div>
        <div className="foot-meta">{coupleName}</div>
      </div>
    </footer>
  );
}

