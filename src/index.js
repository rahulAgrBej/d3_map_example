import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { json } from 'd3';
import { Map } from './Map'


const App = () => {

  const [data, setData] = useState([]);

  const jsonURL = 'https://raw.githubusercontent.com/rahulAgrBej/d3_map_example/master/data/mi_tract.json'

  const width = 960;
  const height = 500;

  useEffect(() => {
    json(jsonURL).then((d) =>{
      console.log(d);
      setData(d);
    })
  }, []);

  return(
    <React.Fragment>
    <h1>Testing</h1>
    <Map width={width} height={height} geoJSON={data} />
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
