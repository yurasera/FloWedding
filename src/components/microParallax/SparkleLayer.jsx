import ParallaxLayer from "../ParallaxLayer.jsx";
import SparkleField from "./SparkleField.jsx";

export default function SparkleLayer({ count = 64, seed = 1 }) {
  return (
    <ParallaxLayer
      speed={0.12}
      range={360}
      mouseX={24}
      mouseY={16}
      rotateX={3}
      rotateY={-3}
      className="micro-layer micro-sparkles"
    >
      <SparkleField count={count} seed={seed} />
    </ParallaxLayer>
  );
}

