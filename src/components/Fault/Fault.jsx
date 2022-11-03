import { useEffect, useState } from 'react';

const FaultLayer = ({ displayFault, mapView }) => {
  const [layer, setLayer] = useState(null);

  useEffect(() => {
    if (layer) {
      layer.visible = displayFault;
    }
  }, [layer, displayFault]);

  useEffect(() => {
    if (mapView) {
      const faultLayer = mapView.map.layers.getItemAt(2);
      setLayer(faultLayer);
    }
  }, [mapView]);

  return null;
};

export default FaultLayer;
