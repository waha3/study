type p = {
  x: number;
  y: number;
};

const threeOrderBezier = (p0: p, p1: p, p2: p, p3: p, t: number) => {
  return {
    x:
      p0.x * Math.pow(1 - t, 3) +
      3 * p1.x * t * Math.pow(1 - t, 2) +
      3 * p2.x * Math.pow(t, 2) * (1 - t) +
      p3.x * Math.pow(t, 3),
    y:
      p0.y * Math.pow(1 - t, 3) +
      3 * p1.y * t * Math.pow(1 - t, 2) +
      3 * p2.y * Math.pow(t, 2) * (1 - t) +
      p3.y * Math.pow(t, 3),
  };
};
