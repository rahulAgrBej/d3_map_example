import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { json, csv } from 'd3';
import { Map } from './Map'

const checkCodeFormat = (code, correctLen) => {

  if (code.length !== correctLen) {
    const codeLenDiff = correctLen - code.length;
    const zeros = "0".repeat(codeLenDiff);
    const correctCode = zeros.concat(code)
    return(correctCode)
  }

  return(code)
}

const rowFunc = (d) => {

  const stateCode = checkCodeFormat(d.STATE_NUM, 2);
  const countyCode = checkCodeFormat(d.COUNTY_NUM, 3);
  const tractCode = checkCodeFormat(d.TRACT_NUM, 6);

  const geoID = stateCode.concat(countyCode, tractCode);
  d = {...d, 'GEOID':geoID}

  return(d)
}


const App = () => {

  const [mapData, setMapData] = useState([]);
  const [renterData, setRenterData] = useState([]);

  const jsonURL = 'https://raw.githubusercontent.com/rahulAgrBej/d3_map_example/master/data/mi_tract.json';
  const csvURL = 'https://raw.githubusercontent.com/rahulAgrBej/d3_map_example/master/data/mi_state_BIPOC_renters_tract.csv';

  const width = 960;
  const height = 500;

  useEffect(() => {
    json(jsonURL).then((d) =>{
      console.log('map data')
      console.log(d);
      setMapData(d);
    })
  }, []);

  useEffect(() => {
    csv(csvURL, rowFunc).then((d) => {
      console.log('census bipoc renters data');
      console.log(d);


      setRenterData(d);
    })
  }, [])

  return(
    <React.Fragment>
    <h1>Testing</h1>
    <Map width={width} height={height} geoJSON={mapData} />
    </React.Fragment>
    
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
/*
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
