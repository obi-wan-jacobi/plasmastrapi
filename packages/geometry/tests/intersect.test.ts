import { fromGeoJSONCoordinatesToShapes, intersect, turf } from '../lib';

describe(intersect.name, () => {
  it('returns intersection of two perfectly overlapping polygons', () => {
    const polygonA = turf.polygon([
      [
        [100, 100],
        [200, 100],
        [200, 200],
        [100, 200],
        [100, 100],
      ],
    ]);
    const polygonB = turf.polygon([
      [
        [100, 100],
        [200, 100],
        [200, 200],
        [100, 200],
        [100, 100],
      ],
    ]);
    const intersection = intersect(polygonA, polygonB);
    expect(fromGeoJSONCoordinatesToShapes(intersection)).toEqual([
      {
        vertices: [
          { x: 100, y: 100 },
          { x: 200, y: 100 },
          { x: 200, y: 200 },
          { x: 100, y: 200 },
        ],
      },
    ]);
  });

  it('returns null for perfect edge-to-edge contact', () => {
    const polygonA = turf.polygon([
      [
        [100, 100],
        [200, 100],
        [200, 200],
        [100, 200],
        [100, 100],
      ],
    ]);
    const polygonB = turf.polygon([
      [
        [200, 100],
        [300, 100],
        [300, 200],
        [200, 200],
        [200, 100],
      ],
    ]);
    const intersection = intersect(polygonA, polygonB);
    expect(intersection).toBe(null);
  });

  it('returns a polygon that is completely contained by the outer one', () => {
    const polygonA = turf.polygon([
      [
        [100, 100],
        [200, 100],
        [200, 200],
        [100, 200],
        [100, 100],
      ],
    ]);
    const polygonB = turf.polygon([
      [
        [110, 110],
        [190, 110],
        [190, 190],
        [110, 190],
        [110, 110],
      ],
    ]);
    const intersection = intersect(polygonA, polygonB);
    expect(fromGeoJSONCoordinatesToShapes(intersection)).toEqual([
      {
        vertices: [
          { x: 110, y: 110 },
          { x: 190, y: 110 },
          { x: 190, y: 190 },
          { x: 110, y: 190 },
        ],
      },
    ]);
  });
});
