export default function createFlorals(motifs) {
  const prng01 = (seed) => {
    const s =
      Math.sin(seed * 12.9898 + seed * seed * 0.0001) *
      43758.5453;

    return s - Math.floor(s);
  };

  const variants = ["blossom", "leaf", "sprig", "star"];

  const items = [];
  const placed = { left: [], right: [] };

  // Jarak minimum antar flower
  const minDist = 22;

  const canPlace = (side, x, y) => {
    for (const p of placed[side]) {
      const dx = p.x - x;
      const dy = p.y - y;

      if (dx * dx + dy * dy < minDist * minDist) {
        return false;
      }
    }

    return true;
  };

  const pushFlower = (
    side,
    seed,
    motif,
    clusterIndex,
    x,
    y
  ) => {
    const s = 0.24 + prng01(seed + 13) * 0.22;
    const o = 0.34 + prng01(seed + 17) * 0.5;
    const r = -18 + prng01(seed + 29) * 36;
    const delay = prng01(seed + 71) * 6.2;

    const variant = variants[0];

    items.push({
      side,
      x,
      y,
      s,
      o,
      r: side === "right" ? -r : r,
      delay,
      variant,
      motif,
    });

    placed[side].push({ x, y });
  };

  const makeClusters = (side, seedBase) => {
    const motifList = motifs.length
      ? motifs
      : ["sunflower"];

    // Tambah cluster supaya penuh atas-bawah
    const clustersPerMotif = 2;

    const flowersPerCluster = 3;

    const clusterCenters = [];

    // Jarak minimum antar cluster
    const minClusterDist = 180;

    const sunflowerCenters = [];
    const sakuraCenters = [];

    const order = [
      "sunflower",
      "sakura",
      "rose",
      "lavender",
      "lotus",
      "daisy",
      "tulip",
      "peony",
    ];

    const motifRank = new Map(
      order.map((m, i) => [m, i])
    );

    const rankFor = (motif) =>
      motifRank.get(motif) ?? order.length;

    const clamp = (v, min, max) =>
      Math.max(min, Math.min(max, v));

    // Full vertical area
    const yMin = 0;
    const yMax = 992;

    const bandGap = 30;

    const bandCount = Math.max(
      1,
      order.length + 1
    );

    const bandH =
      (yMax -
        yMin -
        bandGap * (bandCount - 1)) /
      bandCount;

    const bandForMotif = (motif) => {
      const rank = rankFor(motif);

      const bandIndex = clamp(
        rank,
        0,
        bandCount - 1
      );

      const start =
        yMin + bandIndex * (bandH + bandGap);

      return {
        start,
        end: start + bandH,
      };
    };

    const canPlaceCluster = (x, y) => {
      for (const c of clusterCenters) {
        const dx = c.x - x;
        const dy = c.y - y;

        if (
          dx * dx + dy * dy <
          minClusterDist * minClusterDist
        ) {
          return false;
        }
      }

      return true;
    };

    for (let m = 0; m < motifList.length; m++) {
      const motif = motifList[m];

      for (let c = 0; c < clustersPerMotif; c++) {
        const seed =
          seedBase + m * 1000 + c * 97;

        let cx =
          42 + prng01(seed + 1) * 140;

        const band = bandForMotif(motif);

        let cy =
          band.start +
          prng01(seed + 2) *
          Math.max(
            1,
            band.end - band.start
          );

        // Relasi posisi antar motif
        if (motif === "sakura") {
          const base =
            sunflowerCenters.length
              ? sunflowerCenters[
              c % sunflowerCenters.length
              ]
              : null;

          if (base) {
            cx =
              base.x +
              (-28 + prng01(seed + 9) * 56);

            const target =
              base.y +
              170 +
              (-18 + prng01(seed + 10) * 36);

            cy = clamp(
              target,
              band.start,
              band.end
            );
          }
        } else if (motif === "rose") {
          const base =
            sakuraCenters.length
              ? sakuraCenters[
              c % sakuraCenters.length
              ]
              : null;

          if (base) {
            cx =
              base.x +
              (-28 + prng01(seed + 19) * 56);

            const target =
              base.y +
              160 +
              (-18 + prng01(seed + 20) * 36);

            cy = clamp(
              target,
              band.start,
              band.end
            );
          }
        }

        let attempts = 0;

        while (
          attempts < 40 &&
          !canPlaceCluster(cx, cy)
        ) {
          cx =
            42 +
            prng01(
              seed + 1 + attempts * 3
            ) *
            240;

          const bandTry =
            bandForMotif(motif);

          cy =
            bandTry.start +
            prng01(
              seed + 2 + attempts * 5
            ) *
            Math.max(
              1,
              bandTry.end - bandTry.start
            );

          attempts++;
        }

        // Clamp cluster
        cx = Math.max(
          22,
          Math.min(312, cx)
        );

        cy = Math.max(
          yMin,
          Math.min(yMax, cy)
        );

        clusterCenters.push({
          x: cx,
          y: cy,
        });

        if (motif === "sunflower") {
          sunflowerCenters.push({
            x: cx,
            y: cy,
          });
        }

        if (motif === "sakura") {
          sakuraCenters.push({
            x: cx,
            y: cy,
          });
        }

        // Radius lebih besar supaya airy
        const radius =
          90 + prng01(seed + 3) * 20;

        for (
          let k = 0;
          k < flowersPerCluster;
          k++
        ) {
          const kSeed = seed + k * 9;

          let tries = 0;

          let x = cx;
          let y = cy;

          while (tries < 28) {
            const angle =
              prng01(
                kSeed + tries * 7
              ) *
              Math.PI *
              2;

            const dist =
              (0.32 +
                prng01(
                  kSeed + tries * 11
                ) *
                0.78) *
              radius;

            x =
              cx +
              Math.cos(angle) * dist;

            y =
              cy +
              Math.sin(angle) * dist;

            // Clamp flower position
            x = Math.max(
              22,
              Math.min(12, x)
            );

            y = Math.max(
              yMin,
              Math.min(yMax, y)
            );

            if (
              canPlace(side, x, y)
            ) {
              break;
            }

            tries++;
          }

          pushFlower(
            side,
            kSeed,
            motif,
            c,
            x,
            y
          );
        }
      }
    }
  };

  makeClusters("left", 100);
  makeClusters("right", 500);

  return items;
}