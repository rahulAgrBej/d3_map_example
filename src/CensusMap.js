
import React from 'react';
import { geoAlbersUsa, geoPath, interpolateBlues } from 'd3';

export const CensusMap = ({ width, height, geoJSON, censusData }) => {
  
    if ((geoJSON.length === 0) || (censusData.length === 0)) {
      return(<h1>Loading Data...</h1>)
    }

    let censusMap = {};
    censusData.forEach(d => {
      censusMap[d.GEOID] = d;
    });
  
    const proj = geoAlbersUsa()
                  .fitSize([width, height], geoJSON);
  
    const pathGenerator = geoPath()
                            .projection(proj);
    
    const features = geoJSON.features.map((feature) => {
      const bipocPercent = parseFloat(censusMap[feature.properties.GEOID]['%_BIPOC_RENTERS']);
      const outStyle = {fill: interpolateBlues(bipocPercent/100.00)};
      return <path 
                key={feature.properties.GEOID}
                d={pathGenerator(feature)}
                style={outStyle}/>
    })
  
    return(
      <svg width={width} height={height}>
        <g>
          {features}
        </g>
      </svg>
    )
  }