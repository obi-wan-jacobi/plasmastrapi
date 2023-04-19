import { lineIntersect, turf } from '../lib';

describe(lineIntersect.name, () => {
  it('does not count any intersections for concurrent lines', () => {
    const longLine = turf.lineString([
      [100, 100],
      [200, 100],
    ]);
    const shortLine = turf.lineString([
      [145, 100],
      [155, 100],
    ]);
    const intersections = lineIntersect(longLine, shortLine);
    expect(intersections.features.length).toBe(0);
  });
});
