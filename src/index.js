import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { json } from 'd3';
/*
const getData = ({ url }) => {

  const [data, setData] = useState({});

  useEffect(() => {
    json(url)
    .then((d) => {
      setData(d);
    })
  }, [])

  return(data);
}
*/
const App = () => {

  const [data, setData] = useState([]);

  const jsonURL = 'https://raw.githubusercontent.com/rahulAgrBej/d3_map_example/master/data/mi_tract.json'

  useEffect(() => {
    json(jsonURL).then((d) =>{
      console.log(d);
      setData(d.features);
    })
  }, []);

  if (!data) {
    return(<h1>not loaded yet</h1>)
  }

  console.log('here bfore return')

  
  return(
    <React.Fragment>
    <h1>Testing</h1>
    <ul>
        {
          data.map((d) => {
            return <li key={d.properties.GEOID}>{d.properties.NAME}</li>
          })
        }
    </ul>
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
