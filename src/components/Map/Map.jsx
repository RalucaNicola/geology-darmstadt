import * as styles from "./Map.module.css";
import {useRef, useEffect, useState, Children, cloneElement} from "react";
import SceneView from "@arcgis/core/views/SceneView";
import WebScene from "@arcgis/core/WebScene";
import {mapConfig} from "../../config";

const getSidePadding = () => {
  return Math.min(Math.max(window.innerWidth * 0.3, 200), 300);
};

const Map = ({children}) => {
  const mapDivRef = useRef(null);
  const [mapView, setMapView] = useState(null);

  // initialize effect
  useEffect(() => {
    if (mapDivRef.current) {
      const padding = getSidePadding();
      let view = new SceneView({
        container: mapDivRef.current,
        map: new WebScene({
          portalItem: {
            id: mapConfig["web-scene-id"],
          },
        }),
        ui: {components: []},
        qualityProfile: "high",
        padding: {
          left: padding,
          right: padding,
        },
        alphaCompositingEnabled: true,
        environment: {
          background: {
            type: "color",
            color: [0, 0, 0, 0],
          },
          starsEnabled: false,
          atmosphereEnabled: false,
        },
      });
      view
        .when(() => {
          setMapView(view);
          window.view = view;
        })
        .catch(console.error);
    }
    return () => {
      if (mapView) {
        mapView.destroy();
        setMapView(null);
      }
    };
  }, [mapDivRef]);

  return (
    <>
      <div className={styles.mapContainer} ref={mapDivRef}></div>
      {Children.map(children, child => {
        return cloneElement(child, {
          mapView,
        });
      })}
    </>
  );
};

export default Map;
