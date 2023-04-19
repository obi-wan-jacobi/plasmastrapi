import { booleanPointInPolygon, turf } from '../lib';

describe(booleanPointInPolygon.name, () => {
  it('does contain a point lying exactly on an edge', () => {
    const polygon = turf.polygon([
      [
        [0, 0],
        [0, 100],
        [100, 100],
        [100, 0],
        [0, 0],
      ],
    ]);
    const point = turf.point([50, 100]);
    expect(booleanPointInPolygon(point, polygon)).toBe(true);
  });

  it('does not contain a point lying exactly on an edge when ignoreBoundary is true', () => {
    const polygon = turf.polygon([
      [
        [0, 0],
        [0, 100],
        [100, 100],
        [100, 0],
        [0, 0],
      ],
    ]);
    const point = turf.point([50, 100]);
    expect(booleanPointInPolygon(point, polygon, { ignoreBoundary: true })).toBe(false);
  });
});
