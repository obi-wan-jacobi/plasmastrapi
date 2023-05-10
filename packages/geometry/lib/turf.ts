import * as geojson from 'geojson';
import * as turf from '@turf/helpers';
import area from '@turf/area';
import bbox from '@turf/bbox';
import difference from '@turf/difference';
import kinks from '@turf/kinks';
import simplify from '@turf/simplify';
import unkinkPolygon from '@turf/unkink-polygon';

export { turf, geojson, area, bbox, difference, kinks, simplify, unkinkPolygon };

export const booleanContains = require('@turf/boolean-contains').default;
export const booleanOverlap = require('@turf/boolean-overlap').default;
export const booleanPointInPolygon = require('@turf/boolean-point-in-polygon').default;
export const booleanPointOnLine = require('@turf/boolean-point-on-line').default;
export const centerOfMass = require('@turf/center-of-mass').default;
export const lineIntersect = require('@turf/line-intersect').default;
export const intersect = require('@turf/intersect').default;
