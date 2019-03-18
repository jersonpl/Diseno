import React, { Component } from 'react';
import {Map, Polyline, Marker, GoogleApiWrapper} from 'google-maps-react';
//var coords = [{lat: 25.774, lng: -80.190}]; 
var coords = [];


export class MapContainer extends Component {
  render() {
    coords.push({lat: parseFloat(this.props.lati), lng: parseFloat(this.props.longi)});
    const marcador = {lat: this.props.lati, lng: this.props.longi};
    console.log(coords);
    return (
      <Map google={this.props.google}
        style={{width: '100%', height: '100%'}}
        initialCenter={{lat: this.props.lati, lng: this.props.longi}}
        zoom={14}>
        <Marker 
          position = {marcador}/>
        <Polyline
          path={coords}
          options = {{
          strokeColor: "#0000FF",
          strokeOpacity: 0.8,
          strokeWeight: 2 }} />
      </Map>
    )
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyDYNzG1CYSeQy-CEC3qAXca5-cmj-Cd6ho")
})(MapContainer)