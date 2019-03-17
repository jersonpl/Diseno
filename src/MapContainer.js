import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google}
      initialCenter={{
        lat: this.props.lati,
        lng: this.props.longi
      }}
      zoom={14}>
 
        <Marker position={{ lat: this.props.lati, lng: this.props.longi }} />
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyDYNzG1CYSeQy-CEC3qAXca5-cmj-Cd6ho")
})(MapContainer)