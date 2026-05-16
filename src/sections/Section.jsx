import Reveal from "../components/Reveal.jsx";

export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="section-title">{title}</div>
            {subtitle ? <div className="section-subtitle">{subtitle}</div> : null}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

