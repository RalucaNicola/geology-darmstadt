import { useState } from 'react';
import { Map, Title, MeasurementsPanel, VisualizationPanel, Legend, VoxelLayer, Scale, Grid } from '../components';
import { variables } from '../config';
import * as styles from './App.module.css';

export const App = () => {
  const [selectedVariable, setSelectedVariable] = useState(variables[0]);
  const [selectedVisualization, setSelectedVisualization] = useState('volume');

  const [exaggeration, setExaggeration] = useState(15);
  const [legendContainer, setLegendContainer] = useState(null);
  const [sections, setSections] = useState([]);
  const [continuousVariable, setContinuousVariable] = useState(null);
  const [isosurfaceInfo, setIsosurfaceInfo] = useState(null);
  const [displayIsosurface, setDisplayIsosurface] = useState(false);
  const [isosurfaceValue, setIsosurfaceValue] = useState();
  const [displaySections, setDisplaySections] = useState(true);
  const [displaySlices, setDisplaySlices] = useState(false);
  const [slices, setSlices] = useState([]);
  const [dimensions, setDimensions] = useState([]);
  const [enableGrid, setEnableGrid] = useState(true);
  const [displayLegend, setDisplayLegend] = useState(true);
  return (
    <>
      <Map>
        <Legend legendContainer={legendContainer} displayLegend={displayLegend}></Legend>
        <VoxelLayer
          selectedVariable={selectedVariable}
          selectedVisualization={selectedVisualization}
          exaggeration={exaggeration}
          continuousVariable={continuousVariable}
          setContinuousVariable={setContinuousVariable}
          isosurfaceInfo={isosurfaceInfo}
          setIsosurfaceInfo={setIsosurfaceInfo}
          isosurfaceValue={isosurfaceValue}
          setIsosurfaceValue={setIsosurfaceValue}
          displayIsosurface={displayIsosurface}
          sections={sections}
          setSections={setSections}
          displaySections={displaySections}
          displaySlices={displaySlices}
          slices={slices}
          dimensions={dimensions}
          setDimensions={setDimensions}
        ></VoxelLayer>
        <Scale exaggeration={exaggeration}></Scale>
        <Grid enableGrid={enableGrid}></Grid>
      </Map>
      <div className={styles.appLayout}>
        <header className={styles.appTitle}>
          <Title text='Geological model Darmstadt' size='large'></Title>
        </header>
        <div className={styles.appContent}>
          <div className={styles.leftPane}>
            <MeasurementsPanel
              selectedVariable={selectedVariable}
              setSelectedVariable={setSelectedVariable}
              setLegendContainer={setLegendContainer}
              setEnableGrid={setEnableGrid}
              enableGrid={enableGrid}
              displayLegend={displayLegend}
              setDisplayLegend={setDisplayLegend}
            ></MeasurementsPanel>
          </div>
          <div className={styles.rightPane}>
            <VisualizationPanel
              selectedVariable={selectedVariable}
              selectedVisualization={selectedVisualization}
              setSelectedVisualization={setSelectedVisualization}
              exaggeration={exaggeration}
              setExaggeration={setExaggeration}
              continuousVariable={continuousVariable}
              isosurfaceInfo={isosurfaceInfo}
              displayIsosurface={displayIsosurface}
              setDisplayIsosurface={setDisplayIsosurface}
              isosurfaceValue={isosurfaceValue}
              setIsosurfaceValue={setIsosurfaceValue}
              sections={sections}
              setSections={setSections}
              displaySections={displaySections}
              setDisplaySections={setDisplaySections}
              displaySlices={displaySlices}
              setDisplaySlices={setDisplaySlices}
              setSlices={setSlices}
              dimensions={dimensions}
            ></VisualizationPanel>
          </div>
        </div>
        <footer className={styles.appFooter}>
          <p>
            Dataset from{' '}
            <a href='https://www.hlnug.de/service/english' target='_blank'>
              Hessian Agency for Nature Conservation, Environment and Geology
            </a>{' '}
            and{' '}
            <a href='https://www.tu-darmstadt.de/' target='_blank'>
              Technical University of Darmstadt
            </a>
            .
          </p>
          <p>
            Powered by{' '}
            <a href='https://www.esri.com/en-us/home' target='_blank'>
              Esri
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};
