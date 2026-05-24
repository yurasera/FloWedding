import Reveal from "../components/Reveal.jsx";

export default function Section({
  id,
  title,
  subtitle,
  background,
  children,
}) {
  return (
    <section id={id} className={background ? "section has-bg" : "section"}>
      {background ? <div className="section-bg">{background}</div> : null}
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
