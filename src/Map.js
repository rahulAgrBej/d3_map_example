
import React from 'react';
import { geoAlbersUsa, geoPath } from 'd3';

export const Map = ({ width, height, geoJSON }) => {

    console.log('in map Generate');
    console.log(width);
    console.log(height);
    console.log(geoJSON);
  
    if (geoJSON.length === 0) {
      return(<h1>Loading Data...</h1>)
    }
  
    const proj = geoAlbersUsa()
                  .fitSize([width, height], geoJSON);
  
    const pathGenerator = geoPath()
                            .projection(proj);
    
    const features = geoJSON.features.map((feature) => {
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