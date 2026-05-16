import Reveal from "../components/Reveal.jsx";
import Section from "./Section.jsx";

export default function StorySection({ story }) {
  return (
    <Section id="cerita" title="Cerita Singkat" subtitle="Beberapa potongan perjalanan kami.">
      <div className="grid3 gap">
        {story.map((s, idx) => (
          <Reveal key={s.title} delay={idx * 80}>
            <div className="card">
              <div className="card-title">{s.title}</div>
              <div className="text">{s.body}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

