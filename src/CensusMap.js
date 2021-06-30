
import React from 'react';
import { geoAlbersUsa, geoPath } from 'd3';

export const CensusMap = ({ width, height, geoJSON, censusData }) => {

    console.log('in map Generate');
    console.log(width);
    console.log(height);
    console.log(geoJSON);
  
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

    console.log('here census map');
    console.log(censusMap);
    
    const features = geoJSON.features.map((feature) => {
      console.log('feature');
      console.log(feature);
      const bipocPercent = parseFloat(censusMap[feature.properties.GEOID]['%_BIPOC_RENTERS'])
      console.log(`bipoc Percent ${bipocPercent}`);
      return <path 
                key={feature.properties.GEOID}
                d={pathGenerator(feature)}/>
    })
  
    return(
      <svg width={width} height={height}>
        <g>
          {features}
        </g>
      </svg>
    )
  }