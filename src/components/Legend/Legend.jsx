import { useEffect, useState } from 'react';
import Legend from '@arcgis/core/widgets/Legend';
const LegendContainer = ({ legendContainer, mapView, displayLegend }) => {
  const [legend, setLegend] = useState(null);
  useEffect(() => {
    if (legend) {
      legend.visible = displayLegend;
    }
  }, [legend, displayLegend]);
  useEffect(() => {
    if (legendContainer && mapView) {
      legendContainer.innerHTML = '';
      setLegend(
        new Legend({
          view: mapView,
          container: legendContainer
        })
      );
    }
  }, [legendContainer, mapView]);

  return null;
};

export default LegendContainer;
