import { useEffect } from 'react';
import { Point, Polyline, SpatialReference } from '@arcgis/core/geometry';
import Graphic from '@arcgis/core/Graphic';
// ETRS 1989 UTM Zone 32N
const spatialReference = new SpatialReference({ wkid: 102328 });

const indicatorSymbol = {
  type: 'line-3d',
  symbolLayers: [
    {
      type: 'line',
      material: { color: [200, 200, 200] },
      size: 1
    }
  ]
};

const getLabelGraphic = (coordinates, text) => {
  const pointGeometry = new Point({
    x: coordinates[0],
    y: coordinates[1],
    z: coordinates[2],
    spatialReference
  });
  return new Graphic({
    geometry: pointGeometry,
    symbol: {
      type: 'point-3d',
      symbolLayers: [
        {
          type: 'text',
          text: `${text} m    `,
          material: { color: 'white' },
          horizontalAlignment: 'right',
          verticalAlignment: 'middle',
          font: {
            size: 8,
            family: `"Avenir Next", Avenir, "Helvetica Neue", sans-serif`,
            weight: 'lighter'
          },
          halo: {
            color: [140, 140, 140],
            size: 0.8
          }
        }
      ]
    }
  });
};

const getScale = (x, y, height) => {
  const lineGeometry = new Polyline({
    paths: [
      [x, y, 0],
      [x, y, height]
    ],
    spatialReference
  });
  return new Graphic({
    geometry: lineGeometry,
    symbol: indicatorSymbol
  });
};

const getIndicator = (x, y, z) => {
  const lineGeometry = new Polyline({
    paths: [
      [
        [x, y, z],
        [x + 300, y, z]
      ],
      [
        [x, y, z],
        [x, y + 300, z]
      ]
    ],
    spatialReference
  });
  return new Graphic({
    geometry: lineGeometry,
    symbol: indicatorSymbol
  });
};

const getBoundingBox = (xmin, xmax, ymin, ymax, zmin, zmax) => {
  const lineGeometry = new Polyline({
    paths: [
      [
        [xmin, ymin, zmax],
        [xmax, ymin, zmax]
      ],
      [
        [xmin, ymin, zmax],
        [xmin, ymax, zmax]
      ],
      [
        [xmin, ymax, zmax],
        [xmax, ymax, zmax]
      ],
      [
        [xmax, ymin, zmax],
        [xmax, ymax, zmax]
      ],
      [
        [xmin, ymin, zmin],
        [xmax, ymin, zmin]
      ],
      [
        [xmin, ymin, zmin],
        [xmin, ymax, zmin]
      ],
      [
        [xmin, ymax, zmin],
        [xmax, ymax, zmin]
      ],
      [
        [xmax, ymin, zmin],
        [xmax, ymax, zmin]
      ]
    ],
    spatialReference
  });
  return new Graphic({
    geometry: lineGeometry,
    symbol: {
      type: 'line-3d',
      symbolLayers: [
        {
          type: 'line',
          material: { color: [200, 200, 200, 0.8] },
          size: 0.75,
          pattern: {
            type: 'style',
            style: 'dash'
          }
        }
      ]
    }
  });
};

const Scale = ({ exaggeration, mapView }) => {
  useEffect(() => {
    if (mapView && exaggeration) {
      const voxelLayer = mapView.map.layers.getItemAt(0);
      const { xmin, xmax, ymin, ymax, zmin, zmax } = voxelLayer.fullExtent;
      mapView.graphics.removeAll();
      const exaggeratedZmax = (zmax - zmin) * exaggeration;
      const boundingBox = getBoundingBox(xmin, xmax, ymin, ymax, zmin, exaggeratedZmax);
      const scale = getScale(xmin, ymin, exaggeratedZmax);
      const bottomLabel = getLabelGraphic([xmin, ymin, zmin], Math.round(zmin));
      const topLabel = getLabelGraphic([xmin, ymin, exaggeratedZmax], Math.round(zmax));
      const topIndicator = getIndicator(xmin, ymin, exaggeratedZmax);
      const bottomIndicator = getIndicator(xmin, ymin, zmin);
      mapView.graphics.addMany([boundingBox, scale, bottomLabel, bottomIndicator, topLabel, topIndicator]);
    }
  }, [mapView, exaggeration]);

  return null;
};

export default Scale;
