import "./Map.css";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

function Map({ setCoord, coord }) {
  // coordinate logic
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let tempCoord = [
        [position.coords.latitude, position.coords.longitude],
        [
          position.coords.latitude * -1,
          position.coords.longitude <= 0
            ? position.coords.longitude + 180
            : position.coords.longitude - 180,
        ],
      ];

      setCoord(tempCoord);
    }, null);
  }, [setCoord]);

  return (
    <div className="d-flex flex-column justify-content-around mt-3 flex-sm-row leaflet-div">
      <MapContainer
        className="leaflet-container-postform"
        center={coord[0]}
        zoom={3}
        scrollWheelZoom={false}
        dragging={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ChangeMap center={coord[0]} anti={false} />
      </MapContainer>
      <MapContainer
        className="leaflet-container-postform"
        center={coord[1]}
        zoom={3}
        scrollWheelZoom={false}
        dragging={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ChangeMap center={coord[1]} anti={true} />
      </MapContainer>
    </div>
  );
}

//child map component to dynamically set map's center view and marker

function ChangeMap({ center, anti }) {
  let customBread = L.icon({
    iconUrl: require("../../../res/images/whitebreadpng.png"),
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
  let customSignCoord = L.icon({
    iconUrl: require("../../../res/images/yourCord.png"),
    iconSize: [120, 60],
    iconAnchor: [50, 80],
  });

  let customSignAnti = L.icon({
    iconUrl: require("../../../res/images/yourAnti.png"),
    iconSize: [120, 60],
    iconAnchor: [50, 80],
  });

  let customMarker = anti ? (
    <Marker icon={customSignAnti} position={center}>
      <Popup>
        Antipode is specific point on the Earth that is directly opposite of
        your coordinate
      </Popup>
    </Marker>
  ) : (
    <Marker icon={customSignCoord} position={center}></Marker>
  );

  const map = useMap();
  map.setView(center);
  return (
    <div>
      <Marker icon={customBread} position={center}>
        <Popup>Slice of Bread</Popup>
      </Marker>
      {customMarker}
    </div>
  );
}

export default Map;
