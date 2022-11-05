import { useEffect, useState, useRef } from 'react';
import * as styles from './Legend.module.css';

const createGradient = (colors) => {
  const gradientColors = colors.map((c) => {
    return `${c.color.toHex()} ${c.position * 100}%`;
  });
  return `linear-gradient(90deg, ${gradientColors.join(', ')})`;
};

const Canvas = ({ colors }) => {
  const divRef = useRef(null);
  useEffect(() => {
    if (divRef.current && colors && colors.length > 0) {
      divRef.current.style.background = createGradient(colors);
      divRef.current.style.height = '20px';
    }
  }, [divRef, colors]);

  return (
    <div className={styles.gradientContainer}>
      <div ref={divRef} className={styles.gradient}></div>
    </div>
  );
};

const LegendContainer = ({ variableStyle, setVariableStyle }) => {
  return (
    <>
      {variableStyle ? (
        <div>
          <p>{variableStyle.label}</p>
          {variableStyle.transferFunction ? (
            <div>
              <div className={styles.labels}>
                <div>&gt;{variableStyle.transferFunction.stretchRange[0].toFixed(2)}</div>
                <div>&lt;{variableStyle.transferFunction.stretchRange[1].toFixed(2)}</div>
              </div>
              <Canvas colors={variableStyle.transferFunction.colorStops}></Canvas>
            </div>
          ) : (
            <>Continuous</>
          )}
        </div>
      ) : (
        <div>Building legend..</div>
      )}
    </>
  );
};

export default LegendContainer;
