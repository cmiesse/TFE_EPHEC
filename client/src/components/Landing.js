import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer } from "react-leaflet";
import "../App.css";

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

class Landing extends Component {
  render() {
    const center = ["50.7167", "4.6167"];
    var zoom = 14;
    return (
      <div className="container">
        <div className="jumbotron mt-4">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Bienvenue</h1>
          </div>
        </div>
        <div className="carte">
          <Map id="map" zoom={zoom} center={center} minZoom={zoom} maxZoom="18">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </Map>
        </div>
      </div>
    );
  }
}

export default Landing;
