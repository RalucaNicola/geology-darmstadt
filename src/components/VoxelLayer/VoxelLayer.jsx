import { useEffect, useState } from 'react';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';

const VoxelLayer = ({
  selectedVariable,
  selectedVisualization,
  exaggeration,
  mapView,
  continuousVariable,
  setContinuousVariable,
  setIsosurfaceInfo,
  sections,
  setSections,
  displayIsosurface,
  isosurfaceValue,
  setIsosurfaceValue,
  displaySections,
  displaySlices,
  slices,
  dimensions,
  setDimensions,
  legendInfo,
  setLegendInfo
}) => {
  const [layer, setLayer] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded && exaggeration) {
      layer.volumeStyles.getItemAt(0).verticalExaggeration = exaggeration;
    }
  }, [loaded, layer, exaggeration]);

  useEffect(() => {
    if (layer) {
      layer.renderMode = selectedVisualization;
    }
  }, [layer, selectedVisualization]);

  useEffect(() => {
    if (layer) {
      layer.currentVariableId = selectedVariable.id;
    }
  }, [layer, selectedVariable]);

  useEffect(() => {
    if (layer) {
      const variable = layer.getVariable(selectedVariable.id);
      const continuousVariable = variable.renderingFormat.continuity === 'discrete' ? false : true;
      setContinuousVariable(continuousVariable);
    }
  }, [layer, selectedVariable]);

  useEffect(() => {
    if (layer) {
      const style = layer.getVariableStyle(selectedVariable.id);
      const legendInfo = {
        id: selectedVariable.id,
        label: style.label
      };
      if (style.transferFunction) {
        legendInfo.continuous = true;
        legendInfo.range = style.transferFunction.stretchRange;
        legendInfo.colorStops = style.transferFunction.colorStops;
      }
      if (style.uniqueValues && style.uniqueValues.length > 0) {
        legendInfo.continuous = false;
        console.log(style.uniqueValues);
        legendInfo.uniqueValues = style.uniqueValues.filter((uv) => {
          if (uv.label !== '<all other values>') {
            return {
              label: uv.label,
              value: uv.value,
              color: uv.color,
              enabled: uv.enabled
            };
          }
        });
      }
      setLegendInfo(legendInfo);
    }
  }, [layer, selectedVariable]);

  useEffect(() => {
    if (loaded) {
      const style = layer.getVariableStyle(selectedVariable.id);
      if (style && style.transferFunction) {
        const range = style.transferFunction.stretchRange;
        const min = Math.min(Math.round(range[0]), Math.round(range[1]));
        const max = Math.max(Math.round(range[0]), Math.round(range[1]));
        setIsosurfaceInfo({
          min,
          max
        });
        setIsosurfaceValue(Math.floor((min + max) / 2));
      }
    }
  }, [loaded, layer, selectedVariable]);

  useEffect(() => {
    if (layer && legendInfo) {
      if (!legendInfo.continuous) {
        layer.getVariableStyle(legendInfo.id).uniqueValues = legendInfo.uniqueValues.map((uv) => {
          return {
            color: uv.color,
            value: uv.value,
            enabled: uv.enabled,
            label: uv.label
          };
        });
      }
    }
  }, [layer, legendInfo]);

  useEffect(() => {
    if (loaded && layer && selectedVisualization === 'surfaces' && continuousVariable && isosurfaceValue) {
      const style = layer.getVariableStyle(selectedVariable.id);
      const color = layer.getColorForContinuousDataValue(selectedVariable.id, isosurfaceValue, false);
      if (style) {
        style.isosurfaces = [
          {
            value: isosurfaceValue,
            enabled: true,
            color: { ...color, a: 0.7 },
            colorLocked: false
          }
        ];
      }
    }
  }, [loaded, selectedVariable, isosurfaceValue, layer, selectedVisualization, continuousVariable]);

  useEffect(() => {
    if (layer) {
      layer.enableIsosurfaces = displayIsosurface;
    }
  }, [layer, displayIsosurface]);

  useEffect(() => {
    if (layer) {
      layer.enableDynamicSections = displaySections;
    }
  }, [layer, displaySections]);

  useEffect(() => {
    if (layer) {
      layer.enableSlices = displaySlices;
    }
  }, [layer, layer, displaySlices]);

  useEffect(() => {
    if (loaded) {
      layer.getVolumeStyle().slices = slices;
    }
  }, [loaded, layer, slices]);

  useEffect(() => {
    if (loaded) {
      layer.getVolumeStyle().dynamicSections = sections;
    }
  }, [loaded, layer, sections]);

  useEffect(() => {
    if (loaded && dimensions && dimensions.length > 0) {
      const sections = [];
      for (let i = 1; i < dimensions[1]; i++) {
        sections.push({ enabled: false, label: `we${i}`, orientation: 180, tilt: 90, point: [0, i, 0] });
      }
      for (let i = 1; i < dimensions[0]; i++) {
        sections.push({ enabled: false, label: `ns${i}`, orientation: 90, tilt: 90, point: [i, 0, 0] });
      }
      setSections(sections);
    }
  }, [loaded, dimensions]);

  useEffect(() => {
    if (loaded) {
      const volume = voxelLayer.getVolume();
      setDimensions(volume.sizeInVoxels);
    }
  }, [loaded]);

  useEffect(() => {
    if (mapView) {
      const voxelLayer = mapView.map.layers.getItemAt(0);
      if (!voxelLayer.loaded) {
        reactiveUtils.watch(() => voxelLayer.loaded, setLoaded);
      } else {
        setLoaded(true);
      }
      window.voxelLayer = voxelLayer;
      setLayer(voxelLayer);
    }
  }, [mapView]);

  return null;
};

export default VoxelLayer;
