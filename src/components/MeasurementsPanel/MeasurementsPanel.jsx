import { Background } from '../index';
import * as styles from './MeasurementsPanel.module.css';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-radio-button-group';
import '@esri/calcite-components/dist/components/calcite-radio-button';
import '@esri/calcite-components/dist/components/calcite-switch';
import {
  CalciteLabel,
  CalciteRadioButtonGroup,
  CalciteRadioButton,
  CalciteSwitch
} from '@esri/calcite-components-react';
import { variables } from '../../config';
import { useEffect, useRef } from 'react';

const MeasurementsPanel = ({
  selectedVariable,
  setSelectedVariable,
  setLegendContainer,
  setEnableGrid,
  enableGrid,
  displayLegend,
  setDisplayLegend
}) => {
  const legendContainerRef = useRef();
  useEffect(() => {
    setLegendContainer(legendContainerRef.current);
  }, [legendContainerRef]);
  return (
    <Background title='Variables' size='small'>
      <CalciteRadioButtonGroup
        name='pressure-group'
        layout='vertical'
        scale='s'
        onCalciteRadioButtonChange={(event) => {
          const variable = variables.filter((v) => v.name === event.target.value)[0];
          setSelectedVariable(variable);
        }}
      >
        {variables.map((variable, index) => {
          const checked = selectedVariable.name === variable.name ? { checked: true } : undefined;
          return (
            <CalciteLabel key={index} layout='inline' className={styles.label}>
              <CalciteRadioButton value={variable.name} {...checked} scale='s'></CalciteRadioButton>
              {variable.name}
            </CalciteLabel>
          );
        })}
      </CalciteRadioButtonGroup>

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
        <div ref={legendContainerRef}></div>
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
      <div className={styles.overviewMap}>
        <img src='./assets/overview-map.png'></img>
      </div>
    </Background>
  );
};

export default MeasurementsPanel;
