import { useEffect, useState, useRef } from 'react';
import * as styles from './Legend.module.css';

const createGradient = (colors) => {
  const gradientColors = colors.map((c) => {
    return `${c.color.toHex()} ${c.position * 100}%`;
  });
  return `linear-gradient(90deg, ${gradientColors.join(', ')})`;
};

const Chip = ({ index, color, enabled, onClick, value, label }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  let backgroundColor;
  if (enabled) {
    backgroundColor = hovered ? 'transparent' : color;
  } else {
    backgroundColor = hovered ? color : 'transparent';
  }

  return (
    <button
      key={index}
      style={{ backgroundColor, border: `1.5px solid ${color}` }}
      className={styles.chip}
      datavalue={value}
      onClick={(evt) => {
        onClick(evt);
        setHovered(!hovered);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </button>
  );
};

const ContinuousLegend = ({ colors }) => {
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

const DiscreteLegend = ({ uniqueValues, uniqueValuesChanged }) => {
  const toggleVisibility = (event) => {
    const value = parseInt(event.target.getAttribute('datavalue'));
    const newUniqueValues = uniqueValues.map((uv) => {
      if (uv.value === value) {
        uv.enabled = !uv.enabled;
      }
      return uv;
    });
    uniqueValuesChanged(newUniqueValues);
  };
  return uniqueValues.map((uv, index) => (
    <Chip
      enabled={uv.enabled}
      key={index}
      color={uv.color}
      value={uv.value}
      onClick={toggleVisibility}
      label={uv.label}
    ></Chip>
  ));
};

const LegendContainer = ({ legendInfo, setLegendInfo }) => {
  return (
    <div className={styles.container}>
      {legendInfo ? (
        <div>
          <p className={styles.legendTitle}>{legendInfo.label}</p>
          {legendInfo.continuous ? (
            <div>
              <div className={styles.labels}>
                <div>&gt;{legendInfo.range[0].toFixed(2)}</div>
                <div>&lt;{legendInfo.range[1].toFixed(2)}</div>
              </div>
              <ContinuousLegend colors={legendInfo.colorStops}></ContinuousLegend>
            </div>
          ) : (
            <DiscreteLegend
              uniqueValues={legendInfo.uniqueValues}
              uniqueValuesChanged={(uv) => {
                if (uv) {
                  setLegendInfo({
                    id: legendInfo.id,
                    label: legendInfo.label,
                    continuous: false,
                    uniqueValues: uv
                  });
                }
              }}
            ></DiscreteLegend>
          )}
        </div>
      ) : (
        <div>Building legend..</div>
      )}
    </div>
  );
};

export default LegendContainer;
