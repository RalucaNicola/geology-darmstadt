import { useEffect, useState } from 'react';
import DimensionLayer from '@arcgis/core/layers/DimensionLayer';
import DimensionAnalysis from '@arcgis/core/analysis/DimensionAnalysis';
import LengthDimension from '@arcgis/core/analysis/LengthDimension';
import DimensionSimpleStyle from '@arcgis/core/analysis/DimensionSimpleStyle';
import { Point, SpatialReference, Extent } from '@arcgis/core/geometry';
import MediaLayer from '@arcgis/core/layers/MediaLayer';
import ImageElement from '@arcgis/core/layers/support/ImageElement';
import ExtentAndRotationGeoreference from '@arcgis/core/layers/support/ExtentAndRotationGeoreference';

// ETRS 1989 UTM Zone 32N
const spatialReference = new SpatialReference({ wkid: 102328 });
const alpha = 0.4;
const offset = -70;

const Grid = ({ mapView, enableGrid }) => {
  const [gridLayer, setGridLayer] = useState(null);
  const [dimensionLayer, setDimensionLayer] = useState(null);
  useEffect(() => {
    if (dimensionLayer && gridLayer) {
      dimensionLayer.visible = enableGrid;
      gridLayer.visible = enableGrid;
    }
  }, [dimensionLayer, gridLayer, enableGrid]);
  useEffect(() => {
    if (mapView) {
      const voxelLayer = mapView.map.layers.getItemAt(0);
      const { xmin, xmax, ymin, ymax } = voxelLayer.fullExtent;
      const dimensionLayer = new DimensionLayer({
        source: new DimensionAnalysis({
          dimensions: [
            new LengthDimension({
              startPoint: new Point({ x: xmin + 100, y: ymin, z: offset, spatialReference }),
              endPoint: new Point({ x: xmax, y: ymin, z: offset, spatialReference })
            }),
            new LengthDimension({
              startPoint: new Point({ x: xmin, y: ymin + 100, z: offset, spatialReference }),
              endPoint: new Point({ x: xmin, y: ymax, z: offset, spatialReference })
            })
          ]
        }),
        style: new DimensionSimpleStyle({
          color: [185, 185, 185, 1],
          lineSize: 1,
          textBackgroundColor: [0, 0, 0, 0],
          textColor: [255, 255, 255, 1],
          fontSize: 8
        })
      });

      const gridLayer = new MediaLayer({
        source: [
          new ImageElement({
            image: `./assets/grid.png`,
            georeference: new ExtentAndRotationGeoreference({
              extent: new Extent({
                spatialReference,
                xmin: xmin + 300,
                ymin: ymin + 300,
                xmax: xmax - 300,
                ymax: ymax - 300
              })
            })
          })
        ],
        opacity: alpha + 0.4
      });

      setGridLayer(gridLayer);
      setDimensionLayer(dimensionLayer);

      mapView.map.addMany([gridLayer, dimensionLayer]);
    }
  }, [mapView]);

  return null;
};

export default Grid;
