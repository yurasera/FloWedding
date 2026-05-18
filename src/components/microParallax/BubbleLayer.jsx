import ParallaxLayer from "../ParallaxLayer.jsx";
import BubbleField from "./BubbleField.jsx";

export default function BubbleLayer({ count = 20, seed = 1 }) {
  return (
    <ParallaxLayer
      speed={0.08}
      range={320}
      mouseX={30}
      mouseY={18}
      rotateX={4}
      rotateY={-4}
      className="micro-layer micro-bubbles"
    >
      <BubbleField count={count} seed={seed} />
    </ParallaxLayer>
  );
}

