import { Background, Legend } from '../index';
import * as styles from './MenuPanel.module.css';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-switch';
import { CalciteLabel, CalciteSwitch } from '@esri/calcite-components-react';

const Menu = ({
  variableStyle,
  setEnableGrid,
  enableGrid,
  displayLegend,
  setDisplayLegend,
  displayFault,
  setDisplayFault
}) => {
  return (
    <Background title='' size='small'>
      <div className={styles.variableInfo}>
        <CalciteLabel
          className={styles.label}
          layout='inline-space-between'
          onCalciteSwitchChange={(event) => {
            setDisplayLegend(event.target.checked);
          }}
        >
          Display legend
          <CalciteSwitch scale='m' checked={displayLegend ? true : undefined}></CalciteSwitch>
        </CalciteLabel>
        {displayLegend ? <Legend variableStyle={variableStyle}></Legend> : <></>}
      </div>
      <div className={styles.layerVisibility}>
        <CalciteLabel
          className={styles.label}
          layout='inline-space-between'
          onCalciteSwitchChange={(event) => {
            setEnableGrid(event.target.checked);
          }}
        >
          Display grid
          <CalciteSwitch scale='m' checked={enableGrid ? true : undefined}></CalciteSwitch>
        </CalciteLabel>
      </div>
      <div className={styles.layerVisibility}>
        <CalciteLabel
          className={styles.label}
          layout='inline-space-between'
          onCalciteSwitchChange={(event) => {
            setDisplayFault(event.target.checked);
          }}
        >
          Display fault
          <CalciteSwitch scale='m' checked={displayFault ? true : undefined}></CalciteSwitch>
        </CalciteLabel>
      </div>
      <div className='separator'></div>
      <div className={styles.overviewMap}>
        <div>Geological model displaying soil lithology and permeability in Darmstadt, Hessen, Germany.</div>
        <div>
          <img src='./assets/overview-map.png'></img>
        </div>
      </div>
    </Background>
  );
};

export default Menu;
