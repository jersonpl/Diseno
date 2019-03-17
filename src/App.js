import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';

class App extends Component {
  state = {
    datos: []
  }
  componentDidMount(){
    this.getData();
    this.interval = setInterval(() => this.getData(), 10000);  
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }
  getData = _ => {
    fetch('http://localhost:4000')
    .then(response => response.json())
    .then(response => this.setState({datos: response.data}))
    .catch(err => console.error(err))
  }
  render() {
    var marker = this.state.datos.map((dato)=>{
      return (
        <MapContainer lati = {dato.Latitud} longi = {dato.Longitud} />
      )
    })
    var todos = this.state.datos.map((dato)=>{
      return (
        <tr>
          <th><div>{dato.ID}</div></th>
          <th><div>{dato.Fecha}</div></th>
          <th><div>{dato.Latitud}</div></th>
          <th><div>{dato.Longitud}</div></th>
        </tr>
      )
    })
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark" id="navbar">
          <a href="/" className="text-white">
            Datos Ubicación
          </a>
        </nav>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Latitud</th>
              <th>Longitud</th>
            </tr>
          </thead>
          <tbody>
            {todos}                            
          </tbody> 
        </table>
        {marker}
      </div>
    );
  }
}

export default App;