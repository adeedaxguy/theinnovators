"use client";

import { geoAlbersUsa, geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import usaTopologyJson from "us-atlas/states-10m.json";
import worldTopologyJson from "world-atlas/countries-110m.json";
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import type { Topology } from "topojson-specification";
import type { IntelligencePoint } from "./intelligence-data";
import { cx } from "./utils";

type GeographicMapProps = {
  mode: "world" | "usa";
  points: IntelligencePoint[];
  selectedPoint?: IntelligencePoint;
  onSelectPoint?: (point: IntelligencePoint) => void;
};

type MapShape = {
  id: string;
  name: string;
  path: string;
};

const worldTopology = worldTopologyJson as unknown as Topology;
const usaTopology = usaTopologyJson as unknown as Topology;

function buildShapes(mode: "world" | "usa"): MapShape[] {
  const topology = mode === "usa" ? usaTopology : worldTopology;
  const object = topology.objects[mode === "usa" ? "states" : "countries"];
  const collection = feature(topology, object) as unknown as FeatureCollection<Geometry, GeoJsonProperties>;
  const projection = mode === "usa" ? geoAlbersUsa() : geoNaturalEarth1();

  projection.fitSize([1000, 560], collection);
  const pathBuilder = geoPath(projection);

  return collection.features.map((item: Feature<Geometry, GeoJsonProperties>) => ({
    id: String(item.id ?? item.properties?.name ?? ""),
    name: String(item.properties?.name ?? "Unknown"),
    path: pathBuilder(item) ?? "",
  }));
}

const mapShapes = {
  world: buildShapes("world"),
  usa: buildShapes("usa"),
};

const aliases: Record<string, string> = {
  "United States of America": "United States",
};

function normalizeLocationName(name: string) {
  return aliases[name] ?? name;
}

export function GeographicMap({ mode, onSelectPoint, points, selectedPoint }: GeographicMapProps) {
  const pointsByName = new Map(points.map((point) => [point.label.toLowerCase(), point]));

  return (
    <svg
      aria-label={mode === "usa" ? "Detailed map of the United States" : "Detailed world map"}
      className="geographic-map"
      preserveAspectRatio="xMidYMid meet"
      role={onSelectPoint ? "group" : "img"}
      viewBox="0 0 1000 560"
    >
      <rect className="geographic-map-ocean" height="560" width="1000" />
      <g className="geographic-map-graticule" aria-hidden="true">
        {[120, 240, 360, 480, 600, 720, 840].map((x) => (
          <path d={`M ${x} 18 C ${x - 44} 160 ${x + 44} 400 ${x} 542`} key={`x-${x}`} />
        ))}
        {[100, 190, 280, 370, 460].map((y) => (
          <path d={`M 18 ${y} C 250 ${y - 20} 750 ${y + 20} 982 ${y}`} key={`y-${y}`} />
        ))}
      </g>
      <g className="geographic-map-land">
        {mapShapes[mode].map((shape, index) => {
          const locationName = normalizeLocationName(shape.name);
          const point = pointsByName.get(locationName.toLowerCase());
          const interactivePoint = onSelectPoint ? point : undefined;
          const isSelected = Boolean(point && point.id === selectedPoint?.id);

          return (
            <path
              aria-label={interactivePoint ? `Open ${locationName} intelligence profile` : locationName}
              className={cx(
                `map-tone-${index % 6}`,
                point && "has-profile",
                isSelected && "is-selected"
              )}
              d={shape.path}
              key={`${shape.id}-${shape.name}`}
              onClick={() => interactivePoint && onSelectPoint?.(interactivePoint)}
              onFocus={() => interactivePoint && onSelectPoint?.(interactivePoint)}
              onKeyDown={(event) => {
                if (interactivePoint && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  onSelectPoint?.(interactivePoint);
                }
              }}
              onMouseEnter={() => interactivePoint && onSelectPoint?.(interactivePoint)}
              role={interactivePoint ? "button" : undefined}
              tabIndex={interactivePoint ? 0 : -1}
            >
              <title>{point ? `${locationName}: profile available` : locationName}</title>
            </path>
          );
        })}
      </g>
    </svg>
  );
}
